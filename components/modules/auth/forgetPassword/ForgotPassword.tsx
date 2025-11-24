"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import loginimage2 from "@/assets/images/leftside2.svg";
import loginimage3 from "@/assets/images/leftside3.svg";
import loginimage4 from "@/assets/images/leftside4.svg";
import signupImage from "@/assets/images/signup1.svg";
import { Button } from "@/components/ui/button";
import AppInput from "@/components/common/Input";
import crscLogo from "@/assets/images/crsclogo.svg";
import { Label } from "@/components/ui/label";
import { forgotPasswordAPI } from "@/actions/auth";
import Loader from "@/components/common/ButtonLoader";
import LeftSide from "../../common/LeftSide";
import Link from "next/link";

function ForgotPassword() {
  const { push } = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const images = [signupImage, loginimage2, loginimage3, loginimage4];
  const metaText = {
    title: "Reset Password!",
    description: "Forgot Your Password Don't worry lets Recover It",
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    try {
      setLoading(true);
      const response = await forgotPasswordAPI(email);

      if (response.status === 200 && response.data.status === "success") {
        toast.success("OTP sent successfully");
        push(
          `/forgot-password/reset-verify?email=${encodeURIComponent(email)}`
        );
      } else {
        const errorMessage =
          response.data?.message ||
          response.data?.error ||
          "Failed to send OTP";
        toast.error(errorMessage);
      }
    } catch (error: any) {
      console.error("Forgot password error:", error);
      toast.error("Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex lg:flex-row flex-col justify-between  h-screen">
      <div className="w-full hidden lg:block">
        <LeftSide images={images} metaText={metaText} />
      </div>
      <div className="w-full  flex flex-col justify-center items-center ">
        <div className=" p-8 md:p-10 w-f lg:w-[75%] flex flex-col ">
          <div className="flex  lg:items-start flex-col">
            <Image height={100} width={100} src={crscLogo} alt="CRSC Logo" />
            <h1 className="text-2xl font-semibold mt-6">Forgot Password</h1>
            <p className="text-sm font-medium text-dark-gray mb-6">
              Enter Email to Send Verification Code
            </p>
          </div>
          <form>
            <div className="mt-2">
              <Label htmlFor="email">Email Address</Label>

              <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={handleEmailChange}
                className="h-11 mt-1 block w-full px-3 py-3 bg-slate-100 border border-gray-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 font-medium"
              />
            </div>

            <div className="text-center mt-8">
              <Button
                type="button"
                disabled={loading}
                className="w-full bg-primary-color lg:hover:bg-orange-400 mb-3"
                onClick={handleSubmit}
              >
                {loading ? <Loader /> : "Get Verification Code"}
              </Button>
            </div>
          </form>
          <div className="text-center mt-4">
            <span className="text-sm text-dark-gray">
              Remember your password?{" "}
              <Link
                href="/signin"
                className="text-primary-color lg:hover:text-orange-400 font-medium"
              >
                Sign In
              </Link>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ForgotPassword;

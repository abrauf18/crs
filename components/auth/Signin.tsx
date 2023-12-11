import React from "react";
import loginimage1 from "@/public/assets/leftside1.svg";
import loginimage2 from "@/public/assets/leftside2.svg";
import loginimage3 from "@/public/assets/leftside3.svg";
import loginimage4 from "@/public/assets/leftside4.svg";
import LeftSide from "./common/LeftSide";
import SigninForm from "./SigninForm";

const Signin = () => {
  const images = [loginimage1, loginimage2, loginimage3, loginimage4];
  const metaText = {
    title: "Welcome Back!",
    description: "Enter your Credentials to Access Your Account."
  };
  return (
    <section className='md:flex mobile:justify-center mobile:items-center h-screen'>
      <div className='mobile:hidden flex bg-light-gray w-full h-full basis-1/2 justify-center items-center md:p-12 p-6'>
        <LeftSide images={images} metaText={metaText} />
      </div>
      <div className='bg-[#ffffff] w-full h-full basis-1/2 flex justify-center md:pt-12'>
        <SigninForm />
      </div>
    </section>
  );
};

export default Signin;
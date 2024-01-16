import Searchbar from '@/app/components/common/Searchbar';
import VisaIcon from '@/app/assets/icons/VisaIcon';
import StripeIcon from '@/app/assets/icons/StripeIcon';
import PayPalIcon from '@/app/assets/icons/PayPalIcon';
import React from 'react';

function Payment() {
    return (
        <section className="lg:px-5">
            <Searchbar
                headerText="Payment Info"
                tagline="Here’s Your Payment Information"
            />
            <div className="flex flex-col justify-center items-center mt-10  ">
                <div className="h-fit px-3 py-6 lg:px-8 lg:py-8  rounded-lg shadow-md">
                    <h1 className="font-semibold text-xl">Card Information</h1>
                    <p className="text-sm text-dark-gray font-medium">
                        Don’t Worry your Information Is Completely Secure
                    </p>

                    <div className="flex flex-col mt-5  ">
                        <label
                            htmlFor="card_number"
                            className="font-medium mb-2"
                        >
                            Card Number
                        </label>
                        <div className="border flex items-center justify-between p-2 rounded-lg w-full bg-white">
                            <input
                                type="text"
                                id="card_number"
                                name="card_number"
                                className="bg-gray-50  rounded-lg outline-none"
                                placeholder="Enter Card Number"
                            />
                            <div>
                                <VisaIcon />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col mt-5 ">
                        <label htmlFor="card_name" className="font-medium mb-2">
                            Cardholder Name
                        </label>
                        <input
                            type="text"
                            id="card_name"
                            name="card_name"
                            className="bg-gray-50  rounded-lg outline-none border p-2"
                            placeholder="Enter Cardholder Name"
                        />
                    </div>

                    <div className="flex mt-5 justify-between ">
                        <div className="flex flex-col">
                            <label
                                htmlFor="expiry"
                                className="font-medium mb-2"
                            >
                                Expiry
                            </label>
                            <input
                                type="text"
                                id="expiry"
                                name="expiry"
                                className="bg-gray-50  rounded-lg outline-none border p-2 w-[90%]"
                                placeholder="MM/YY"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="cvv" className="font-medium mb-2">
                                CVV
                            </label>
                            <input
                                type="text"
                                id="cvv"
                                name="cvv"
                                className="bg-gray-50  rounded-lg outline-none border p-2 w-[90%]"
                                placeholder="eg: 1234"
                            />
                        </div>
                    </div>
                    <div className="bg-primary-color text-center font-semibold cursor-pointer rounded-xl py-2 text-white mt-5">
                        <span>Pay Now</span>
                    </div>

                    <div className="text-center font-semibold mt-5">Or</div>
                    <div>
                        <div className="border flex space-x-2 justify-center items-center text-center font-semibold cursor-pointer rounded-xl py-2  mt-5">
                            <StripeIcon />
                            <span>Pay With Stripe</span>
                        </div>
                        <div className="border flex space-x-2 justify-center items-center text-center font-semibold cursor-pointer rounded-xl py-2  mt-5">
                            <PayPalIcon />
                            <span>Pay With Paypal</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Payment;

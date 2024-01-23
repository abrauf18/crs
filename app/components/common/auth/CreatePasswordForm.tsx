import React from 'react';
import Image from 'next/image';

import { Button } from '@/app/components/ui/button';
import AppInput from '@/app/components/common/AppInput';
import crscLogo from '@/app/assets/images/crsclogo.svg';
import { Label } from '@/app/components/ui/label';

function CreatePasswordForm({ description }: { description: string }) {
    return (
        <div className=" p-8 md:p-10 w-[100%] lg:w-[75%] flex flex-col ">
            <div className="flex  lg:items-start flex-col">
                <Image
                    height={100}
                    width={100}
                    src={crscLogo}
                    alt="CRSC Logo"
                />
                <h1 className="text-2xl font-semibold mt-6">Create Password</h1>
                <p className="text-sm font-medium text-dark-gray mb-6">
                    {description}
                </p>
            </div>
            <form>
                <div className="mt-2">
                    <Label htmlFor="password">Password</Label>

                    <AppInput
                        type="password"
                        id="password"
                        placeholder="Enter Password"
                    />
                </div>
                <div className="mt-4">
                    <Label htmlFor="confirm_password">Confirm Password</Label>

                    <AppInput
                        type="password"
                        id="confirm_password"
                        placeholder="Enter Confirm Password"
                    />
                </div>

                <div className="text-center mt-8">
                    <Button
                        type="button"
                        className="w-full bg-primary-color lg:hover:bg-orange-400 mb-3"
                    >
                        Create Password
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default CreatePasswordForm;

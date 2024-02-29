import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Button } from '@/app/components/ui/button';
import AppInput from '@/app/components/common/AppInput';
import crscLogo from '@/app/assets/images/crsclogo.svg';
import { Label } from '@/app/components/ui/label';
import { X } from 'lucide-react';
import { resetPassword } from '@/lib/features/auth/authAction';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import PasswordErrors from './PasswordErrors';
import Loader from '../Loader';

function CreatePasswordForm({ description }: { description: string }) {
    const { push } = useRouter();
    const dispatch = useAppDispatch();
    const state = useAppSelector((state) => state.user);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isPageLoading, setIsPageLoading] = useState(false);

    const handleNewPasswordChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setNewPassword(event.target.value);
    };

    const handleConfirmPasswordChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setConfirmPassword(event.target.value);
    };

    const handleSubmit = async () => {
        const { id } = state.data;
        const response = await dispatch(resetPassword({ id, newPassword }));
        if (response.type === 'user/verifyOTP/rejected') {
            toast.error(response.payload);
            return push('/forgot-password');
        }
        toast.success('Successfully Updated Password');
        return push('/signin');
    };

    useEffect(() => {
        setIsPageLoading(true);
    }, []);
    if (!isPageLoading) {
        return <Loader />;
    }
    
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
                    <Label htmlFor="newPassword">Password</Label>

                    <AppInput
                        type="password"
                        id="newPassword"
                        placeholder="Enter Password"
                        onChange={handleNewPasswordChange}
                    />
                </div>
                
                <PasswordErrors password={newPassword} />

                <div className="mt-4">
                    <Label htmlFor="confirm_password">Confirm Password</Label>

                    <AppInput
                        type="password"
                        id="confirm_password"
                        placeholder="Enter Confirm Password"
                        onChange={handleConfirmPasswordChange}
                    />
                </div>
                {newPassword !== confirmPassword && (
                    <div className="flex space-y-2 lg:space-y-0 lg:flex-row flex-col lg:space-x-3 mb-4 mt-2">
                        <div className="flex space-x-1 items-center text-red-500">
                            <X
                                size={20}
                                color={
                                    newPassword === confirmPassword
                                        ? '#7AA43E'
                                        : '#E6500D'
                                }
                            />
                            <p className="text-xs">
                                Passwords are NOT matching
                            </p>
                        </div>
                    </div>
                )}
                <div className="text-center mt-8">
                    <Button
                        type="button"
                        className="w-full bg-primary-color lg:hover:bg-orange-400 mb-3"
                        onClick={handleSubmit}
                    >
                        Create Password
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default CreatePasswordForm;

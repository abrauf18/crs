'use client';

import Image from 'next/image';
import { Trash2 } from 'lucide-react';
import { toast } from 'react-toastify';
import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import { useSession } from 'next-auth/react';
import { Label } from '@/app/components/ui/label';
import { validationError } from '@/lib/utils';
import { OptionsInterface } from '@/app/components/common/AppDropDown';
import Input from '@/app/components/common/Input';
import Loader from '@/app/components/common/Loader';
import PictureIcon from '@/app/assets/icons/PictureIcon';
import { ModalHeader } from '@/app/components/common/ModalHeader';
import useProfileImage from '@/lib/custom-hooks/useProfileImage';
import { updateAnotherUserProfileAPI } from '@/app/api/user';
import Select from '@/app/components/common/DropDown';

// type for the form data
type ProfileFormData = {
    name: string;
    email: string;
    role: string;
};

function ProfileModal({
    onClose,
    userId,
    image,
    name,
    email,
    role,
    isViewOnly,
    setIsUserUpdated,
}: {
    onClose: () => void;
    userId: string;
    image: string;
    name: string;
    email: string;
    role: string;
    isViewOnly?: boolean;
    setIsUserUpdated?: (arg0: boolean) => void;
}) {
    const { data } = useSession();
    const [loading, setLoading] = useState(false);
    const [heading, setHeading] = useState(name);
    const [tagline, setTagline] = useState(email);
    const roleOptions: OptionsInterface[] = [
        { label: 'student', value: 'Student' },
        { label: 'teacher', value: 'Teacher' },
        { label: 'school', value: 'School' },
        { label: 'admin', value: 'Admin' },
    ];
    const {
        hiddenFileInput,
        selectedFile,
        currentImage,
        setOriginalImage,
        setCurrentImage,
        uploadProfilePicture,
        handleClick,
        handleFileChange,
        removeImage,
        undoImageChange,
        shouldResetProfilePicture,
        deleteProfilePicture,
    } = useProfileImage();
    const {
        reset,
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({
        mode: 'onChange',
        reValidateMode: 'onChange',
    });

    // Function to undo all changes made before clicking save
    const handleReset = () => {
        undoImageChange();
        reset();
    };

    // Function to handle form submission
    const onFormSubmit = async (formData: ProfileFormData) => {
        setLoading(true);
        let imageUrl = currentImage;
        try {
            // Upload image to s3Bucket if selected
            if (selectedFile) {
                const uploadResponse: any = await uploadProfilePicture(
                    data?.user.id
                );
                // Handle image upload error
                if (uploadResponse.status !== 200) {
                    return toast.error(
                        uploadResponse.message || 'Error Uploading Image'
                    );
                }
                // It is an axios response so we need to access the data property
                imageUrl = uploadResponse?.data?.url;
            }
            // Delete old image if images removed all-together
            if (shouldResetProfilePicture()) {
                await deleteProfilePicture();
            }

            const { name, email, role } = formData;

            // Update heading and tagline
            setHeading(name);
            setTagline(email);

            // Update user profile
            await updateAnotherUserProfileAPI(
                data?.user.accessToken || '',
                imageUrl,
                name,
                email,
                userId,
                role
                // selectedRole
            );

            if (setIsUserUpdated) {
                setIsUserUpdated(true);
            }

            // Manually trigger update after form submission to prevent discard changes to that of before form submission
            setCurrentImage(imageUrl);
            setOriginalImage(imageUrl);
            reset({
                name,
                email,
                role,
            });

            return toast.success('Profile Updated Successfully');
        } catch (error: any) {
            return toast.error(
                error.response?.data?.message || 'Error Uploading Profile'
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setOriginalImage(image);
        setCurrentImage(image);
        reset({
            name,
            email,
            role,
        });
        // setOriginalRole(role);
    }, []);

    return (
        <section className="w-full bg-white h-screen py-4 shadow-lg overflow-y-auto">
            <form
                onSubmit={handleSubmit(
                    onFormSubmit as SubmitHandler<FieldValues>
                )}
            >
                <div className="h-[80%] lg:h-[95%] overflow-y-auto px-6">
                    <ModalHeader
                        headerText={{
                            heading,
                            tagline,
                        }}
                        onClose={onClose}
                    />
                    <div className="flex flex-col  mobile:items-center w-full">
                        <div className="flex flex-col justify-between items-center space-y-2">
                            <div className="flex justify-center">
                                <div className="border-2 border-light-gray rounded-full h-44 w-44 flex justify-center items-center">
                                    <div className="border-2 border-light-gray rounded-full h-40 w-40 flex justify-center items-center">
                                        <div className="border-2 border-light-gray rounded-full h-36 p-2 w-36 flex justify-center items-center">
                                            <Image
                                                src={
                                                    selectedFile
                                                        ? URL.createObjectURL(
                                                              selectedFile
                                                          )
                                                        : currentImage
                                                }
                                                alt="profile Image"
                                                className="rounded-full aspect-square object-cover h-32 w-32"
                                                width={176}
                                                height={176}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col lg:flex-row lg:space-x-2 justify-center items-center  mobile:w-full mb-5">
                                <button
                                    type="button"
                                    onClick={handleClick}
                                    className="text-white flex items-center space-x-2 bg-primary-color font-semibold mobile:w-full px-5 py-2 border rounded-lg mt-2"
                                >
                                    <PictureIcon
                                        className="shrink-0"
                                        width={18}
                                        height={18}
                                    />
                                    <span>Change Photo</span>
                                    <input
                                        type="file"
                                        id="profilePicInput"
                                        accept=".pdf, .jpg, .jpeg, .png, .gif, .mp4, .avi, .mov, .doc, .docx, .xls, .xlsx, .ppt, .pptx"
                                        onChange={handleFileChange}
                                        ref={hiddenFileInput}
                                        style={{ display: 'none' }}
                                    />
                                </button>
                                <button
                                    type="button"
                                    onClick={removeImage}
                                    className="text-dark-gray items-center flex space-x-2  font-semibold mobile:w-full px-5 py-2 border rounded-lg mt-2"
                                >
                                    <Trash2
                                        className="shrink-0"
                                        size={18}
                                        color="#E6500D"
                                    />
                                    <span>Remove Photo</span>
                                </button>
                            </div>
                        </div>
                        <div className="mb-2 w-full mt-4">
                            <Label htmlFor="name">User Name</Label>
                            <Input
                                name="name"
                                placeholder="Enter Name"
                                type="text"
                                errors={errors}
                                register={register('name', {
                                    required: {
                                        value: true,
                                        message: validationError.REQUIRED_FIELD,
                                    },
                                })}
                            />
                        </div>
                        <div className="mb-2 w-full">
                            <Label htmlFor="email">Email Address</Label>
                            <Input
                                name="email"
                                placeholder="Enter Email"
                                type="email"
                                errors={errors}
                                register={register('email', {
                                    required: {
                                        value: true,
                                        message: validationError.REQUIRED_FIELD,
                                    },
                                    pattern: {
                                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                        message: validationError.VALID_EMAIL,
                                    },
                                })}
                            />
                        </div>
                        <div className="mb-2 w-full">
                            <Label htmlFor="role ">Role</Label>
                            <Select
                                name="role"
                                options={roleOptions}
                                errors={errors}
                                register={register('role', {
                                    required: {
                                        value: true,
                                        message: validationError.REQUIRED_FIELD,
                                    },
                                })}
                            />
                        </div>
                    </div>
                </div>
                {!isViewOnly && (
                    <div className="flex lg:flex-row flex-col lg:space-x-2 lg:space-y-0 space-y-2 lg:justify-between w-full py-2 gap-1 bottom-0 left-0  p-3 border bg-white">
                        <button
                            type="button"
                            onClick={handleReset}
                            className="text-dark-gray font-semibold  w-full px-5 py-2 border rounded-xl"
                        >
                            Discard Changes
                        </button>
                        <button
                            type="submit"
                            disabled={!isValid}
                            className={`text-white ${
                                !isValid ? 'bg-gray-300' : 'bg-primary-color'
                            } font-semibold w-full px-5 py-2  border rounded-xl`}
                        >
                            {loading ? (
                                <Loader color="white" size="4" />
                            ) : (
                                'Save Changes'
                            )}
                        </button>
                    </div>
                )}
            </form>
        </section>
    );
}

export default ProfileModal;

'use client';

import Image from 'next/image';
import { Trash2 } from 'lucide-react';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { useSession } from 'next-auth/react';
import React, { useEffect, useRef, useState } from 'react';
import { DEFAULT_IMAGE, validationError } from '@/lib/utils';
import { Label } from '@/app/components/ui/label';
import Input from '@/app/components/common/Input';
import Loader from '@/app/components/common/Loader';
import PictureIcon from '@/app/assets/icons/PictureIcon';
import { getUserProfileAPI, updateUserProfileAPI } from '@/app/api/user/index';
import { UploadProfilePicture, DeleteProfilePicture } from '@/app/api/s3Bucket';
import SchoolProfile from './SchoolProfile';

interface MyProfileProps {
    isSchoolProfile?: boolean;
}

function Profile({ isSchoolProfile }: MyProfileProps) {
    const { data, update } = useSession();
    const hiddenFileInput = useRef<HTMLInputElement | null>(null);
    const [loading, setLoading] = useState(false);
    const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
    const [originalImage, setOriginalImage] = useState<string>(DEFAULT_IMAGE);
    const [profileData, setProfileData] = useState({
        image: DEFAULT_IMAGE,
        name: '',
        email: '',
        password: '',
    });
    const {
        reset,
        watch,
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({
        mode: 'onChange',
        reValidateMode: 'onChange',
    });

    // Function to handle clicking on the hidden input to access images
    const handleClick = (event: React.MouseEvent) => {
        hiddenFileInput.current?.click();
    };

    // Function to handle image file select on clicking hidden input
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        setSelectedFile(file);
    };

    // Function to remove the selected image and profile picture
    const removeImage = () => {
        setSelectedFile(null);
        setProfileData({
            ...profileData,
            image: DEFAULT_IMAGE,
        });
    };

    // Function to undo all changes made on profile image before clicking save
    const undoFileChange = () => {
        setSelectedFile(null);
        if (hiddenFileInput.current) {
            hiddenFileInput.current.value = '';
        }
        setProfileData({
            ...profileData,
            image: originalImage,
        });
    };

    // Function to undo all changes made before clicking save
    const handleReset = () => {
        undoFileChange();
        reset({
            name: profileData.name,
            email: profileData.email,
            password: '',
        });
    };

    // Function to handle form submission
    const onFormSubmit = async (formData: any) => {
        setLoading(true);

        let imageUrl = profileData.image;

        try {
            // Upload image to s3Bucket if selected
            if (selectedFile) {
                const s3BucketResponse: any = await UploadProfilePicture({
                    selectedFile,
                    originalImage,
                    userId: data?.user.id,
                });

                // Handle image upload error
                if (s3BucketResponse.status !== 200) {
                    setLoading(false);
                    return toast.error(
                        s3BucketResponse?.message || 'Error Uploading Image'
                    );
                }

                imageUrl = s3BucketResponse?.data?.url;
            }
        } catch (error: any) {
            setLoading(false);
            return toast.error(
                error.response?.data?.message || 'Error Uploading Image'
            );
        }

        try {
            // Delete old image if images removed all-together
            if (
                !selectedFile &&
                originalImage !== DEFAULT_IMAGE &&
                profileData.image === DEFAULT_IMAGE
            ) {
                await DeleteProfilePicture(originalImage);
            }

        } catch (error: any) {
            setLoading(false);
        }

        try {
            const { name, email, password } = formData;

            // Update user profile
            const response = await updateUserProfileAPI(
                data?.user.accessToken || '',
                imageUrl,
                name,
                email,
                password
            );

            // Update next auth session data
            await update({
                ...data,
                name: response.data.data.name,
                email: response.data.data.email,
                user: {
                    ...data?.user,
                    name: response.data.data.name,
                    email: response.data.data.email,
                    accessToken: response.data.data.accessToken,
                },
            });

            setLoading(false);
            return toast.success('Profile Updated Successfully');
        } catch (error: any) {
            // Handle update user profile error (and next auth session if occurs)
            setLoading(false);
            return toast.error(
                error.response?.data?.message || 'Error Updating Profile'
            );
        }
    };

    // Fetch profile data on component mount
    useEffect(() => {
        (async () => {
            try {
                if (data?.user.accessToken) {
                    const APIdata = await getUserProfileAPI(
                        data?.user.accessToken
                    );
                    const { name, email, image } = APIdata.data.data;
                    setProfileData({
                        image,
                        name,
                        email,
                        password: '',
                    });
                    reset({
                        image,
                        name,
                        email,
                        password: '',
                    });
                    setOriginalImage(APIdata.data.data.image);
                }
            } catch (err) {
                toast.error('An Error Occured, Please Refresh the page');
            }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data?.user.accessToken]);
    
    return (
        <section
            className={`bg-white  flex h-full w-full mt-8 lg:mt-0 ${
                !isSchoolProfile && 'basis-1/2'
            }`}
        >
            <div
                className={`flex flex-col  mobile:items-center mobile:w-full mobile:px-2 ${
                    !isSchoolProfile ? 'm-auto mobile:h-screen' : 'w-full'
                } w-[400px]`}
            >
                <h1 className="text-2xl  font-semibold mb-2 mobile:mb-4">
                    My profile
                </h1>
                <form onSubmit={handleSubmit(onFormSubmit)}>
                    <div className="md:flex justify-between lg:space-x-4 items-center  mobile:w-full mobile:mb-2">
                        <div className="flex justify-center">
                            <div className="border-2 border-light-gray rounded-full h-40 w-40 flex justify-center items-center">
                                <div className="border-2 border-light-gray rounded-full h-36 w-36 flex justify-center items-center">
                                    <div className="border-2 border-light-gray rounded-full h-32 w-32 flex justify-center items-center">
                                        <Image
                                            src={
                                                selectedFile
                                                    ? URL.createObjectURL(
                                                          selectedFile
                                                      )
                                                    : profileData.image // state.data.image
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
                        <div className="flex flex-col justify-between items-center mobile:w-full mb-4 lg:mb-0">
                            <button
                                type="button"
                                onClick={handleClick}
                                className="text-white  flex space-x-2 items-center bg-primary-color font-semibold mobile:w-full mobile:p-2 md:px-6 md:py-2 border rounded-lg mt-2 cursor-pointer"
                            >
                                <PictureIcon width={18} height={18} />
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
                                className="text-dark-gray flex space-x-2 items-center font-semibold mobile:w-full p-2 md:px-6 md:py-2 border rounded-lg mt-2"
                            >
                                <Trash2 size={18} color="#E6500D" />
                                <span>Remove Photo</span>
                            </button>
                        </div>
                    </div>
                    <div className="mt-2">
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
                    <div className="mt-2">
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
                    <div className="mt-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            name="password"
                            placeholder="Enter Password"
                            type="password"
                            errors={errors}
                            register={register('password', {
                                pattern: {
                                    value:
                                        // eslint-disable-next-line no-useless-escape
                                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[~`!@#$%^&*()_\-\+=:;"'?\/>.<,{}\[\]])[a-zA-Z\d~`!@#$%^&*()_\-\+=:;"'?\/>.<,{}\[\]]{8,}$/,
                                    message:
                                        validationError.PASSWORD_VALIDATION_INFO_TEXT,
                                },
                                minLength: {
                                    value: 8,
                                    message: validationError.MIN_LENGTH,
                                },
                                maxLength: {
                                    value: 20,
                                    message: validationError.MAX_LENGTH,
                                },
                            })}
                        />
                    </div>
                    {!isSchoolProfile && (
                        <div className="md:flex md:justify-between w-full mt-5 gap-2">
                            <button
                                type="button"
                                className="text-dark-gray font-semibold mobile:mb-2 w-full p-2 md:px-6 md:py-2 border rounded-lg"
                                onClick={handleReset}
                            >
                                Discard Changes
                            </button>
                            <button
                                type="submit"
                                disabled={!isValid}
                                className={`text-white ${
                                    !isValid
                                        ? 'bg-gray-300'
                                        : 'bg-primary-color'
                                } font-semibold w-full p-2 md:px-6 md:py-2 border rounded-lg h-12`}
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
            </div>
            {isSchoolProfile && (
                <SchoolProfile
                    isProfileFormValid={isValid}
                    selectedImageFile={selectedFile}
                    originalImage={originalImage}
                    profileImage={profileData.image}
                    username={watch('name')}
                    email={watch('email')}
                    password={watch('password')}
                    handleProfileReset={handleReset}
                />
            )}
        </section>
    );
}

export default Profile;

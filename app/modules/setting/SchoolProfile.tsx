'use client';

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { validationError } from '@/lib/utils';
import Input from '@/app/components/common/Input';
import { Label } from '@/app/components/ui/label';
import { getSchoolProfileAPI, updateSchoolProfileAPI } from '@/app/api/school';
import { getSchoolProfile } from '@/lib/react-redux/features/schoolProfile/schoolProfileAction';
import { useAppDispatch } from '@/lib/react-redux/hooks';
import { UploadProfilePicture } from '@/app/api/s3Bucket';
import { updateUserProfileAPI } from '@/app/api/user';

function SchoolProfile({
    isProfileFormValid,
    selectedImage,
    profileData,
    originalImage,
}: {
    isProfileFormValid: boolean;
    selectedImage: File | null;
    profileData: {
        image: string;
        name: string;
        email: string;
        password: string;
    };
    originalImage: string;
}) {
    type Inputs = {
        schoolName: string;
        numOfClasses: number;
        classesStart: number;
        classesEnd: number;
    };
    const [loading, setLoading] = useState(false);
    const dispatch = useAppDispatch();
    const { data } = useSession();
    const {
        reset,
        watch,
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<Inputs>({
        mode: 'onChange',
        reValidateMode: 'onChange',
    });

    const classStartData = watch('classesStart');

    const onSubmit = async (formData: any) => {
        setLoading(true);

        try {
            let imageUrl = profileData.image;

            if (selectedImage) {
                const s3BucketResponse: any = await UploadProfilePicture({
                    selectedFile: selectedImage,
                    originalImage,
                    userId: data?.user.id,
                });

                if (s3BucketResponse?.status !== 200) {
                    setLoading(false);
                    return toast.error(
                        s3BucketResponse?.message || 'Error Uploading Image'
                    );
                }

                imageUrl = s3BucketResponse?.data?.url || imageUrl;
            }

            const { name, email, password } = profileData;
            const updateUserResponse = await updateUserProfileAPI(
                data?.user.accessToken || '',
                imageUrl,
                name,
                email,
                password
            );
            if (updateUserResponse.data.status !== 'success') {
                setLoading(false);
                return toast.error(
                    updateUserResponse.data.message ||
                        'Failed to Update User Profile'
                );
            }

            const { schoolName, numOfClasses, classesStart, classesEnd } =
                formData;
            const updateSchoolResponse = await updateSchoolProfileAPI(
                data?.user.accessToken || '',
                schoolName,
                numOfClasses,
                classesStart,
                classesEnd
            );
            if (updateSchoolResponse.data.status !== 'success') {
                setLoading(false);
                return toast.error(
                    updateSchoolResponse.data.message ||
                        'Failed to Update School Profile'
                );
            }

            setLoading(false);
            return toast.success('Profile Updated Successfully');
        } catch (error: any) {
            setLoading(false);
            return toast.error(error.message || 'An error occurred');
        }
    };

    useEffect(() => {
        (async () => {
            try {
                if (data?.user.accessToken) {
                    const APIdata = await getSchoolProfileAPI(
                        data?.user.accessToken
                    );
                    const { name, numOfClasses, classesStart, classesEnd } =
                        APIdata.data.data;
                    reset({
                        schoolName: name,
                        numOfClasses,
                        classesStart,
                        classesEnd,
                    });
                }
            } catch (err) {
                console.log('error: ', err);
            }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data?.user.accessToken]);

    return (
        <div className="w-full relative">
            <h1 className="text-2xl font-semibold mb-2 mobile:mb-4 text-center lg:text-left">
                School Profile
            </h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col mt-5  ">
                    <Label htmlFor="schoolName">School Name</Label>

                    <Input
                        name="schoolName"
                        placeholder="Enter School Name"
                        type="string"
                        errors={errors}
                        register={register('schoolName', {
                            required: {
                                value: true,
                                message: validationError.REQUIRED_FIELD,
                            },
                            minLength: {
                                value: 3,
                                message: validationError.MIN_SCHOOL_NAME_LENGTH,
                            },
                            maxLength: {
                                value: 25,
                                message: validationError.MAX_SCHOOL_NAME_LENGTH,
                            },
                        })}
                    />
                </div>
                <div className="flex flex-col mt-5 ">
                    <Label htmlFor="numOfClasses ">No Of Classrooms</Label>

                    <Input
                        name="numOfClasses"
                        placeholder="Enter No of Classrooms"
                        type="number"
                        errors={errors}
                        register={register('numOfClasses', {
                            required: {
                                value: true,
                                message: validationError.REQUIRED_FIELD,
                            },
                            min: {
                                value: 1,
                                message: validationError.MIN_CLASSES_NUM,
                            },
                        })}
                    />
                </div>

                <div className="flex mt-5 justify-between w-full space-x-4 ">
                    <div className="flex flex-col w-full">
                        <Label htmlFor="classesStart">Classes Start</Label>

                        <Input
                            name="classesStart"
                            placeholder="i.e. 5th Class"
                            type="number"
                            errors={errors}
                            register={register('classesStart', {
                                required: {
                                    value: true,
                                    message: validationError.REQUIRED_FIELD,
                                },
                                min: {
                                    value: 0,
                                    message: validationError.MIN_CLASS_START,
                                },
                            })}
                        />
                    </div>
                    <div className="flex flex-col w-full">
                        <Label htmlFor="classesEnd">Classes End</Label>

                        <Input
                            name="classesEnd"
                            placeholder="i.e. 10th Class"
                            type="number"
                            errors={errors}
                            register={register('classesEnd', {
                                required: {
                                    value: true,
                                    message: validationError.REQUIRED_FIELD,
                                },
                                min: {
                                    value: classStartData,
                                    message: validationError.MIN_CLASS_END,
                                },
                            })}
                        />
                    </div>
                </div>
                {/* <div className="lg:absolute lg:bottom-2 w-full my-5 md:my-8 lg:my-0"> */}
                <div className="md:flex md:justify-between w-full mt-2 gap-1">
                    <button
                        type="button"
                        className="text-dark-gray w-[90%] font-semibold mobile:mb-2 mobile:w-full p-2 md:px-6 md:py-2 border rounded-lg"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={!isValid || !isProfileFormValid}
                        className={`text-white w-[90%] ${
                            !isValid || !isProfileFormValid
                                ? 'bg-gray-300'
                                : 'bg-primary-color'
                        } font-semibold mobile:w-full p-2 md:px-6 md:py-2 border rounded-lg`}
                    >
                        Save
                    </button>
                </div>
                {/* </div> */}
            </form>
        </div>
    );
}

export default SchoolProfile;

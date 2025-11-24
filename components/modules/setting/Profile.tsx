'use client';

import { toast } from 'sonner';
import {
    FormProvider,
    useForm,
    SubmitHandler,
    FieldValues,
} from 'react-hook-form';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { validationError } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import Input from '@/components/common/Input';
import Loader from '@/components/common/ButtonLoader';
import { updateUserProfileAction } from '@/actions/users';
import useProfileImage from '@/hooks/useProfileImage';
import ProfileImage from '@/components/common/ProfileImage';
import DialogBox from '@/components/common/DialogBox';
import PageLoader from '@/components/common/PageLoader';

// type for the form data
type ProfileFormData = {
    firstName: string;
    lastName: string;
    email: string;
    password?: string;
};

function Profile() {
    const { data, update, status } = useSession();
    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);
    const [showDiscardDialog, setShowDiscardDialog] = useState(false);

    // Store original values to detect changes
    const [originalValues, setOriginalValues] = useState({
        firstName: '',
        lastName: '',
        profilePicture: '',
    });

    const {
        hiddenFileInput,
        selectedFile,
        currentImage,
        setOriginalImage,
        setCurrentImage,
        handleClick,
        handleFileChange,
        removeImage,
        undoImageChange,
    } = useProfileImage();

    const methods = useForm({
        mode: 'onChange',
        reValidateMode: 'onChange',
    });

    // Watch form fields to make button reactive
    const watchedFields = methods.watch(['firstName', 'lastName', 'password']);

    // Function to check if there are unsaved changes
    const hasUnsavedChanges = () => {
        const { firstName, lastName, password } = methods.getValues();
        const hasNameChange =
            firstName?.trim() !== originalValues.firstName ||
            lastName?.trim() !== originalValues.lastName;
        const hasPasswordChange = password && password.trim().length > 0;
        const hasImageChange = selectedFile !== null;
        const hasImageRemoval = originalValues.profilePicture && !currentImage;

        return (
            hasNameChange ||
            hasPasswordChange ||
            hasImageChange ||
            hasImageRemoval
        );
    };

    // Function to confirm discard changes
    const handleConfirmDiscard = () => {
        setShowDiscardDialog(false);
        undoImageChange();
        methods.reset({
            firstName: originalValues.firstName,
            lastName: originalValues.lastName,
            email: methods.getValues('email'),
            password: '',
        });
    };

    // Function to cancel discard
    const handleCancelDiscard = () => {
        setShowDiscardDialog(false);
    };

    // Function to undo all changes made before clicking save
    const handleReset = () => {
        if (hasUnsavedChanges()) {
            setShowDiscardDialog(true);
        }
    };

    // Function to handle form submission
    const onFormSubmit = async (formData: ProfileFormData) => {
        const sessionUser = data?.user as
            | { token?: string; id?: string }
            | undefined;
        const accessToken = sessionUser?.token;
        const userId = sessionUser?.id;

        if (!accessToken || !userId) {
            toast.error('No access token found');
            return;
        }

        const { firstName, lastName, password } = formData;

        // Check if any changes were made
        const hasNameChange =
            firstName.trim() !== originalValues.firstName ||
            lastName.trim() !== originalValues.lastName;
        const hasPasswordChange = password && password.trim().length > 0;
        const hasImageChange = selectedFile !== null;
        const hasImageRemoval = originalValues.profilePicture && !currentImage;

        if (
            !hasNameChange &&
            !hasPasswordChange &&
            !hasImageChange &&
            !hasImageRemoval
        ) {
            toast.error('No changes made to update');
            return;
        }

        setLoading(true);
        try {
            // Create FormData for the API call
            const formDataToSend = new FormData();

            if (firstName?.trim()) {
                formDataToSend.append('firstName', firstName.trim());
            }
            if (lastName?.trim()) {
                formDataToSend.append('lastName', lastName.trim());
            }
            if (password?.trim()) {
                formDataToSend.append('password', password.trim());
            }

            // Handle profile picture
            if (selectedFile) {
                // New picture selected
                formDataToSend.append('profilePicture', selectedFile);
            } else if (originalValues.profilePicture && !currentImage) {
                // Picture was removed (had a picture before, now it's empty)
                formDataToSend.append('removeProfilePicture', 'true');
            }

            // Call the update action
            const response = await updateUserProfileAction(
                accessToken,
                userId,
                formDataToSend
            );

            if (!response.success) {
                throw new Error(response.error || 'Failed to update profile');
            }

            // Update profile picture if it was changed
            const updatedUser = response.data?.data;
            if (updatedUser?.profilePicture) {
                setCurrentImage(updatedUser.profilePicture);
                setOriginalImage(updatedUser.profilePicture);
            } else if (updatedUser?.profilePicture === null) {
                // Picture was removed
                setCurrentImage('');
                setOriginalImage('');
            }

            // Update next auth session data
            await update({
                ...data,
                user: {
                    ...data?.user,
                    firstName,
                    lastName,
                    name: `${firstName} ${lastName}`,
                    profilePicture: updatedUser?.profilePicture || null,
                },
            });

            methods.reset({
                firstName,
                lastName,
                email: formData.email,
                password: '',
            });

            toast.success('Profile Updated Successfully');

            // Update original values after successful save
            setOriginalValues({
                firstName,
                lastName,
                profilePicture:
                    updatedUser?.profilePicture === null
                        ? ''
                        : updatedUser?.profilePicture || '',
            });
        } catch (error) {
            const errorMessage =
                error instanceof Error
                    ? error.message
                    : 'Error updating profile';
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    // Fetch profile data on component mount
    useEffect(() => {
        if (status === 'authenticated' && data?.user) {
            const user = data.user as {
                firstName?: string;
                lastName?: string;
                name?: string;
                email?: string;
                profilePicture?: string | null;
            };

            // Try to use firstName and lastName, fallback to splitting name
            let firstName = user.firstName || '';
            let lastName = user.lastName || '';

            if (!firstName && user.name) {
                const nameParts = user.name.trim().split(' ');
                firstName = nameParts[0] || '';
                lastName = nameParts.slice(1).join(' ') || '';
            }

            const profilePic = user.profilePicture || '';

            // Set original values for comparison
            setOriginalValues({
                firstName,
                lastName,
                profilePicture: profilePic,
            });

            methods.reset({
                firstName,
                lastName,
                email: user.email || '',
                password: '',
            });

            setOriginalImage(profilePic);
            setCurrentImage(profilePic);
            setInitialLoading(false);
        }
    }, [data?.user, status, methods, setCurrentImage, setOriginalImage]);

    // Show loading while session is being fetched OR initial data load
    if (status === 'loading' || initialLoading) {
        return <PageLoader />;
    }

    return (
        <>
            <section className="bg-white flex mobile:flex-col mobile:gap-5 h-full w-full mt-8 lg:mt-0 md:gap-10 justify-center">
                <div className="flex flex-col mobile:items-center mobile:w-full mobile:px-2 'm-auto mobile:h-screen w-[418px]">
                    <FormProvider {...methods}>
                        <form
                            className="mobile:w-full"
                            onSubmit={methods.handleSubmit(
                                onFormSubmit as SubmitHandler<FieldValues>
                            )}
                        >
                            <ProfileImage
                                selectedFile={selectedFile}
                                currentImage={currentImage}
                                handleClick={handleClick}
                                handleFileChange={handleFileChange}
                                hiddenFileInput={hiddenFileInput as any}
                                removeImage={removeImage}
                                inSettings
                            />
                            <div className="mb-2 w-full mt-4">
                                <Label htmlFor="firstName">First Name</Label>
                                <Input
                                    name="firstName"
                                    placeholder="Enter First Name"
                                    type="text"
                                    rules={{
                                        required: {
                                            value: true,
                                            message:
                                                validationError.REQUIRED_FIELD,
                                        },
                                    }}
                                />
                            </div>
                            <div className="mb-2 w-full">
                                <Label htmlFor="lastName">Last Name</Label>
                                <Input
                                    name="lastName"
                                    placeholder="Enter Last Name"
                                    type="text"
                                />
                            </div>
                            <div className="mb-2 w-full">
                                <Label htmlFor="email">Email Address</Label>
                                <Input
                                    disabled
                                    name="email"
                                    placeholder="Enter Email"
                                    type="email"
                                    rules={{
                                        required: {
                                            value: true,
                                            message:
                                                validationError.REQUIRED_FIELD,
                                        },
                                        pattern: {
                                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                            message:
                                                validationError.VALID_EMAIL,
                                        },
                                    }}
                                />
                            </div>
                            <div className="mb-4 w-full">
                                <Label htmlFor="password">
                                    Password (Optional)
                                </Label>
                                <Input
                                    name="password"
                                    placeholder="Enter new password"
                                    type="password"
                                    rules={{
                                        minLength: {
                                            value: 6,
                                            message:
                                                'Password must be at least 6 characters',
                                        },
                                    }}
                                />
                            </div>
                            <div className="flex lg:flex-row flex-col lg:space-x-2 lg:space-y-0 space-y-2 lg:justify-between w-full mt-4">
                                <button
                                    type="button"
                                    onClick={handleReset}
                                    className="text-dark-gray font-semibold w-full px-5 py-2 border rounded-xl hover:bg-gray-200"
                                >
                                    Discard
                                </button>
                                <button
                                    type="submit"
                                    disabled={
                                        !methods.formState.isValid ||
                                        loading ||
                                        !hasUnsavedChanges()
                                    }
                                    className={`text-white ${
                                        !methods.formState.isValid ||
                                        loading ||
                                        !hasUnsavedChanges()
                                            ? 'bg-gray-300 cursor-not-allowed'
                                            : 'bg-primary-color hover:bg-orange-500'
                                    } font-semibold w-full px-5 py-2 border rounded-xl`}
                                >
                                    {loading ? <Loader /> : 'Save'}
                                </button>
                            </div>
                        </form>
                    </FormProvider>
                </div>
            </section>
            {showDiscardDialog && (
                <DialogBox
                    isOpen={showDiscardDialog}
                    message="You have unsaved changes. Do you want to discard them?"
                    onYes={handleConfirmDiscard}
                    onNo={handleCancelDiscard}
                />
            )}
        </>
    );
}

export default Profile;

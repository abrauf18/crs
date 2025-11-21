'use client';

import { toast } from 'react-toastify';
import React, { useEffect, useState } from 'react';
import {
    useForm,
    SubmitHandler,
    FieldValues,
    FormProvider,
} from 'react-hook-form';
import { useSession } from 'next-auth/react';
import { Label } from '@/app/components/ui/label';
import { validationError } from '@/lib/utils';
import Input from '@/app/components/common/Input';
import Loader from '@/app/components/common/ButtonLoader';
import { ModalHeader } from '@/app/components/common/ModalHeader';
import useProfileImage from '@/lib/custom-hooks/useProfileImage';
import { updateUserProfileAction } from '@/lib/actions/users';
import DialogBox from '@/app/components/common/DialogBox';
import ProfileImage from '@/app/components/common/ProfileImage';

// type for the form data
type ProfileFormData = {
    firstName: string;
    lastName: string;
    email: string;
    password?: string;
};

function ProfileModal({
    onClose,
    userId,
    name,
    email,
    profilePicture,
    isViewOnly,
    onUserUpdated,
}: {
    onClose: () => void;
    userId: string;
    name: string;
    email: string;
    role: string;
    profilePicture?: string;
    isViewOnly?: boolean;
    onUserUpdated?: () => void;
}) {
    const { data } = useSession();
    const [loading, setLoading] = useState(false);
    const [heading, setHeading] = useState(name);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [tagline, setTagline] = useState(email);
    const [showDiscardDialog, setShowDiscardDialog] = useState(false);

    // Store original values to detect changes
    const [originalValues, setOriginalValues] = useState({
        firstName: '',
        lastName: '',
        profilePicture: profilePicture || '',
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

    // Function to handle backdrop click
    const handleBackdropClick = () => {
        if (hasUnsavedChanges()) {
            setShowDiscardDialog(true);
        } else {
            onClose();
        }
    };

    // Function to confirm discard changes
    const handleConfirmDiscard = () => {
        setShowDiscardDialog(false);
        undoImageChange();
        methods.reset();
        onClose();
    };

    // Function to cancel discard
    const handleCancelDiscard = () => {
        setShowDiscardDialog(false);
    };

    // Function to undo all changes made before clicking save
    const handleReset = () => {
        if (hasUnsavedChanges()) {
            setShowDiscardDialog(true);
        } else {
            onClose();
        }
    };

    // Function to handle form submission
    const onFormSubmit = async (formData: ProfileFormData) => {
        const sessionUser = data?.user as { token?: string } | undefined;
        const accessToken = sessionUser?.token;

        if (!accessToken) {
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
            } else if (profilePicture && !currentImage) {
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

            // Update heading with new name
            const updatedName = `${firstName} ${lastName}`;
            setHeading(updatedName);

            // Update profile picture if it was changed
            // Backend returns: { success: true, data: { status: 'success', data: updatedUser[0] } }
            const updatedUser = response.data?.data;
            if (updatedUser?.profilePicture) {
                setCurrentImage(updatedUser.profilePicture);
                setOriginalImage(updatedUser.profilePicture);
            } else if (updatedUser?.profilePicture === null) {
                // Picture was removed
                setCurrentImage('');
                setOriginalImage('');
            }

            methods.reset({
                firstName,
                lastName,
                email,
                password: '',
            });

            toast.success('Profile Updated Successfully');

            // Refresh the users list
            if (onUserUpdated) {
                onUserUpdated();
            }

            // Close modal after successful save
            onClose();
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

    useEffect(() => {
        // Initialize profile picture if provided
        if (profilePicture) {
            setOriginalImage(profilePicture);
            setCurrentImage(profilePicture);
        } else {
            setOriginalImage('');
            setCurrentImage('');
        }

        // Split name into firstName and lastName
        const nameParts = name.trim().split(' ');
        const firstName = nameParts[0] || '';
        const lastName = nameParts.slice(1).join(' ') || '';

        // Set original values for comparison
        setOriginalValues({
            firstName,
            lastName,
            profilePicture: profilePicture || '',
        });

        methods.reset({
            firstName,
            lastName,
            email,
            password: '',
        });
    }, [
        email,
        methods,
        name,
        profilePicture,
        setCurrentImage,
        setOriginalImage,
    ]);

    return (
        <>
            {/* Backdrop for click-outside */}
            <div
                className="fixed inset-0 z-40 bg-black bg-opacity-50"
                onClick={handleBackdropClick}
            />
            <section className="fixed right-0 top-0 z-50 md:w-[60%] lg:w-[30%] w-full bg-white h-screen py-4 shadow-lg overflow-y-auto">
                <FormProvider {...methods}>
                    <form
                        onSubmit={methods.handleSubmit(
                            onFormSubmit as SubmitHandler<FieldValues>
                        )}
                    >
                        <div className="px-6 pb-4">
                            <ModalHeader
                                headerText={{
                                    heading,
                                    tagline,
                                }}
                                onClose={onClose}
                            />
                            <div className="flex flex-col  mobile:items-center w-full">
                                <ProfileImage
                                    isViewOnly={isViewOnly}
                                    selectedFile={selectedFile}
                                    currentImage={currentImage}
                                    handleClick={handleClick}
                                    handleFileChange={handleFileChange}
                                    hiddenFileInput={hiddenFileInput}
                                    removeImage={removeImage}
                                />
                                <div className="mb-2 w-full mt-4">
                                    <Label htmlFor="firstName">
                                        First Name
                                    </Label>
                                    <Input
                                        disabled={isViewOnly}
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
                                        disabled={isViewOnly}
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
                                {!isViewOnly && (
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
                                )}
                                {!isViewOnly && (
                                    <div className="flex lg:flex-row flex-col lg:space-x-2 lg:space-y-0 space-y-2 lg:justify-between w-full mt-4">
                                        <button
                                            type="button"
                                            onClick={handleReset}
                                            className="text-dark-gray font-semibold  w-full px-5 py-2 border rounded-xl hover:bg-gray-200"
                                        >
                                            Discard
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={
                                                !methods.formState.isValid || loading
                                            }
                                            className={`text-white ${
                                                !methods.formState.isValid || loading
                                                    ? 'bg-gray-300'
                                                    : 'bg-primary-color'
                                            } font-semibold w-full px-5 py-2  border rounded-xl hover:bg-orange-500`}
                                        >
                                            {loading ? <Loader /> : 'Save'}
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </form>
                </FormProvider>
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

export default ProfileModal;

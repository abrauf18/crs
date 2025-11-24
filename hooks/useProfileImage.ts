import React, { useRef, useState, useEffect } from 'react';
import { DEFAULT_IMAGE } from '@/lib/utils';
import { DeleteProfilePicture, UploadProfilePicture } from '@/actions/s3bucket'

const useProfileImage = () => {
    const hiddenFileInput = useRef<HTMLInputElement | null>(null);
    const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
    const [originalImage, setOriginalImage] = useState<string>(DEFAULT_IMAGE);
    const [currentImage, setCurrentImage] = useState<string>(DEFAULT_IMAGE);

    // Function to handle clicking on the hidden input to access images
    const handleClick = (event: React.MouseEvent) => {
        hiddenFileInput.current?.click();
    };

    // Function to handle image file select on clicking hidden input
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        setSelectedFile(file);
        
        // Create preview URL for the selected file
        if (file) {
            const previewUrl = URL.createObjectURL(file);
            setCurrentImage(previewUrl);
        }
    };

    // Cleanup object URL when selectedFile changes
    useEffect(() => {
        return () => {
            if (selectedFile && currentImage !== DEFAULT_IMAGE && currentImage !== originalImage) {
                URL.revokeObjectURL(currentImage);
            }
        };
    }, [selectedFile, currentImage, originalImage]);

    // Function to remove the selected image and profile picture
    const removeImage = () => {
        setSelectedFile(null);
        setCurrentImage(DEFAULT_IMAGE);
    };

    // Function to undo all changes made on profile image before clicking save
    const undoImageChange = () => {
        setSelectedFile(null);
        if (hiddenFileInput.current) {
            hiddenFileInput.current.value = '';
        }
        setCurrentImage(originalImage);
    };

    // Function to upload profile picture
    const uploadProfilePicture = async (userId: string) => {
        const s3BucketResponse = await UploadProfilePicture({
            selectedFile,
            originalImage,
            userId,
        });

        return s3BucketResponse;
    };
    
    // check if profile picture should be reset
    const shouldResetProfilePicture = () => {
        if (
            !selectedFile &&
            originalImage !== DEFAULT_IMAGE &&
            currentImage === DEFAULT_IMAGE
        ) {
            return true;
        }
        return false;
    };

    // Function to delete profile picture
    const deleteProfilePicture = async () => {
        await DeleteProfilePicture(originalImage);
    };


    return {
        hiddenFileInput,
        selectedFile,
        originalImage,
        currentImage,
        setOriginalImage,
        setCurrentImage,
        handleClick,
        handleFileChange,
        removeImage,
        undoImageChange,
        uploadProfilePicture,
        shouldResetProfilePicture,
        deleteProfilePicture,
    };
};

export default useProfileImage;

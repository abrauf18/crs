import { DEFAULT_IMAGE } from '@/lib/utils';
import axios from 'axios';

export const UploadProfilePicture = async ({
    selectedFile,
    originalImage,
    userId,
}: {
    selectedFile: any;
    originalImage: string;
    userId: string;
}) => {
    if (selectedFile) {
        try {
            if (originalImage !== DEFAULT_IMAGE) {
                await DeleteProfilePicture(originalImage);
            }
            const formData = new FormData();
            formData.append('file', selectedFile);
            formData.append('fileSaveDirectory', 'ProfilePictures');
            formData.append('userId', userId);

            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_BASE_FRONTEND_URL}/api/s3Bucket`,
                formData
            );

            if (response.status === 200) {
                return response;
            }
        } catch (error) {
            return {
                status: 500,
                message: 'Error Uploading Image',
            };
        }
    }
    return {
        status: 400,
        message: 'Image Not Selected',
    };
};

export const DeleteProfilePicture = async (objectUrl: string) => {
    try {
        const response = await axios.delete(
            `${process.env.NEXT_PUBLIC_BASE_FRONTEND_URL}/api/s3Bucket`,
            {
                data: { url: objectUrl },
            }
        );
        if (response.status === 200) {
            return response;
        }
        return {
            status: 500,
            message: 'Error Deleting Image',
        };
    } catch (error) {
        return {
            status: 500,
            message: 'Error Deleting Image',
        };
    }
};

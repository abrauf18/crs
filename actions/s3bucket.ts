"use server";

import { DEFAULT_IMAGE } from '@/lib/utils';

export const UploadProfilePicture = async ({
    selectedFile,
    originalImage,
    userId,
}: {
    selectedFile: any;
    originalImage: string;
    userId: string;
}) => {
    if (!selectedFile) {
        return {
            status: 400,
            message: 'Image Not Selected',
        };
    }
    try {
        if (originalImage !== DEFAULT_IMAGE) {
            await DeleteProfilePicture(originalImage);
        }
        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('fileSaveDirectory', 'ProfilePictures');
        formData.append('userId', userId);

        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_FRONTEND_URL}/api/s3Bucket`,
            {
                method: 'POST',
                credentials: 'include',
                body: formData,
            }
        );

        const data = await response.json();
        return { data, status: response.status, statusText: response.statusText };
    } catch (error) {
        return {
            status: 500,
            message: 'Error Uploading Image',
        };
    }
};

export const DeleteProfilePicture = async (objectUrl: string) => {
    try {
        if (objectUrl === DEFAULT_IMAGE) {
            return {
                status: 400,
                message: 'Default Image Cannot Be Deleted',
            };
        }
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_FRONTEND_URL}/api/s3Bucket`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ url: objectUrl }),
            }
        );

        const data = await response.json();
        return { data, status: response.status, statusText: response.statusText };
    } catch (error) {
        return {
            status: 500,
            message: 'Error Deleting Image',
        };
    }
};

export const UploadResource = async ({
    selectedFile,
    userId,
    onUploadProgress,
}: {
    selectedFile: any;
    userId: string;
    onUploadProgress?: (progressEvent: any) => void;
}) => {
    if (!selectedFile) {
        return {
            status: 400,
            message: 'File Not Selected',
        };
    }
    try {
        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('fileSaveDirectory', 'Resources');
        formData.append('userId', userId);

        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_FRONTEND_URL}/api/s3Bucket`,
            {
                method: 'POST',
                credentials: 'include',
                body: formData,
            }
        );

        const data = await response.json();
        return { data, status: response.status, statusText: response.statusText };
    } catch (error) {
        return {
            status: 500,
            message: 'Error Uploading Resource',
        };
    }
};

export const DeleteResource = async (objectUrl: string) => {
    try {
        if (objectUrl === DEFAULT_IMAGE) {
            return {
                status: 400,
                message: 'Default Image Cannot Be Deleted',
            };
        }
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_FRONTEND_URL}/api/s3Bucket`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ url: objectUrl }),
            }
        );

        const data = await response.json();
        return { data, status: response.status, statusText: response.statusText };
    } catch (error) {
        return {
            status: 500,
            message: 'Error Deleting Image',
        };
    }
};

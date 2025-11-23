import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { FileTypes } from './types/course';
import {
    EyeIcon,
    FileIcon,
    FileTextIcon,
    ImageIcon,
    Pencil,
    VideoIcon,
} from 'lucide-react';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const validationError = {
    REQUIRED_FIELD: 'This field is required',
    VALID_EMAIL: 'Please enter a valid email address',
    PASSWORD_VALIDATION_INFO_TEXT:
        'Password must contain at least 1 uppercase, 1 lowercase, 1 number, 1 special character, and be 8-20 characters long',
    MIN_LENGTH: 'Value is too short',
    MAX_LENGTH: 'Value is too long',
    MIN_SCHOOL_NAME_LENGTH: 'School name must be at least 3 characters',
    MAX_SCHOOL_NAME_LENGTH: 'School name must not exceed 25 characters',
    MIN_CLASSES_NUM: 'Number of classrooms must be at least 1',
    MIN_CLASS_START: 'Starting class must be 0 or greater',
    MIN_CLASS_END:
        'Ending class must be greater than or equal to starting class',
};

export function getFileType(url: string): FileTypes {
    const extension = url.split('.').pop()?.toLowerCase();

    const fileType = ['png', 'jpg', 'jpeg', 'gif', 'webp'].includes(extension!)
        ? 'image'
        : ['mp4', 'webm', 'mov'].includes(extension!)
          ? 'video'
          : extension === 'pdf'
            ? 'pdf'
            : ['doc', 'docx'].includes(extension!)
              ? 'doc'
              : ['ppt', 'pptx'].includes(extension!)
                ? 'ppt'
                : 'other';
    return fileType;
}
export function getFileIcon(fileType: FileTypes): React.ReactNode {
    switch (fileType) {
        case 'image':
            return React.createElement(ImageIcon, {
                className: 'w-10 h-10 text-blue-500',
            });
        case 'video':
            return React.createElement(VideoIcon, {
                className: 'w-10 h-10 text-red-500',
            });
        case 'pdf':
            return React.createElement(FileTextIcon, {
                className: 'w-10 h-10 text-amber-500',
            });
        default:
            return React.createElement(FileIcon, {
                className: 'w-10 h-10 text-gray-500',
            });
    }
}

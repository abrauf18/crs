import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

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
    MIN_CLASS_END: 'Ending class must be greater than or equal to starting class',
};

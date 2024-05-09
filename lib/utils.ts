import { twMerge } from 'tailwind-merge';
import { LucideIcon } from 'lucide-react';
import { type ClassValue, clsx } from 'clsx';
import VideoIcon from '@/app/assets/icons/VideoIcon';
import TicketIcon from '@/app/assets/icons/TicketIcon';
import ResourceIcon from '@/app/assets/icons/ResourceIcon';
import SlideShowIcon from '@/app/assets/icons/SlideShowIcon';
import WorksheetIcon from '@/app/assets/icons/WorksheetIcon';
import QuestionMarkIcon from '@/app/assets/icons/QuestionMarkIcon';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function convertDashesToSpaces(str: string) {
    return str
        .replace(/^[a-z]/, (match) => match.toUpperCase()) // Capitalize the first letter
        .replace(/-/g, ' '); // Replace hyphens with spaces
}

export function convertDashesToSpacesSimple(str: string) {
    return str.replace(/-/g, ' '); // Replace hyphens with spaces
}

export function convertSpacesToDashes(str: string) {
    return str.replace(/ /g, '-');
}

export const validationError = {
    PASSWORD_VALIDATION_INFO_TEXT:
        'Password must be 8 characters and must contain at least 1 small alphabet, 1 capital alphabet, 1 numeric value and 1 special character',
    REQUIRED_FIELD: 'This is required',
    MIN_LENGTH: 'Password should contain minimum 8 characters long',
    MAX_LENGTH: 'Password should contain maximum 20 characters long',
    VALID_EMAIL: 'Please enter a valid email',
    MIN_SCHOOL_NAME_LENGTH: 'School name should contain minimum 3 characters',
    MAX_SCHOOL_NAME_LENGTH: 'School name should contain maximum 25 characters',
    MIN_CLASSES_NUM: 'School should contain minimum of 1 class',
    MIN_CLASS_START: 'Class start should be atleast 0',
    MIN_CLASS_END:
        'Classes End should be atleast greater than or equal to Classes Start',
};

export const DEFAULT_IMAGE =
    'https://crs-data-storage-bucket.s3.ap-southeast-2.amazonaws.com/ProfilePictures/defaultImage.JPG';

export enum ResourceType {
    VIDEO = 'video',
    SLIDESHOW = 'slideshow',
    WORKSHEET = 'worksheet',
    EXIT_TICKET_TEST = 'exit-ticket-test',
    QUIZ = 'quiz',
}

export const ResourceToPath = {
    [ResourceType.VIDEO]: 'Total-Videos',
    [ResourceType.SLIDESHOW]: 'Slideshows',
    [ResourceType.WORKSHEET]: 'Worksheets',
    [ResourceType.EXIT_TICKET_TEST]: 'Exit-Ticket-Test',
    [ResourceType.QUIZ]: 'Quizzes',
};

export const PathToResource = {
    "Total-Video's": ResourceType.VIDEO,
    Slideshows: ResourceType.SLIDESHOW,
    Worksheets: ResourceType.WORKSHEET,
    'Exit-Ticket-Test': ResourceType.EXIT_TICKET_TEST,
    Quizzes: ResourceType.QUIZ,
};

export const commonFilterOptions = [
    { value: '', label: 'Select Filters' },
    { value: 'Newest-First', label: 'Newest First' },
    { value: 'Oldest-First', label: 'Oldest First' },
    { value: 'Name-Alphabetical', label: 'Name: A to Z' },
    { value: 'Name-Reverse-Alphabetical', label: 'Name: Z to A' },
];

export const commonFilterQueries = {
    'Newest-First': { orderBy: 'createdAt', sortBy: 'desc' },
    'Oldest-First': { orderBy: 'createdAt', sortBy: 'asc' },
    'Name-Alphabetical': { orderBy: 'name', sortBy: 'asc' },
    'Name-Reverse-Alphabetical': { orderBy: 'name', sortBy: 'desc' },
};

export const DEFAULT_RESOURCE = {
    id: '',
    name: '',
    type: ResourceType.QUIZ,
    topic: '',
    url: '',
    show: '',
};

export interface Resource {
    id: string;
    name: string;
    type: ResourceType;
    topic: string;
    url?: string; // remove ? after completion of CRS to prevent breakages
    show?: string; // remove ? after completion of CRS to prevent breakages
}

export interface VideoSummary {
    id: string,
    resourceId: string,
    thumbnailURL: string,
    name: string,
    questionCountNumber: number,
    topicsCount: number
}

export const resourceDropDownOptions = [
    { label: ResourceType.QUIZ, value: 'Quiz' },
    { label: ResourceType.VIDEO, value: 'Video' },
    { label: ResourceType.SLIDESHOW, value: 'Slideshow' },
    { label: ResourceType.WORKSHEET, value: 'Worksheet' },
    { label: ResourceType.EXIT_TICKET_TEST, value: 'Exit-Ticket-Test' },
];

export const resourceTypeToIcon = (resourceType: ResourceType) => {
    let Icon;
    switch (resourceType) {
        case 'video':
            Icon = VideoIcon;
            break;
        case 'slideshow':
            Icon = SlideShowIcon;
            break;
        case 'worksheet':
            Icon = WorksheetIcon;
            break;
        case 'exit-ticket-test':
            Icon = TicketIcon;
            break;
        case 'quiz':
            Icon = QuestionMarkIcon;
            break;
        default:
            Icon = ResourceIcon;
            break;
    }
    return Icon;
}

type IconComponent = React.ComponentType<React.SVGProps<SVGSVGElement>> | LucideIcon;

export const resourceTypeToJsxIcon = (resourceType: ResourceType): IconComponent => {
    switch (resourceType) {
        case ResourceType.VIDEO:
            return VideoIcon;
        case ResourceType.SLIDESHOW:
            return SlideShowIcon;
        case ResourceType.WORKSHEET:
            return WorksheetIcon;
        case ResourceType.EXIT_TICKET_TEST:
            return TicketIcon;
        case ResourceType.QUIZ:
            return QuestionMarkIcon;
        default:
            return ResourceIcon;
    }
};

export const DEFAULT_VIDEO = {
    id: "",
    resourceId: "",
    thumbnailURL: "",
    createdAt: "",
    updatedAt: "",
    name: "",
    videoUrl:"",
    questions: [],
    topics: {}
}

export interface Video {
    id: string,
    resourceId: string,
    thumbnailURL: string,
    createdAt: string,
    updatedAt: string,
    name: string,
    videoUrl: string,
    questions: {
        statement: string,
        options: { [key: string]: string },
        correctOption: string,
        correctOptionExplanation: string,
        totalMarks: number,
        popUpTime: string
    }[],
    topics: { [key: string]: string }
}


export const timeStringToSeconds = (timeString: string) => {
    if(!timeString){
        return -1;
    }
    const [hours, minutes, seconds] = timeString?.split(':');
    return parseInt(hours) * 3600 + parseInt(minutes) * 60 + parseInt(seconds);
}

export const secondsToString = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const hoursString = String(hours).padStart(2, '0');
    const minutesString = String(minutes).padStart(2, '0');
    const secondsString = String(remainingSeconds).padStart(2, '0');

    const timeString = `${hoursString}:${minutesString}:${secondsString}`;
    return timeString;
}
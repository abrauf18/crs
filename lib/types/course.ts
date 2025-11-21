import {
    CourseStatusOptionsType,
    CourseTypeOptionsType,
} from '../schemas/course';

export type Resource = {
    id: string;
    courseId: string;
    name: string;
    topic: string;
    type: CourseTypeOptionsType;
    url: string;
    status: CourseStatusOptionsType;
    createdAt: string;
    updatedAt: string;
};

export type Course = {
    id: string;
    name: string;
    description: string;
    courseLength: string;
    price: string;
    createdAt: string;
    updatedAt: string;
};

export type CourseDetail = {
    id: string;
    name: string;
    description: string;
    courseLength: string;
    price: string;
    createdAt: string;
    updatedAt: string;
    resources: Resource[];
};

export type FileTypes = 'pdf' | 'video' | 'image' | 'doc' | 'other' | 'ppt';

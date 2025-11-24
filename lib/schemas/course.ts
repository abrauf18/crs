import { z } from 'zod';

export const courseTypeOptions = [
    {
        label: 'Slideshow',
        value: 'SLIDESHOW',
    },
    {
        label: 'Video',
        value: 'VIDEO',
    },
    {
        label: 'Worksheet',
        value: 'WORKSHEET',
    },
    {
        label: 'Quiz',
        value: 'QUIZ',
    },
    {
        label: 'Assignment',
        value: 'ASSIGNMENT',
    },
    {
        label: 'Lab',
        value: 'LAB',
    },
    {
        label: 'Station',
        value: 'STATION',
    },
    {
        label: 'Activity',
        value: 'ACTIVITY',
    },
    {
        label: 'Guided Note',
        value: 'GUIDED_NOTE',
    },
    {
        label: 'Discussion',
        value: 'DISCUSSION',
    },
    {
        label: 'Formative Assessment',
        value: 'FORMATIVE_ASSESSMENT',
    },
    {
        label: 'Summative Assessment',
        value: 'SUMMARIZE_ASSESSMENT',
    },
    {
        label: 'Data Tracker',
        value: 'DATA_TRACKER',
    },
] as const;

export type CourseTypeOptionsType = (typeof courseTypeOptions)[number]['value'];
export const courseStatusOptions = [
    {
        label: 'Show',
        value: 'SHOW',
    },
    {
        label: 'Hide',
        value: 'HIDE',
    },
] as const;
export type CourseStatusOptionsType =
    (typeof courseStatusOptions)[number]['value'];
export const addResourceSchema = z.object({
    unit: z
        .string({ message: 'Unit Number is required' })
        .trim()
        .refine(
            (val) => !isNaN(parseInt(val)) && parseInt(val) >= 0,
            'Unit number must be a valid number'
        ),
    name: z.string().min(2, 'Name is required'),
    resources: z
        .array(
            z.object({
                topic: z.string().min(2, 'Topic is required'),
                type: z.enum(
                    courseTypeOptions.map(
                        (option) => option.value
                    ) as CourseTypeOptionsType[],
                    {
                        message: 'Type is required',
                    }
                ),
                status: z.enum(
                    courseStatusOptions.map(
                        (option) => option.value
                    ) as CourseStatusOptionsType[],
                    {
                        message: 'Status is required',
                    }
                ),
                file: z
                    .instanceof(File)
                    .optional()
                    .refine((val) => val instanceof File, {
                        message: 'File is required',
                    }),
            })
        )
        .min(1, 'Add at least one resource'),
});

export type AddResourceForm = z.infer<typeof addResourceSchema>;

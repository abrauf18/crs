'use client';

import React, { useState } from 'react';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Button } from '@/app/components/ui/button';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { createCourse, updateCourse } from '@/lib/actions/courses';
import { toast } from 'react-toastify';
import { Switch } from '@/app/components/ui/switch';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Course } from '@/lib/types/course';

const courseSchema = z
    .object({
        name: z.string().min(1, 'Course name is required'),
        description: z.string().min(1, 'Description is required'),
        courseLength: z
            .number()
            .min(1, 'Course length must be at least 1 minute'),
        isPaid: z.boolean(),
        price: z.number().optional(),
    })
    .refine((data) => (data.isPaid ? !!data.price : true), {
        message: 'Price is required for paid courses',
        path: ['price'],
    });

type CourseFormValues = z.infer<typeof courseSchema>;

export default function CreateCourseModal({
    defaultData,
    trigger,
}: {
    defaultData?: Course;
    trigger?: React.ReactNode;
}) {
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const isEditing = Boolean(defaultData);

    const {
        watch,
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
        setValue,
    } = useForm<CourseFormValues>({
        resolver: zodResolver(courseSchema),
        reValidateMode: 'onChange',
        defaultValues: {
            name: defaultData?.name || '',
            description: defaultData?.description || '',
            courseLength: Number(defaultData?.courseLength) || 30,
            isPaid: !!Number(defaultData?.price),
            price: Number(defaultData?.price) || 0,
        },
    });

    const onSubmit = async (values: CourseFormValues) => {
        const result = isEditing
            ? await updateCourse({
                  id: defaultData!.id,
                  ...values,
              })
            : await createCourse(values);
        if (result?.success) {
            toast.success(result?.message);
        } else {
            toast.error(result?.message);
        }
        reset();
        setIsDialogOpen(false);
    };

    const isPaid = watch('isPaid');
    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                {trigger || (
                    <button
                        type="button"
                        className="bg-primary-color text-white px-3 py-2 rounded"
                        onClick={() => setIsDialogOpen(true)}
                    >
                        Create Course
                    </button>
                )}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {isEditing ? 'Update' : 'Create'} Course
                    </DialogTitle>
                    <DialogDescription>
                        Fill in the details to{' '}
                        {isEditing ? 'update course' : 'create a new course'}.
                    </DialogDescription>
                </DialogHeader>
                <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-2">
                        <Label htmlFor="name">Course name</Label>
                        <Input
                            id="name"
                            placeholder="e.g. Algebra Basics"
                            {...register('name')}
                        />
                        {errors.name && (
                            <p className="text-sm text-red-600">
                                {errors.name.message}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <textarea
                            id="description"
                            placeholder="Add a brief description"
                            className="min-h-[100px] w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            {...register('description')}
                        />
                        {errors.description && (
                            <p className="text-sm text-red-600">
                                {errors.description.message}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="lengthInMinutes">
                            Course length (minutes)
                        </Label>
                        <Input
                            id="lengthInMinutes"
                            type="number"
                            min={1}
                            placeholder="60"
                            {...register('courseLength', {
                                valueAsNumber: true,
                            })}
                        />
                        {errors.courseLength && (
                            <p className="text-sm text-red-600">
                                {errors.courseLength.message}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="price" className="mr-2 ">
                            Is Paid
                        </Label>
                        <Switch
                            checked={isPaid}
                            {...register('isPaid')}
                            onCheckedChange={(value) => {
                                setValue('isPaid', value);
                                setValue('price', 0);
                            }}
                            className="mt-1"
                        />
                    </div>
                    {isPaid && (
                        <div className="space-y-2">
                            <Label htmlFor="lengthInMinutes">
                                Course Price
                            </Label>
                            <Input
                                id="price"
                                type="number"
                                min={1}
                                placeholder="60"
                                {...register('price', {
                                    valueAsNumber: true,
                                })}
                            />

                            {errors.price && (
                                <p className="text-sm text-red-600">
                                    {errors.price.message}
                                </p>
                            )}
                        </div>
                    )}

                    <div className="flex items-center justify-end gap-3 pt-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => {
                                reset();
                                setIsDialogOpen(false);
                            }}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Saving...' : 'Create course'}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}

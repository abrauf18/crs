'use client';

import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/app/components/ui/button';
import { toast } from 'react-toastify';
import {
    AddResourceForm,
    addResourceSchema,
    courseTypeOptions,
    courseStatusOptions,
    CourseTypeOptionsType,
    CourseStatusOptionsType,
} from '@/lib/schemas/course';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/app/components/ui/select';
import { useSession } from 'next-auth/react';
import { Resource } from '@/lib/types/course';
import { RenderFilePreview } from './render-file-preview';

interface AddResourceModalProps {
    courseId: string;
    trigger?: React.ReactNode;
    defaultData?: Resource;
}

export default function AddResourceModal({
    courseId,
    trigger,
    defaultData,
}: AddResourceModalProps) {
    const isEditing = Boolean(defaultData);
    const [open, setOpen] = useState(false);
    const [previewUrl, setPreviewUrl] = useState<string | null>(
        isEditing ? defaultData?.url || null : null
    );
    const { data: userData, status } = useSession();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setValue,
        reset,
    } = useForm<AddResourceForm>({
        resolver: zodResolver(addResourceSchema),
        reValidateMode: 'onChange',
        defaultValues:
            isEditing && defaultData
                ? {
                      name: defaultData.name,
                      topic: defaultData.topic,
                      type: defaultData.type,
                      status: defaultData.status,
                      file: defaultData.url,
                  }
                : undefined,
    });

    const onSubmit = async (data: AddResourceForm) => {
        try {
            if (status !== 'authenticated' || !data) {
                toast.error('You must be logged in to add a resource');
                return;
            }
            const formData = new FormData();
            formData.append('name', data.name);
            formData.append('topic', data.topic);
            formData.append('type', data.type);
            formData.append('status', data.status);
            if (typeof data.file !== 'string')
                formData.append('file', data.file as File);

            const API_URL = isEditing
                ? `${process.env.NEXT_PUBLIC_BASE_URL}/courses/${courseId}/resource/${defaultData?.id}`
                : `${process.env.NEXT_PUBLIC_BASE_URL}/courses/${courseId}/resource`;

            const res = await fetch(API_URL, {
                method: isEditing ? 'PUT' : 'POST',
                body: formData,
                headers: {
                    Authorization: `Bearer ${userData?.user?.token}`,
                },
            });

            const result = await res.json();
            if (!res.ok) {
                toast.error(result.message || 'Failed to add resource');
                return;
            }
            toast.success(result.message || 'Resource added successfully');

            reset();
            setOpen(false);
        } catch (error) {
            console.error('Error adding resource:', error);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {trigger || <Button>Add Resource</Button>}
            </DialogTrigger>

            <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>
                        {isEditing ? 'Edit Resource' : 'Add New Resource'}
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Name */}
                    <div>
                        <Label>Name</Label>
                        <Input
                            placeholder="Enter resource name"
                            {...register('name')}
                        />
                        {errors.name && (
                            <p className="text-red-500 text-sm">
                                {errors.name.message}
                            </p>
                        )}
                    </div>

                    {/* Topic */}
                    <div>
                        <Label>Topic</Label>
                        <Input placeholder="Topic" {...register('topic')} />
                        {errors.topic && (
                            <p className="text-red-500 text-sm">
                                {errors.topic.message}
                            </p>
                        )}
                    </div>

                    {/* Type */}
                    <div>
                        <Label>Type</Label>
                        <Select
                            {...register('type')}
                            onValueChange={(val: CourseTypeOptionsType) =>
                                setValue('type', val)
                            }
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select resource type" />
                            </SelectTrigger>
                            <SelectContent>
                                {courseTypeOptions.map((option) => (
                                    <SelectItem
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.type && (
                            <p className="text-red-500 text-sm">
                                {errors.type.message}
                            </p>
                        )}
                    </div>

                    {/* Status */}
                    <div>
                        <Label>Status</Label>
                        <Select
                            {...register('status')}
                            onValueChange={(val: CourseStatusOptionsType) =>
                                setValue('status', val)
                            }
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select resource status" />
                            </SelectTrigger>
                            <SelectContent>
                                {courseStatusOptions.map((option) => (
                                    <SelectItem
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.status && (
                            <p className="text-red-500 text-sm">
                                {errors.status.message}
                            </p>
                        )}
                    </div>

                    {/* File */}
                    <div>
                        <Label>File</Label>
                        <Input
                            type="file"
                            accept="video/*,application/pdf,image/*,.docx,.pptx"
                            onChange={(e) => {
                                const file = e.target.files?.[0] || null;
                                setValue('file', file, {
                                    shouldValidate: true,
                                });
                                setPreviewUrl(null);
                            }}
                        />
                        {errors.file && (
                            <p className="text-red-500 text-sm">
                                {errors.file.message}
                            </p>
                        )}
                        {previewUrl && isEditing && (
                            <div className="relative mt-3">
                                <RenderFilePreview previewUrl={previewUrl} />
                            </div>
                        )}
                    </div>

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        className="w-full"
                        disabled={isSubmitting}
                    >
                        {isSubmitting
                            ? isEditing
                                ? 'Updating...'
                                : 'Adding...'
                            : isEditing
                              ? 'Update Resource'
                              : 'Add Resource'}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}

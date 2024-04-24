import React from 'react';
import { toast } from 'react-toastify';
import { useSession } from 'next-auth/react';
import {
    useForm,
    SubmitHandler,
    FieldValues,
    FormProvider,
} from 'react-hook-form';
import {
    validationError,
    resourceDropDownOptions,
    ResourceType,
    resourceTypeToIcon,
} from '@/lib/utils';
import action from '@/app/action';
import Input from '@/app/components/common/Input';
import { Label } from '@/app/components/ui/label';
import { UploadResource } from '@/app/api/s3Bucket';
import Select from '@/app/components/common/DropDown';
import { createResourceAPI } from '@/app/api/resource';
import ResourceIcon from '@/app/assets/icons/ResourceIcon';
import UploadItem from '@/app/components/common/UploadItem';
import ModalFooter from '@/app/components/common/ModalFooter';
import FileUploading from '@/app/components/common/FileUploading';
import { ModalHeader } from '@/app/components/common/ModalHeader';
import { OptionsInterface } from '@/app/components/common/AppDropDown';

export const resourceTypeOptions: OptionsInterface[] = [
    ...resourceDropDownOptions,
];

// type for the form data
type ResourceFormData = {
    topic: string;
    type: string;
    name: string;
    thumbnail?: File;
};

function UploadResourceModal({ onClose }: any) {
    const { data } = useSession();
    const [progress, setProgress] = React.useState(0);
    const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
    const methods = useForm({
        mode: 'onChange',
        reValidateMode: 'onChange',
    });
    const resourceType = methods.watch('type');
    const thumbnailFile = methods.watch('thumbnail');

    const uploadFile = async (file: File) => {
        const response: any = await UploadResource({
            selectedFile: file,
            userId: data?.user?.id,
            onUploadProgress: (progressEvent) => {
                const percentage = Math.round(
                    (progressEvent.loaded * 50) / progressEvent.total
                );
                setProgress(percentage);
            },
        });

        if (response?.status !== 200) {
            toast.error(response?.message || 'Upload Failed');
            return null;
        }

        return response?.data?.url;
    };

    const createResource = async (
        url: string,
        formData: ResourceFormData,
        thumbnailURL?: string
    ) => {
        const resourceData: any = {
            accessToken: data?.user?.accessToken ?? '',
            name: formData.name,
            topic: formData.topic,
            type: formData.type,
            url,
            onUploadProgress: (progressEvent: {
                loaded: number;
                total: number;
            }) => {
                const percentage = Math.round(
                    (progressEvent.loaded * 50) / progressEvent.total + 50
                );
                setProgress(percentage);
            },
        };

        if (formData.type === ResourceType.VIDEO) {
            resourceData.thumbnailURL = thumbnailURL;
        }

        const response: any = await createResourceAPI(resourceData);

        if (response?.status !== 200) {
            toast.error(response?.message || 'Resource Upload Failed');
        }
    };

    const handleUpload = async (formData: ResourceFormData) => {
        try {
            if (!data?.user.accessToken) {
                return toast.error('Token Expire, Please Signin Again');
            }
            if (!selectedFile) {
                return toast.error('Please Select File');
            }

            const resourceURL = await uploadFile(selectedFile);
            if (!resourceURL) {
                return null;
            }

            if (resourceType === ResourceType.VIDEO) {
                if (!formData.thumbnail) {
                    return toast.error('Please Select Thumbnail');
                }
                const thumbnailURL = await uploadFile(thumbnailFile['0']);
                await createResource(resourceURL, formData, thumbnailURL);
            } else {
                await createResource(resourceURL, formData);
            }

            action('getResources');
            action('getResourcesCount');
            onClose();

            return toast.success('Resource Uploaded Successfully');
        } catch (error: any) {
            return toast.error(error?.message);
        }
    };

    const Icon = resourceTypeToIcon(resourceType);

    return (
        <section className="w-full bg-white h-screen py-4 shadow-lg">
            <FormProvider {...methods}>
                <form
                    onSubmit={methods.handleSubmit(
                        handleUpload as SubmitHandler<FieldValues>
                    )}
                >
                    <div className="lg:h-[41rem] md:h-[39rem] h-[33rem] overflow-y-auto w-full px-6">
                        <ModalHeader
                            headerText={{
                                heading: 'Upload Resource',
                                tagline: 'Upload Resource For Your User',
                            }}
                            Icon={ResourceIcon}
                            onClose={onClose}
                        />
                        <div className="flex flex-col space-y-2 mt-1">
                            <Label
                                htmlFor="type"
                                className="font-semibold text-md"
                            >
                                Resource Type
                            </Label>
                            <Select
                                name="type"
                                options={resourceTypeOptions}
                                rules={{
                                    required: {
                                        value: true,
                                        message: validationError.REQUIRED_FIELD,
                                    },
                                }}
                            />
                        </div>
                        <div className="flex flex-col space-y-1 mt-5">
                            <Label
                                htmlFor="topic"
                                className="font-semibold text-md"
                            >
                                Assign Topic
                            </Label>
                            <Input
                                name="topic"
                                placeholder="Enter Topic"
                                type="text"
                                rules={{
                                    required: {
                                        value: true,
                                        message: validationError.REQUIRED_FIELD,
                                    },
                                }}
                            />
                        </div>
                        <div className="flex flex-col space-y-1 mt-5">
                            <Label
                                htmlFor="name"
                                className="font-semibold text-md"
                            >
                                Name
                            </Label>
                            <Input
                                name="name"
                                placeholder="Enter Name"
                                type="text"
                                rules={{
                                    required: {
                                        value: true,
                                        message: validationError.REQUIRED_FIELD,
                                    },
                                }}
                            />
                        </div>
                        {resourceType === ResourceType.VIDEO && (
                            <div className="flex flex-col space-y-1 mt-5">
                                <Label
                                    htmlFor="thumbnail"
                                    className="font-semibold text-md"
                                >
                                    Video Thumbnail
                                </Label>
                                <Input
                                    name="thumbnail"
                                    placeholder="Select Thumbnail"
                                    type="file"
                                    rules={{
                                        required: {
                                            value: true,
                                            message:
                                                validationError.REQUIRED_FIELD,
                                        },
                                    }}
                                />
                            </div>
                        )}
                        <div className="mt-4">
                            {!selectedFile && (
                                <UploadItem
                                    itemName="Resource"
                                    setSelectedFile={setSelectedFile}
                                />
                            )}
                            {selectedFile && (
                                <FileUploading
                                    fileName={selectedFile.name}
                                    progress={progress}
                                    Icon={Icon}
                                />
                            )}
                            <div className="p-2 rounded-lg border w-32 text-center mt-3">
                                <button
                                    type="button"
                                    className="text-dark-gray text-sm"
                                    onClick={() => setSelectedFile(null)}
                                >
                                    Cancel Upload
                                </button>
                            </div>
                        </div>
                    </div>
                    <ModalFooter text="Upload" />
                </form>
            </FormProvider>
        </section>
    );
}

export default UploadResourceModal;

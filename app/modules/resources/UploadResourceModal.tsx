import React from 'react';
import { toast } from 'react-toastify';
import { useSession } from 'next-auth/react';
import {
    useForm,
    SubmitHandler,
    FieldValues,
    FormProvider,
} from 'react-hook-form';
import action from '@/app/action';
import { validationError } from '@/lib/utils';
import Input from '@/app/components/common/Input';
import { Label } from '@/app/components/ui/label';
import { UploadResource } from '@/app/api/s3Bucket';
import Select from '@/app/components/common/DropDown';
import ResourceIcon from '@/app/assets/icons/ResourceIcon';
import UploadItem from '@/app/components/common/UploadItem';
import ModalFooter from '@/app/components/common/ModalFooter';
import FileUploading from '@/app/components/common/FileUploading';
import { ModalHeader } from '@/app/components/common/ModalHeader';
import { OptionsInterface } from '@/app/components/common/AppDropDown';
import { createResourceAPI } from '@/app/api/resource';
import VideoIcon from '@/app/assets/icons/VideoIcon';
import SlideShowIcon from '@/app/assets/icons/SlideShowIcon';
import WorksheetIcon from '@/app/assets/icons/WorksheetIcon';
import TicketIcon from '@/app/assets/icons/TicketIcon';
import QuestionMarkIcon from '@/app/assets/icons/QuestionMarkIcon';
import { arrayBuffer } from 'stream/consumers';

// ENUM for the resource type
export enum ResourceType {
    VIDEO = 'video',
    SLIDESHOW = 'slideshow',
    WORKSHEET = 'worksheet',
    EXIT_TICKET_TEST = 'exit-ticket-test',
    QUIZ = 'quiz',
}

export const resourceTypeOptions: OptionsInterface[] = [
    { label: ResourceType.VIDEO, value: 'Video' },
    { label: ResourceType.SLIDESHOW, value: 'Slideshow' },
    { label: ResourceType.WORKSHEET, value: 'Worksheet' },
    { label: ResourceType.EXIT_TICKET_TEST, value: 'Exit-Ticket-Test' },
    { label: ResourceType.QUIZ, value: 'Quiz' },
];

// type for the form data
type ResourceFormData = {
    topic: string;
    type: string;
    name: string;
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

    const handleUpload = async (formData: ResourceFormData) => {
        // Upload resource to s3Bucket if selected
        if (selectedFile && data?.user?.accessToken) {
            const uploadAtS3: any = await UploadResource({
                selectedFile,
                userId: data?.user?.id,
                onUploadProgress: (progressEvent) => {
                    const percentage = Math.round(
                        (progressEvent.loaded * 10) / progressEvent.total
                    );
                    setProgress(percentage); // Update progress state
                },
            });
            // Handle resource upload error
            if (uploadAtS3?.status !== 200) {
                toast.error(uploadAtS3?.message || 'Resource Upload Failed');
            }
            // It is an axios response so we need to access the data property
            const resourceURL = uploadAtS3?.data?.url;

            const UploadAtBackend: any = await createResourceAPI({
                accessToken: data?.user?.accessToken,
                name: formData.name,
                topic: formData.topic,
                type: formData.type,
                url: resourceURL,
                onUploadProgress: (progressEvent) => {
                    const percentage = Math.round(
                        (progressEvent.loaded * 50) / progressEvent.total + 50
                    );
                    setProgress(percentage); // Update progress state
                },
            });
            // Handle resource upload error
            if (UploadAtBackend?.status !== 200) {
                toast.error(
                    UploadAtBackend?.message || 'Resource Upload Failed'
                );
            } else {
                action('getResources');
                action('getResourcesCount');
                onClose();
                toast.success('Resource Uploaded Successfully');
            }
        } else if (!data?.user.accessToken) {
            toast.error('Token Expire, Please Signin Again');
        } else {
            toast.error('Please Select File');
        }
    };

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
                            {/* {progress} */}
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

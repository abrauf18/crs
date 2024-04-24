import React from 'react';
import { toast } from 'react-toastify';
import { useSession } from 'next-auth/react';
import { FileVideoIcon, LucideIcon } from 'lucide-react';
import {
    useForm,
    SubmitHandler,
    FieldValues,
    FormProvider,
} from 'react-hook-form';
import action from '@/app/action';
import { Label } from '@/app/components/ui/label';
import Input from '@/app/components/common/Input';
import { UploadResource } from '@/app/api/s3Bucket';
import { createResourceAPI } from '@/app/api/resource';
import { validationError, ResourceType } from '@/lib/utils';
import UploadItem from '@/app//components/common/UploadItem';
import ModalFooter from '@/app/components/common/ModalFooter';
import FileUploading from '@/app/components/common/FileUploading';
import { ModalHeader } from '@/app/components/common/ModalHeader';

// type for the form data
type ResourceFormData = {
    topic: string;
    name: string;
    thumbnail?: File;
};

interface UploadResourceModalProp {
    headerText: string;
    description: string;
    Icon?: React.ComponentType<React.SVGProps<SVGSVGElement>> | LucideIcon;
    isDisplayHeaderIcon?: boolean;
    buttonText: string;
    onClose?: () => void;
    setUploadedVideoId: (id: string) => void;
    onButtonClick: () => void;
}
function UploadResourceModal({
    headerText,
    description,
    Icon,
    buttonText,
    isDisplayHeaderIcon,
    onClose,
    onButtonClick,
    setUploadedVideoId,
}: UploadResourceModalProp) {
    const { data } = useSession();
    const [progress, setProgress] = React.useState(0);
    const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
    const methods = useForm({
        mode: 'onChange',
        reValidateMode: 'onChange',
    });
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
            type: ResourceType.VIDEO,
            thumbnailURL,
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

        const response: any = await createResourceAPI(resourceData);

        if (response?.status !== 200) {
            toast.error(response?.message || 'Resource Upload Failed');
        }

        return response;
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

            if (!formData.thumbnail) {
                return toast.error('Please Select Thumbnail');
            }
            const thumbnailURL = await uploadFile(thumbnailFile['0']);
            const createResponse: any = await createResource(
                resourceURL,
                formData,
                thumbnailURL
            );
            const APIdata = createResponse?.data;

            const videoId = APIdata?.data?.videoAttributes?.id ?? '';
            if (setUploadedVideoId) {
                setUploadedVideoId(videoId);
            }

            action('getVideos');
            if (onButtonClick) {
                onButtonClick();
            }

            return toast.success('Video Uploaded Successfully');
        } catch (error: any) {
            return toast.error(error?.message);
        }
    };

    return (
        <section className="w-full bg-white h-screen py-4  shadow-lg">
            <FormProvider {...methods}>
                <form
                    onSubmit={methods.handleSubmit(
                        handleUpload as SubmitHandler<FieldValues>
                    )}
                >
                    <div className="h-[90%] overflow-y-auto w-full px-6">
                        <ModalHeader
                            headerText={{
                                heading: headerText,
                                tagline: description,
                            }}
                            Icon={
                                isDisplayHeaderIcon ? FileVideoIcon : undefined
                            }
                            onClose={onClose}
                        />
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
                                        message: validationError.REQUIRED_FIELD,
                                    },
                                }}
                            />
                        </div>
                        <div className="mt-4">
                            {!selectedFile && (
                                <UploadItem
                                    itemName="Video"
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
                        </div>
                    </div>
                    <ModalFooter text={buttonText} />
                </form>
            </FormProvider>
        </section>
    );
}

export default UploadResourceModal;

import React from 'react';
import { FileVideoIcon, LucideIcon } from 'lucide-react';
import ModalFooter from '@/app/components/common/ModalFooter';
import UploadItem from '@/app//components/common/UploadItem';
import FileUploading from '@/app/components/common/FileUploading';
import { ModalHeader } from '@/app/components/common/ModalHeader';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';

interface UploadResourceModalProp {
    headerText: string;
    description: string;
    Icon?: React.ComponentType<React.SVGProps<SVGSVGElement>> | LucideIcon;
    isDisplayHeaderIcon?: boolean;
    buttonText: string;
}
function UploadResourceModal({
    headerText,
    description,
    Icon,
    buttonText,
    isDisplayHeaderIcon,
}: UploadResourceModalProp) {
    return (
        <section className="w-full bg-white h-screen py-4 px-6 shadow-md">
            <div>
                <ModalHeader
                    headerText={{
                        heading: headerText,
                        tagline: description,
                    }}
                    Icon={isDisplayHeaderIcon ? FileVideoIcon : undefined}
                />
                <UploadItem itemName="Video" />
                <FileUploading Icon={Icon} />
                <div className="p-2 rounded-lg border w-32 text-center mt-3">
                    <button type="button" className="text-dark-gray text-sm">
                        Cancel Upload
                    </button>
                </div>
            </div>
            <ModalFooter text={buttonText} />
        </section>
    );
}

export default UploadResourceModal;

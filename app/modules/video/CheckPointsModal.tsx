/* eslint-disable react/no-array-index-key */
import { toast } from 'react-toastify';
import React, { useState } from 'react';
import { FileVideoIcon } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { Label } from '@/app/components/ui/label';
import { addTopicsInVideoAPI } from '@/app/api/video';
import AppInput from '@/app/components/common/AppInput';
import ModalFooter from '@/app/components/common/ModalFooter';
import FileUploading from '../../components/common/FileUploading';
import { ModalHeader } from '../../components/common/ModalHeader';

function CheckPointsModal({
    videoId,
    onClose,
}: {
    videoId: string;
    onClose: () => void;
}) {
    const { data } = useSession();
    const [topics, setTopics] = useState([{ name: '', timeline: '' }]);

    const handleAddTopic = () => {
        setTopics([...topics, { name: '', timeline: '' }]);
    };

    const handleTopicChange = (index: number, field: string, value: string) => {
        const newTopics = [...topics];
        newTopics[index][field] = value;
        setTopics(newTopics);
    };

    const onFormSubmit = async () => {
        try {
            // Transform each question in the questions array
            const transformedTopics: { [key: string]: string } = {};
            topics.forEach((topic) => {
                transformedTopics[topic.timeline] = topic.name;
            });

            const response: any = await addTopicsInVideoAPI({
                videoId,
                topics: transformedTopics,
                accessToken: data?.user?.accessToken || '',
            });

            if (response.status !== 200) {
                return toast.error(
                    response?.message || 'Failed to add question'
                );
            }

            if (onClose) {
                onClose();
            }

            return toast.success('Question added successfully');
        } catch (error: any) {
            return toast.error(error?.message || 'Failed to add question');
        }
    };

    return (
        <section className="w-full bg-white h-screen py-4 shadow-md">
            <div className="h-[90%] overflow-y-auto w-full px-6">
                <ModalHeader
                    headerText={{
                        heading: 'Set Checkpoints',
                        tagline: 'Set Check points For better Understanding',
                    }}
                    Icon={FileVideoIcon}
                    onClose={onClose}
                />

                {/* <FileUploading isCompleted progress={0} /> */}
                <div className=" mt-3 flex justify-end w-full">
                    <button
                        type="button"
                        className="text-white text-sm w-fit text-center  bg-primary-color p-3 rounded-lg"
                        onClick={handleAddTopic}
                    >
                        Add Check Point
                    </button>
                </div>

                {topics.map((topic, index) => (
                    <div key={index}>
                        <div className="flex flex-col">
                            <Label
                                htmlFor={`topicName-${index}`}
                                className="font-semibold"
                            >
                                Topic Name
                            </Label>
                            <AppInput
                                id={`topicName-${index}`}
                                placeholder="Write Topic Name"
                                onChange={(e) =>
                                    handleTopicChange(
                                        index,
                                        'name',
                                        e.target.value
                                    )
                                }
                            />
                        </div>
                        <div className="flex flex-col mt-4">
                            <Label
                                htmlFor={`timeline-${index}`}
                                className="font-semibold"
                            >
                                Timeline
                            </Label>
                            <AppInput
                                id={`timeline-${index}`}
                                placeholder="Add Timeline"
                                onChange={(e) =>
                                    handleTopicChange(
                                        index,
                                        'timeline',
                                        e.target.value
                                    )
                                }
                            />
                        </div>
                        <hr className="my-4" />
                    </div>
                ))}
            </div>
            <div onClick={onFormSubmit}>
                <ModalFooter text="Upload Video" />
            </div>
        </section>
    );
}

export default CheckPointsModal;

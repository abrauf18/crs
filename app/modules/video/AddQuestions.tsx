import React from 'react';
import { FileVideoIcon } from 'lucide-react';
import ModalFooter from '@/app/components/common/ModalFooter';
import UploadItem from '../../components/common/UploadItem';
import FileUploading from '../../components/common/FileUploading';
import { ModalHeader } from '../../components/common/ModalHeader';

function AddQuestions() {
    return (
        <section className="w-full bg-white h-screen p-4 shadow-lg">
            <div className="h-[90%] overflow-y-auto w-full px-5">
                <ModalHeader
                    headerText={{
                        heading: 'Upload Video',
                        tagline: 'let’s Upload Video For Your User',
                    }}
                    Icon={FileVideoIcon}
                />
                <FileUploading isCompleted />
                <div className=" mt-3 flex justify-end w-full">
                    <button
                        type="button"
                        className="text-white text-sm w-32 text-center  bg-primary-color p-2 rounded-lg"
                    >
                        Add Question
                    </button>
                </div>
                <div>
                    <div>
                        <label htmlFor="question-2" className="font-semibold">
                            Question 02
                        </label>
                        <div className="flex mt-2 justify-between">
                            <input
                                className="bg-gray-100 rounded-lg p-2 border w-full"
                                placeholder="Write Question"
                            />
                            <select
                                id="type"
                                className="border rounded-lg p-2 ml-2"
                            >
                                <option value="open">Open</option>
                                <option value="quiz">Quiz</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex flex-col mt-4">
                        <label htmlFor="question-2" className="font-semibold">
                            Timeline
                        </label>
                        <input
                            className="bg-gray-100 rounded-lg p-2 border"
                            placeholder="Add Timeline"
                        />
                    </div>
                </div>
                <hr className="my-4" />
                <div>
                    <div>
                        <label htmlFor="question-2" className="font-semibold">
                            Question 01
                        </label>
                        <div className="flex mt-2 justify-between">
                            <input
                                className="bg-gray-100 rounded-lg p-2 border w-full"
                                placeholder="Write Question"
                            />
                            <select
                                id="type"
                                className="border rounded-lg p-2 ml-2"
                            >
                                <option value="open">Open</option>
                                <option value="quiz">Quiz</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex flex-col mt-4">
                        <label htmlFor="question-2" className="font-semibold">
                            Timeline
                        </label>
                        <input
                            className="bg-gray-100 rounded-lg p-2 border"
                            placeholder="Add Timeline"
                        />
                    </div>
                    <div className="flex flex-col mt-4">
                        <label htmlFor="question-2" className="font-semibold">
                            Correct Answer Explination
                        </label>

                        <textarea
                            className="bg-gray-100 rounded-lg p-2 border "
                            placeholder="Write Explination"
                        />
                    </div>
                </div>
            </div>
            <ModalFooter text="Next" />
        </section>
    );
}

export default AddQuestions;

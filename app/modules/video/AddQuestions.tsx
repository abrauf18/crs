import React from 'react';
import { FileVideoIcon } from 'lucide-react';
import ModalFooter from '@/app/components/common/ModalFooter';
import { Label } from '@/app/components/ui/label';
import AppInput from '@/app/components/common/AppInput';
import UploadItem from '../../components/common/UploadItem';
import FileUploading from '../../components/common/FileUploading';
import { ModalHeader } from '../../components/common/ModalHeader';

function AddQuestions() {
    return (
        <section className="w-full bg-white h-screen py-4 shadow-lg">
            <div className="h-[90%] overflow-y-auto w-full px-6">
                <ModalHeader
                    headerText={{
                        heading: 'Upload Video',
                        tagline: 'let’s Upload Video For Your User',
                    }}
                    Icon={FileVideoIcon}
                />
                {/* <FileUploading isCompleted progress={0}/> */}
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
                        <Label htmlFor="question-2" className="font-semibold">
                            Question 02
                        </Label>
                        <div className="flex justify-between">
                            <AppInput
                                id="question-2"
                                placeholder="Write Question"
                                additionalClasses=" w-full"
                            />

                            <select
                                id="type"
                                className="border rounded-lg p-3 ml-2"
                            >
                                <option value="open">Open</option>
                                <option value="quiz">Quiz</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex flex-col mt-5">
                        <Label htmlFor="timeline" className="font-semibold">
                            Timeline
                        </Label>

                        <AppInput
                            id="timeline"
                            placeholder="Add Timeline"
                            additionalClasses=" w-full"
                        />
                    </div>
                </div>
                <hr className="my-5" />
                <div>
                    <div>
                        <Label htmlFor="question-1" className="font-semibold">
                            Question 01
                        </Label>
                        <div className="flex justify-between">
                            <AppInput
                                id="question-1"
                                placeholder="Write Question"
                                additionalClasses=" w-full"
                            />

                            <select
                                id="type"
                                className="border rounded-lg p-3 ml-2"
                            >
                                <option value="open">Open</option>
                                <option value="quiz">Quiz</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex flex-col mt-5">
                        <Label htmlFor="timeline" className="font-semibold">
                            Timeline
                        </Label>

                        <AppInput
                            id="timeline"
                            placeholder="Add Timeline"
                            additionalClasses=" w-full"
                        />
                    </div>
                    <div className="flex flex-col mt-5">
                        <Label htmlFor="explination" className="font-semibold">
                            Correct Answer Explination
                        </Label>

                        <textarea
                            id="explination"
                            className="focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 mt-1 block w-full px-3 py-3 bg-slate-200 border rounded-md text-sm shadow-sm placeholder-slate-400"
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

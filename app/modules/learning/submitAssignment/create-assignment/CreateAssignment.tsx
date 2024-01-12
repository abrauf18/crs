import React from 'react';
import TextControllers from '@/app/assets/icons/TextFormattingControls';
import AssignmentIcon from '@/app/assets/icons/AssignmentIcon';
import Controllers from './Controllers';

function CreateAssignment() {
    return (
        <section>
            <div className="flex flex-col lg:flex-row lg:items-center  justify-between mt-8">
                <div className="flex  space-x-2">
                    <AssignmentIcon />
                    <p className="font-semibold text-lg">Assignment - XYZ</p>
                </div>
                <div className="bg-primary-color text-center mt-7 lg:mt-0 px-4 py-2 rounded-xl text-white">
                    Submit
                </div>
            </div>

            <div className="border h-screen rounded-xl mt-8">
                <div className="block lg:hidden">
                    <Controllers />
                </div>

                <div
                    className="flex flex-col p-5 lg:p-10"
                    style={{ height: '100%' }}
                >
                    <input
                        placeholder="Title Text Here..."
                        className="font-medium text-3xl p-2 outline-none break-all"
                    />
                    <textarea
                        placeholder="Write Something..."
                        className="outline-none p-2 w-full resize-none overflow-auto break-all"
                        style={{ height: '100%' }}
                    />
                </div>

                <div className="flex justify-center items-center">
                    <div className="fixed bottom-10 m-auto hidden lg:block">
                        <Controllers />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default CreateAssignment;

import React from 'react';
import { Check, FileLineChart, Trash2, X } from 'lucide-react';
import Image from 'next/image';
import Avatar from '@/app/assets/images/UserImage.svg';
import StudentCard, { StudentCardInterface } from './StudentCard';

function QuestionDetailModal({ onClose }: any) {
    const StudentsList: StudentCardInterface[] = [
        {
            id: '1',
            image: Avatar,
            name: 'John Doe',
        },
        {
            id: '2',
            image: Avatar,
            name: 'John Doe',
        },
        {
            id: '3',
            image: Avatar,
            name: 'John Doe',
        },
        {
            id: '4',
            image: Avatar,
            name: 'John Doe',
        },
        {
            id: '5',
            image: Avatar,
            name: 'John Doe',
        },
        {
            id: '6',
            image: Avatar,
            name: 'John Doe',
        },
    ];
    return (
        <section className="w-full bg-white h-screen  py-4 px-8 shadow-lg items-center">
            <div className="h-[100%] overflow-y-auto w-full px-2">
                <div className="flex justify-between ">
                    <div className="flex  my-7 mr-3">
                        <p className=" text-dark-gray mb-2 font-semibold text-base">
                            <span className=" font-semibold text-lg text-black">
                                Q:
                            </span>{' '}
                            What did say as a kid when asked: What do you want
                            to be when you grow up?
                        </p>
                    </div>
                    <div className="rounded-full bg-white border p-1 cursor-pointer h-fit my-7">
                        <X size={15} onClick={onClose} />
                    </div>
                </div>

                <div className="flex   w-full">
                    <div className="p-4 border-2 border-green-600 bg-green-100 rounded-lg w-full">
                        <h1 className="font-medium">Right Answer&apos;s</h1>
                        <h1 className="mt-2 text-gray-600 font-semibold">
                            <span className="font-bold text-lg text-black">
                                15
                            </span>{' '}
                            Answer&apos;s
                        </h1>
                    </div>
                    <div className="p-4 border-2 rounded-lg w-full ml-4">
                        <h1 className="font-medium">Wrong Answer&apos;s</h1>
                        <h1 className="mt-2 text-gray-600 font-semibold ">
                            <span className="font-bold text-lg text-black">
                                15
                            </span>{' '}
                            Answer&apos;s
                        </h1>
                    </div>
                </div>
                <div className="mt-5">
                    {StudentsList.map(
                        (student: StudentCardInterface, index) => (
                            <>
                                <div className="py-4" key={student.id}>
                                    <StudentCard student={student} />
                                </div>
                                {StudentsList.length !== index + 1 && <hr />}
                            </>
                        )
                    )}
                </div>
            </div>
        </section>
    );
}

export default QuestionDetailModal;

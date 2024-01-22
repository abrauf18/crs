'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Eye } from 'lucide-react';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/app/components/ui/table';

import Avatar from '@/app/assets/images/UserImage.svg';
import Character from '@/app/assets/images/User2Image.svg';
import QuestionDetailModal from './QuestionDetailModal';

export interface TestDetailInterface {
    id: number;
    question: string;
    rightAnswers: string;
    wrongAnswers: string;
}

interface TestDetailProp {
    test: TestDetailInterface[];
    fontSize?: string;
}

function TestDetailTable({ test, fontSize }: TestDetailProp) {
    const [isShowDetailModal, setIsShowDetailModal] = useState(false);
    const images = [
        { id: 1, img: Avatar },
        { id: 2, img: Character },
        { id: 3, img: Avatar },
        { id: 4, img: Character },
        { id: 5, img: Avatar },
    ];
    const handleDisplayModal = () => {
        setIsShowDetailModal(true);
    };

    const handleCloseModal = () => {
        setIsShowDetailModal(false);
    };
    return (
        <section>
            <Table
                className={`text-[${fontSize || '18'}px] mobile:text-[14px]`}
            >
                <TableHeader>
                    <TableRow>
                        <TableHead className=" text-dark-gray font-semibold">
                            Q NO.
                        </TableHead>
                        <TableHead className="w-[500px] text-dark-gray font-semibold">
                            Question
                        </TableHead>
                        <TableHead className="text-dark-gray font-semibold">
                            Right Answers
                        </TableHead>
                        <TableHead className="text-dark-gray font-semibold">
                            Wrong Answers
                        </TableHead>
                        <TableHead className="text-dark-gray font-semibold">
                            Action
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {test.map((testItem, index) => (
                        <TableRow className="border-b" key={testItem.id}>
                            <TableCell className="font-normal ">
                                <span className="bg-light-gray px-[7px] py-[4px] rounded-md">
                                    {index + 1}
                                </span>
                            </TableCell>
                            <TableCell className="w-[500px] text-dark-gray font-normal">
                                <span>{testItem.question}</span>
                            </TableCell>

                            <TableCell className="relative">
                                <div className="flex flex-col lg:flex-row lg:space-x-2 ">
                                    <span className="text-center lg:text-left  lg:mb-0 mb-1 ">
                                        {testItem.rightAnswers}
                                    </span>
                                    <div className="flex relative bg-red-100">
                                        {images.map((image, imageIndex) => (
                                            <div
                                                key={image.id}
                                                className="absolute"
                                                style={{
                                                    zIndex: imageIndex + 1,
                                                    transform: `translateX(${
                                                        imageIndex * 12
                                                    }px)`,
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        position: 'relative',
                                                        width: '30px',
                                                        height: '30px',
                                                        borderRadius: '50%',
                                                        overflow: 'hidden',
                                                    }}
                                                >
                                                    <Image
                                                        src={image.img}
                                                        alt={`Image ${image.id}`}
                                                        width={30}
                                                        height={30}
                                                        style={{
                                                            position:
                                                                'relative',
                                                        }}
                                                    />
                                                    {imageIndex ===
                                                        images.length - 1 && (
                                                        <div className="absolute top-0 right-0 bg-opacity-50 text-sm text-center w-full h-full rounded-full bg-primary-color text-white font-semibold flex justify-center items-center">
                                                            +10
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </TableCell>

                            <TableCell className="relative">
                                <div className="flex flex-col  lg:flex-row lg:space-x-2 ">
                                    <span className="text-center lg:text-left  lg:mb-0 mb-1 ">
                                        {testItem.wrongAnswers}
                                    </span>
                                    <div className="flex relative bg-red-100">
                                        {images.map((image, imageIndex) => (
                                            <div
                                                key={image.id}
                                                className="absolute"
                                                style={{
                                                    zIndex: imageIndex + 1,
                                                    transform: `translateX(${
                                                        imageIndex * 10
                                                    }px)`,
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        position: 'relative',
                                                        width: '30px',
                                                        height: '30px',
                                                        borderRadius: '50%',
                                                        overflow: 'hidden',
                                                    }}
                                                >
                                                    <Image
                                                        src={image.img}
                                                        alt={`Image ${image.id}`}
                                                        width={30}
                                                        height={30}
                                                        style={{
                                                            position:
                                                                'relative',
                                                        }}
                                                    />
                                                    {imageIndex ===
                                                        images.length - 1 && (
                                                        <div className="absolute top-0 right-0 bg-opacity-50 text-sm text-center w-full h-full rounded-full bg-primary-color text-white font-semibold flex justify-center items-center">
                                                            +10
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell className="">
                                <div
                                    className="mr-2 w-fit bg-light-orange rounded-md p-1 cursor-pointer"
                                    onClick={handleDisplayModal}
                                >
                                    <Eye
                                        color="#F59A3B"
                                        width={18}
                                        height={18}
                                    />
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {isShowDetailModal && (
                <div className=" right-0 top-0 z-50 w-full lg:w-[30%] fixed">
                    <QuestionDetailModal onClose={handleCloseModal} />
                </div>
            )}
        </section>
    );
}

export default TestDetailTable;

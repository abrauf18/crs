'use client';

import { VideoIcon } from 'lucide-react';
import React, { useState } from 'react';
import StudentIcon from '@/app/assets/icons/StudentIcon';
import Pagintaion from '@/app/components/common/Pagintaion';
import StudentsInfoTable from '../students/StudentsInfoTable';
import { Studentinfo } from '../students/students';
import ClassroomModal from './ClassroomModal';
import ClassroomCard from './ClassroomCard';

function Classroom() {
    const [selectedClass, setSelectedClass] = useState('6th Class');
    const showClassStudents = (viewClass: React.SetStateAction<string>) => {
        setSelectedClass(viewClass);
        const detailsSection = document.getElementById('classDetailsSection');
        if (detailsSection) {
            detailsSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div>
            <div className="hidden lg:block">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 ">
                    <ClassroomCard
                        Icon={StudentIcon}
                        periods="10th Period"
                        students="40 Students"
                        iconColor="#54C3F4"
                        iconBg="bg-sky-100"
                        activeColor="bg-sky-50"
                        onClick={showClassStudents}
                    />

                    <ClassroomCard
                        Icon={StudentIcon}
                        periods="9th Period"
                        students="40 Students"
                        iconColor="#7AA43E"
                        iconBg="bg-green-100"
                        activeColor="bg-green-50"
                        onClick={showClassStudents}
                    />
                    <div className="md:hidden lg:block">
                        <ClassroomCard
                            Icon={StudentIcon}
                            periods="8th Period"
                            students="40 Students"
                            iconColor="#A03ADB"
                            iconBg="bg-purple-100"
                            activeColor="bg-purple-50"
                            onClick={showClassStudents}
                        />
                    </div>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                    <ClassroomCard
                        Icon={StudentIcon}
                        periods="7th Period"
                        students="40 Students"
                        iconColor="#A03ADB"
                        iconBg="bg-purple-100"
                        activeColor="bg-purple-50"
                        onClick={showClassStudents}
                    />
                    <ClassroomCard
                        Icon={StudentIcon}
                        periods="6th Period"
                        students="40 Students"
                        iconColor="#F59A3B"
                        iconBg="bg-orange-200"
                        activeColor="bg-orange-50"
                        onClick={showClassStudents}
                        // isActive
                    />
                    <ClassroomCard
                        Icon={StudentIcon}
                        periods="5th Period"
                        students="40 Students"
                        iconColor="#E6500D"
                        iconBg="bg-pink-100"
                        activeColor="bg-pink-50"
                        onClick={showClassStudents}
                    />
                    <ClassroomCard
                        Icon={StudentIcon}
                        periods="4th Period"
                        students="40 Students"
                        iconColor="#54C3F4"
                        iconBg="bg-sky-100"
                        activeColor="bg-sky-50"
                        onClick={showClassStudents}
                    />
                </div>
            </div>

            {/* Tab/Mobile View */}
            <div className="grid md:grid-cols-2 lg:hidden gap-4 mt-4">
                <ClassroomCard
                    Icon={StudentIcon}
                    periods="10th Class"
                    students="40 Students"
                    iconColor="#54C3F4"
                    iconBg="bg-sky-100"
                    activeColor="bg-sky-50"
                />

                <ClassroomCard
                    Icon={StudentIcon}
                    periods="9th Class"
                    students="40 Students"
                    iconColor="#7AA43E"
                    iconBg="bg-green-100"
                    activeColor="bg-green-50"
                />
                <ClassroomCard
                    Icon={StudentIcon}
                    periods="8th Class"
                    students="40 Students"
                    iconColor="#A03ADB"
                    iconBg="bg-purple-100"
                    activeColor="bg-purple-50"
                />
                <ClassroomCard
                    Icon={StudentIcon}
                    periods="7th Class"
                    students="40 Students"
                    iconColor="#A03ADB"
                    iconBg="bg-purple-100"
                    activeColor="bg-purple-50"
                />
                <ClassroomCard
                    Icon={StudentIcon}
                    periods="6th Class"
                    students="40 Students"
                    iconColor="#F59A3B"
                    iconBg="bg-orange-200"
                    activeColor="bg-orange-50"
                    // isActive
                />
                <ClassroomCard
                    Icon={StudentIcon}
                    periods="5th Class"
                    students="40 Students"
                    iconColor="#E6500D"
                    iconBg="bg-pink-100"
                    activeColor="bg-pink-50"
                />
                <ClassroomCard
                    Icon={StudentIcon}
                    periods="4th Class"
                    students="40 Students"
                    iconColor="#54C3F4"
                    iconBg="bg-sky-100"
                    activeColor="bg-sky-50"
                />
            </div>

            <div
                className="border rounded-lg p-4 px-6 mt-5"
                id="classDetailsSection"
            >
                <h1 className="text-xl font-semibold">{selectedClass}</h1>
                <StudentsInfoTable students={Studentinfo} isClassroomTable />
            </div>
            <div className="flex items-center w-full justify-center mt-5">
                <Pagintaion />
            </div>

            {/* <div className="absolute right-0 top-0 z-50 w-[95%] lg:w-[25%] ">
                <ClassroomModal />
            </div> */}
        </div>
    );
}

export default Classroom;

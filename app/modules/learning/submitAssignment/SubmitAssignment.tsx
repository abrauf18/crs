import React from 'react';
import AssignmentIcon from '@/app/assets/icons/AssignmentIcon';
import AssignmentCard, { AssignmentInterface } from './AssignmentCard';

const uploadedAssignment: AssignmentInterface[] = [
    {
        id: '1',
        fileName: 'Test file',
    },
    {
        id: '1',
        fileName: 'Test file',
    },
];

const referenceMaterial: AssignmentInterface[] = [
    {
        id: '1',
        fileName: 'Test file',
    },
    {
        id: '1',
        fileName: 'Test file',
    },
];

function SubmitAssignment() {
    return (
        <section>
            <div className="flex justify-between flex-col lg:flex-row">
                <div className="flex space-x-2">
                    <AssignmentIcon />
                    <p className="text-xl font-semibold">Assignment - XYZ</p>
                </div>
                <div className="flex lg:space-x-2 flex-col lg:flex-row mobile:space-y-4 mobile:my-4 lg:my-0">
                    <button
                        type="button"
                        className="p-4 border h-fit border-primary-color text-dark-gray rounded-xl font-semibold"
                    >
                        Upload File
                    </button>
                    <button
                        type="button"
                        className="p-4 bg-primary-color text-white rounded-xl font-semibold"
                    >
                        Create Assignment
                    </button>
                </div>
            </div>
            <p className="text-dark-gray text-xl font-semibold mt-3">
                Uploaded Assignments
            </p>

            {uploadedAssignment.map((assignment: AssignmentInterface) => (
                <AssignmentCard card={assignment} key={assignment.id} />
            ))}

            <p className="text-dark-gray text-xl font-semibold mt-8">
                Reference Material
            </p>
            {referenceMaterial.map((assignment: AssignmentInterface) => (
                <AssignmentCard
                    card={assignment}
                    key={assignment.id}
                    isReferenceMaterial
                />
            ))}
        </section>
    );
}

export default SubmitAssignment;

import React from 'react';
import { FileVideo, X } from 'lucide-react';
import ModalFooter from '@/app/components/common/ModalFooter';
import StudentIcon from '@/app/assets/icons/StudentIcon';
import { ModalHeader } from '@/app/components/common/ModalHeader';
import VideoIcon from '@/app/assets/icons/VideoIcon';
import MovieIcon from '@/app/assets/icons/MovieIcon';

function AddResourceModal() {
    return (
        <section className="w-full bg-white h-screen py-4 px-6 shadow-lg">
            <div>
                <ModalHeader
                    headerText={{
                        heading: 'SB1 Cell Structure - Function',
                        tagline: 'Add Video to your Learning Plans',
                    }}
                    // Icon={StudentIcon}
                />

                <div className="flex space-x-2 items-center border rounded-lg p-4">
                    <MovieIcon width={40} height={40} />
                    <div>
                        <p className="font-semibold">
                            SB1a. Cell Structure _ Organelles
                        </p>
                        <p className="text-dark-gray font-medium">
                            Select Learning Plan
                        </p>
                    </div>
                </div>

                <div className="flex flex-col space-y-2 mt-5">
                    <label className="font-semibold" htmlFor="invite">
                        Select Learning Plan
                    </label>
                    <select name="invite" className="p-3 border rounded-lg">
                        <option value="9th Grade - B">
                            10th Grade - Designing
                        </option>
                        <option value="9th Grade - A">
                            9th Grade - Designing
                        </option>
                    </select>
                    <p className="text-right text-dark-gray font-medium">
                        Add Multiple
                    </p>
                </div>

                <div className="mt-3 w-full flex flex-col space-y-2">
                    <label className="font-semibold" htmlFor="name">
                        Name of Resource
                    </label>
                    <input
                        name="name"
                        placeholder="Enter name"
                        className="p-3 border rounded-lg"
                    />
                </div>
            </div>
            <ModalFooter text="Add to Plan" />
        </section>
    );
}

export default AddResourceModal;

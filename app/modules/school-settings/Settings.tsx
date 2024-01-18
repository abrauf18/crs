import React from 'react';
import Searchbar from '@/app/components/common/Searchbar';
import { Label } from '@/app/components/ui/label';
import AppInput from '@/app/components/common/AppInput';
import Profile from '../setting/Profile';

function Settings() {
    return (
        <section className=" px-3 lg:px-8">
            <Searchbar headerText="Settings" tagline="Manage Your Profile" />
            <div className="flex flex-col space-y-8  lg:flex-row lg:justify-between w-full lg:space-x-8 lg:mt-5 ">
                <Profile isSchoolProfile />
                <hr className="my-4 lg:hidden" />

                <div className="w-full relative">
                    <h1 className="text-2xl font-semibold mb-2 mobile:mb-4 text-center lg:text-left">
                        School Profile
                    </h1>
                    <div className="flex flex-col mt-5  ">
                        <Label htmlFor="school_name">School Name</Label>

                        <AppInput
                            id="school_name"
                            name="school_name"
                            placeholder="Enter School Name"
                        />
                    </div>
                    <div className="flex flex-col mt-5 ">
                        <Label htmlFor="no_of_classes ">No Of Classrooms</Label>

                        <AppInput
                            id="no_of_classes"
                            name="no_of_classes"
                            placeholder="Enter No of Classrooms"
                        />
                    </div>

                    <div className="flex mt-5 justify-between w-full space-x-4 ">
                        <div className="flex flex-col w-full">
                            <Label htmlFor="classes_start">Classes Start</Label>

                            <AppInput
                                id="classes_start"
                                name="classes_start"
                                placeholder="i.e. 5th Class"
                            />
                        </div>
                        <div className="flex flex-col w-full">
                            <Label htmlFor="classes_end">Classes End</Label>

                            <AppInput
                                id="classes_end"
                                name="classes_end"
                                placeholder="i.e. 10th Class"
                            />
                        </div>
                    </div>
                    <div className="lg:absolute lg:bottom-3 w-full">
                        <div className="md:flex md:justify-between w-full mt-2 gap-1">
                            <button
                                type="button"
                                className="text-dark-gray w-[90%] font-semibold mobile:mb-2 mobile:w-full p-2 md:px-6 md:py-2 border rounded-lg"
                            >
                                Discard Changes
                            </button>
                            <button
                                type="button"
                                className="text-white w-[90%] bg-primary-color font-semibold mobile:w-full p-2 md:px-6 md:py-2 border rounded-lg"
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Settings;

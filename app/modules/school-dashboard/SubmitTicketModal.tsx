import React from 'react';
import { X } from 'lucide-react';
import ModalFooter from '@/app/components/common/ModalFooter';
import SyncIcon from '@/app/assets/icons/SyncIcon';
import UploadItem from '../../components/common/UploadItem';
import FileUploading from '../../components/common/FileUploading';
import { ModalHeader } from '../../components/common/ModalHeader';

function SubmitTicketModal() {
    return (
        <section className="w-full bg-white h-screen py-4 px-6 shadow-lg">
            <div>
                {/* <ModalHeader
                    headerText={{
                        heading: 'Add Student',
                        tagline: 'Invite via Email',
                    }}
                    Icon={StudentIcon}
                /> */}
                <div className="flex justify-between items-center">
                    <div className="flex  my-7">
                        <div className="bg-green-100 px-3 h-fit py-3 rounded-lg">
                            <SyncIcon fill="#7AA43E" width="30" height="30" />
                        </div>
                        <div className="flex flex-col ml-2">
                            <h3 className="text-xl font-semibold  mr-1">
                                Submit Ticket
                            </h3>
                            <p className="text-sm text-dark-gray mb-2">
                                Register New Complaint
                            </p>
                        </div>
                    </div>
                    <div className="rounded-full bg-white border p-1">
                        <X size={20} />
                    </div>
                </div>

                <div className="flex flex-col space-y-2">
                    <label className="font-semibold" htmlFor="invite">
                        Complaint type
                    </label>
                    <select name="invite" className="p-3 border rounded-xl">
                        <option value="9th Grade - B">9th Grade - B</option>
                        <option value="9th Grade - A">9th Grade - A</option>
                    </select>
                </div>
                <div className="flex flex-col space-y-2 mt-7">
                    <label className="font-semibold" htmlFor="name">
                        Your Message
                    </label>
                    <textarea
                        className="border h-[120px] rounded-lg p-3 resize-none"
                        placeholder="Type your message"
                    />
                </div>
            </div>
            <ModalFooter text="Invite" />
        </section>
    );
}

export default SubmitTicketModal;

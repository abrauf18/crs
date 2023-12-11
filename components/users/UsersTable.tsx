import React from "react";
import Image from "next/image";
import editIcon from "@/public/assets/editIcon.svg";
import deleteIcon from "@/public/assets/deleteIcon.svg";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { Poppins } from "next/font/google";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

export interface User {
    id: number;
    imageUrl?: string | StaticImport;
    name: string;
    email: string;
    role: string;
}

interface UsersProp {
    users: User[];
    fontSize?: string
}

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["100", "400", "700"]
});


const UsersTable: React.FC<UsersProp> = ({ users, fontSize }) => {
    return (
        <Table className={`text-[${fontSize || "18"}px] mobile:text-[14px] ${poppins.className}`}>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px] text-dark-gray font-bold">SNO.</TableHead>
                    <TableHead className="w-[300px] text-dark-gray font-bold">NAME</TableHead>
                    <TableHead className="text-dark-gray font-bold">Email</TableHead>
                    <TableHead className="text-dark-gray font-bold">Role</TableHead>
                    <TableHead className=" text-dark-gray font-bold">Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {users.map((user, index) => (
                    <TableRow className="border-none" key={user.id}>
                        <TableCell className="font-medium">
                            <span className="bg-light-gray px-[7px] py-[4px] rounded-md">
                                {index + 1}
                            </span>
                        </TableCell>
                        <TableCell className="">
                            {user.name}</TableCell>
                        <TableCell className="text-dark-gray">{user.email}</TableCell>
                        <TableCell className="text-dark-gray">{user.role}</TableCell>
                        <TableCell className="flex justify-start items-center p-0 mt-3 ml-3">
                            <div className="mr-2">
                                <Image
                                    src={editIcon as string}
                                    alt="edit"
                                    width={28}
                                    height={28}
                                />
                            </div>
                            <div>
                                <Image
                                    src={deleteIcon as string}
                                    alt="delete"
                                    width={28}
                                    height={28}
                                />
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default UsersTable;

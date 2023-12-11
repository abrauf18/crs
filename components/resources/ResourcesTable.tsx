import React from "react";
import Image from "next/image";
import viewIcon from "@/public/assets/viewIcon.svg";
import deleteIcon from "@/public/assets/deleteIcon.svg";
import { Poppins } from "next/font/google";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

export interface Resource {
    id: number;
    name: string;
    type: string;
    topic: string;
}

interface ResourcesProp {
    resources: Resource[];
    fontSize?: string;
}

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["100", "400", "700"]
});
const ResourcesTable: React.FC<ResourcesProp> = ({ resources, fontSize }) => {
    return (
        <Table className={`text-[${fontSize || "18"}px] mobile:text-[14px] ${poppins.className}`}>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px] text-dark-gray font-bold">SNO.</TableHead>
                    <TableHead className="text-dark-gray font-bold">Resource Name</TableHead>
                    <TableHead className="text-dark-gray font-bold">Resource Type</TableHead>
                    <TableHead className="text-dark-gray font-bold">Assign Topic </TableHead>
                    <TableHead className="text-dark-gray font-bold">Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {resources.map((resource, index) => (
                    <TableRow className="border-none" key={resource.id}>
                        <TableCell className="font-medium">
                            <span className="bg-light-gray px-[7px] py-[4px] rounded-md">
                                {index + 1}
                            </span>
                        </TableCell>
                        <TableCell>{resource.name}</TableCell>
                        <TableCell className="text-dark-gray">{resource.type}</TableCell>
                        <TableCell className="text-dark-gray">{resource.topic}</TableCell>
                        <TableCell className="flex justify-start items-center p-0 mt-3 ml-3">
                            <div className="mr-2">
                                <Image
                                    src={viewIcon as string}
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

export default ResourcesTable;

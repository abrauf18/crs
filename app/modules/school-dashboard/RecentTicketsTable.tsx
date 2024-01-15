import React from 'react';
import { Eye, Trash } from 'lucide-react';
import { Poppins } from 'next/font/google';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/app/components/ui/table';

export interface TicketsInterface {
    id: number;
    name: string;
    date: string;
    status: string;
}

interface TicketsProp {
    tickets: TicketsInterface[];
    fontSize?: string;
    isDashboard?: boolean;
}

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['100', '400', '700'],
});

function TicketsTable({
    tickets,
    fontSize,
    isDashboard,
}: TicketsProp): JSX.Element {
    function getStatusColorClass(status: string) {
        switch (status.toLocaleLowerCase()) {
            case 'active':
                return 'text-green-500'; // Replace with the actual green class
            case 'inprogress':
                return 'text-sky-400'; // Replace with the actual blue class
            case 'closed':
                return 'text-red-500'; // Replace with the actual red class
            default:
                return '';
        }
    }

    return (
        <Table
            className={`text-[${fontSize || '18'}px] mobile:text-[14px] ${
                poppins.className
            }`}
        >
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px] text-dark-gray font-bold">
                        SNO.
                    </TableHead>
                    <TableHead className=" text-dark-gray font-bold">
                        NAME
                    </TableHead>
                    <TableHead className="text-dark-gray font-bold">
                        Date
                    </TableHead>
                    <TableHead className="text-dark-gray font-bold">
                        Status
                    </TableHead>
                    <TableHead className=" text-dark-gray font-bold">
                        Action
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {tickets.map((ticket, index) => (
                    <TableRow className="border-none" key={ticket.id}>
                        <TableCell className="font-medium">
                            <span className="bg-light-gray px-[7px] py-[4px] rounded-md">
                                {index + 1}
                            </span>
                        </TableCell>
                        <TableCell className="">{ticket.name}</TableCell>
                        <TableCell className="text-dark-gray">
                            {ticket.date}
                        </TableCell>
                        {/* <TableCell className="text-dark-gray">
                            {ticket.status}
                        </TableCell> */}
                        <TableCell
                            className={`text-dark-gray font-medium ${getStatusColorClass(
                                ticket.status
                            )}`}
                        >
                            {ticket.status}
                        </TableCell>

                        <TableCell className="flex justify-center items-center p-0 mt-3 ">
                            <div className="mr-2 rounded-md  ">
                                <Eye color="#F59A3B" width={18} height={18} />
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}

export default TicketsTable;

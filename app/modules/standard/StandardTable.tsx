import {
    TableRow,
    TableBody,
    TableCell,
    Table,
} from '@/app/components/ui/table';
import React from 'react';
import { ResourceType, resourceTypeToIcon } from '@/lib/utils';
import EditIcon from '@/app/assets/icons/EditIcon';
import { Eye, LucideFileQuestion, Trash } from 'lucide-react';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['100', '400', '700'],
});
// interface Data {
//     id: number;
//     name: string;
//     duration: string;
//     question: string;
// }

// export interface StandardProps {
//     data: Data[];
// }

interface Topic {
    name: string;
    resourceId: string;
    type: ResourceType;
}

function StandardTable({ topicList }: { topicList: Topic[] }) {
    return (
        <Table className={`text-sm mobile:text-xs ${poppins.className}`}>
            <TableBody>
                {topicList.map((topic, index) => (
                    <TableRow key={topic.resourceId}>
                        <TableCell className="font-medium">
                            <span className="bg-light-gray px-[7px] py-[4px] rounded-md">
                                {index}
                            </span>
                        </TableCell>
                        <TableCell className="flex items-start gap-2 ">
                            {
                                resourceTypeToIcon(
                                    topic.type as ResourceType
                                ) as unknown as React.ReactNode
                            }
                            {topic.name}
                        </TableCell>
                        <TableCell className="text-dark-gray">
                            {topic.type}
                        </TableCell>
                        <TableCell className="flex justify-start items-center p-0 mt-3 ml-3">
                            <div className="mr-2 bg-light-orange rounded-md p-1">
                                <Eye color="#F59A3B" width={18} height={18} />
                            </div>
                            <div className="mr-2 rounded-md">
                                <EditIcon width={28} height={28} />
                            </div>
                            <div className="bg-red-100 rounded-md p-1">
                                <Trash color="#E6500D" width={18} height={18} />
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}

export default StandardTable;

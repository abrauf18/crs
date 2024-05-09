import React from 'react';
import { Poppins } from 'next/font/google';
import { Eye, LucideFileQuestion, Trash } from 'lucide-react';
import {
    ResourceType,
    // resourceTypeToIcon,
    // resourceTypeToJsxIcon,
} from '@/lib/utils';
import {
    TableRow,
    TableBody,
    TableCell,
    Table,
} from '@/app/components/ui/table';
import XlsIcon from '@/app/assets/icons/XlsIcon';
import PptIcon from '@/app/assets/icons/PptIcon';
import EditIcon from '@/app/assets/icons/EditIcon';
import TicketIcon from '@/app/assets/icons/TicketIcon';
import RecorderIcon from '@/app/assets/icons/RecorderIcon';
import QuestionMarkIcon from '@/app/assets/icons/QuestionMarkIcon';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

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
    const router = useRouter();

    const viewResource = (type: ResourceType, resourceId: string) => {
        if (type === ResourceType.VIDEO) {
            return router.push(`/admin/video/${resourceId}`);
        }
        return router.push(`/admin/resource/${resourceId}`);
    };

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
                            {topic.type?.toLowerCase() === 'slideshow' && (
                                <PptIcon fill="#1ebeff" />
                            )}
                            {topic.type?.toLowerCase() === 'video' && (
                                <RecorderIcon />
                            )}
                            {topic.type?.toLowerCase() === 'worksheet' && (
                                <XlsIcon color="#54C3F4" />
                            )}
                            {topic.type?.toLowerCase() ===
                                'exit-ticket-test' && (
                                <TicketIcon color="#54C3F4" />
                            )}
                            {topic.type?.toLowerCase() === 'quiz' && (
                                <QuestionMarkIcon />
                            )}
                            {topic.name}
                        </TableCell>
                        <TableCell className="text-dark-gray">
                            {topic.type}
                        </TableCell>
                        <TableCell className="flex justify-start items-center p-0 mt-3 ml-3">
                            <div className="mr-2 bg-light-orange rounded-md p-1">
                                <Eye
                                    color="#F59A3B"
                                    width={18}
                                    height={18}
                                    onClick={() =>
                                        viewResource(
                                            topic.type,
                                            topic.resourceId
                                        )
                                    }
                                />
                            </div>
                            <div className="mr-2 rounded-md">
                                <EditIcon width={28} height={28} />
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}

export default StandardTable;

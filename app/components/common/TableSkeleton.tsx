import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/app/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';

interface TableSkeletonProps {
    isDashboard?: boolean;
}

function TableSkeleton({ isDashboard = false }: TableSkeletonProps) {
    const numColumns = isDashboard ? 4 : 5;

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="text-dark-gray font-bold">
                        SNO.
                    </TableHead>
                    <TableHead className="text-dark-gray font-bold">
                        Name
                    </TableHead>
                    {!isDashboard && (
                        <TableHead className="text-dark-gray font-bold">
                            Email
                        </TableHead>
                    )}
                    <TableHead className="text-dark-gray font-bold">
                        Role
                    </TableHead>
                    <TableHead className="text-dark-gray font-bold">
                        Action
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {Array.from({ length: 5 }, (_, index) => (
                    <TableRow
                        key={`skeleton-row-${index}`}
                        className="border-none"
                    >
                        {Array.from({ length: numColumns }, (__, colIndex) => (
                            <TableCell
                                key={`skeleton-col-${index}-${colIndex}`}
                            >
                                <Skeleton className="h-4 w-full" />
                            </TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}

export default TableSkeleton;

'use client';

import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Trash2 } from 'lucide-react';
import { deleteCourse, deleteResource } from '@/actions/courses';
import { toast } from 'sonner';

export function DeleteCourseDialog({
    id,
    type,
    courseId,
}: {
    id: string;
    type: 'course' | 'resource';
    courseId?: string;
}) {
    const [loading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const handleRemove = useCallback(async () => {
        setIsLoading(true);
        let result;
        if (type === 'course') result = await deleteCourse(id);
        else if (type === 'resource' && courseId)
            result = await deleteResource({ courseId, resourceId: id });
        if (result?.success) toast.success(result.message);
        else toast.error(result?.message ?? 'An error occurred');
        setIsLoading(false);
        setIsOpen(false);
    }, [id, type]);

    return (
        <Dialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
            <DialogTrigger asChild>
                {type === 'course' ? (
                    <Button className=" bg-destructive text-destructive-foreground">
                        Delete
                    </Button>
                ) : (
                    <Button
                        variant="ghost"
                        className="text-destructive hover:bg-transparent"
                    >
                        <Trash2 size={20} />
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently
                        delete your account and remove your data from our
                        servers.
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button disabled={loading} onClick={handleRemove}>
                        Continue
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

"use client";

import React from "react";
import { EyeIcon, Pencil } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Resource } from "@/lib/types/course";
import { getFileIcon, getFileType } from "@/lib/utils";
import AddResourceModal from "./add-resource-modal";
import { RenderFilePreview } from "./render-file-preview";
import { DeleteCourseDialog } from "./delete-course-dialog";

export default function ResourceViewer({ resource }: { resource: Resource }) {
  const { name, url, type } = resource;

  const fileType = getFileType(url);

  return (
    <div className="p-4 bg-white shadow rounded-xl w-full text-left hover:bg-gray-50 transition">
      <div className="flex items-center gap-4">
        {getFileIcon(fileType)}
        <div>
          <h3 className="font-semibold">{name}</h3>
          <p className="text-sm text-gray-500">{type}</p>
        </div>
      </div>
      <div className="flex items-center justify-end gap-x-4">
        {/* <AddResourceModal
                    courseId={resource.courseId}
                    trigger={
                        <Pencil
                            className="h-3 w-3 cursor-pointer"
                            aria-label={`Edit ${resource.name}`}
                        />
                    }
                    defaultData={resource}
                /> */}
        <DeleteCourseDialog
          id={resource.id}
          courseId={resource.courseId}
          type="resource"
        />
        <Dialog>
          <DialogTrigger asChild>
            <EyeIcon className="w-5 h-5 inline-block mr-2" />
          </DialogTrigger>

          <DialogContent className="min-w-[80vw] max-h-[80vh] overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4">{name}</h2>

            <RenderFilePreview previewUrl={url} />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

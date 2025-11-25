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
    <div className="group p-5 bg-white shadow-sm rounded-xl w-full border border-gray-200 hover:shadow-md hover:border-gray-300 transition-all duration-300">
      <div className="flex items-center gap-4 mb-4">
        <div className="flex-shrink-0 transition-transform group-hover:scale-110 duration-200">
          {getFileIcon(fileType)}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 truncate group-hover:text-primary-color transition-colors">
            {name}
          </h3>
          <p className="text-sm text-gray-500">{type}</p>
        </div>
      </div>
      <div className="flex items-center justify-end gap-x-3 pt-3 border-t border-gray-100">
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
            <button className="p-2 rounded-lg border border-gray-200 bg-white hover:bg-primary-color hover:border-primary-color transition-all duration-200 group/view">
              <EyeIcon className="w-4 h-4 text-gray-600 group-hover/view:text-white transition-colors" />
            </button>
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

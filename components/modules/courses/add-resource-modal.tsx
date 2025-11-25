"use client";

import React, { useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  AddResourceForm,
  addResourceSchema,
  courseStatusOptions,
  CourseStatusOptionsType,
  courseTypeOptions,
  CourseTypeOptionsType,
} from "@/lib/schemas/course";
import { useSession } from "next-auth/react";
import { Resource } from "@/lib/types/course";
import { Plus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AddResourceModalProps {
  courseId: string;
  trigger?: React.ReactNode;
  defaultData?: Resource;
}

export default function AddResourceModal({
  courseId,
  trigger,
  defaultData,
}: AddResourceModalProps) {
  const isEditing = Boolean(defaultData);
  const [open, setOpen] = useState(false);

  const { data: userData, status } = useSession();
  const {
    watch,
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    reset,
  } = useForm<AddResourceForm>({
    resolver: zodResolver(addResourceSchema),
    reValidateMode: "onChange",
    defaultValues: {
      name: "",
      resources: [{ topic: "", type: "ASSIGNMENT", file: undefined }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "resources",
    control,
  });

  const onSubmit = async (data: AddResourceForm) => {
    try {
      if (status !== "authenticated" || !data) {
        toast.error("You must be logged in to add a resource");
        return;
      }

      const structuredData = data.resources.map((item) => ({
        ...item,
        unit: data.unit,
        name: data.name,
      }));

      const formData = new FormData();
      formData.append("resources", JSON.stringify(structuredData));

      structuredData.forEach((item) => {
        formData.append("files", item.file as File);
      });
      const API_URL = isEditing
        ? `${process.env.NEXT_PUBLIC_BASE_URL}/courses/${courseId}/resource/${defaultData?.id}`
        : `${process.env.NEXT_PUBLIC_BASE_URL}/courses/${courseId}/resource`;

      const res = await fetch(API_URL, {
        method: isEditing ? "PUT" : "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${userData?.user?.token}`,
        },
      });

      const result = await res.json();
      if (!res.ok) {
        toast.error(result.message || "Failed to add resource");
        return;
      }
      toast.success(result.message || "Resource added successfully");

      reset();
      setOpen(false);
    } catch (error) {
      console.error("Error adding resource:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || <Button className="bg-primary-color">Add Resource</Button>}
      </DialogTrigger>

      <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Edit Resource" : "Add New Resource"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Unit Number */}
          <div className="space-y-2">
            <Label>Unit Number</Label>
            <Input
              placeholder="Enter unit number"
              {...register("unit")}
              type="number"
            />
            {errors.unit && (
              <p className="text-red-500 text-sm">{errors?.unit?.message}</p>
            )}
          </div>

          {/* Name */}
          <div className="space-y-2">
            <Label>Name</Label>
            <Input placeholder="Enter resource name" {...register("name")} />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          <div>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Resources</h3>

              {/* Add More Resource */}
              <Button
                type="button"
                variant="secondary"
                onClick={() =>
                  append({
                    topic: "",
                    type: "ACTIVITY",
                    status: "SHOW",
                    file: undefined,
                  })
                }
              >
                <Plus className="w-4 h-4 mr-1" /> Add Resource
              </Button>
            </div>

            {fields.map((field, index) => (
              <div key={field.id} className="space-y-4">
                <div className="space-y-2">
                  <Label>Topic</Label>
                  <Input
                    placeholder="Topic"
                    {...register(`resources.${index}.topic`)}
                  />
                  {errors.resources?.[index]?.topic && (
                    <p className="text-red-500 text-sm">
                      {errors.resources?.[index]?.topic.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Type</Label>
                  <Select
                    {...register(`resources.${index}.type`)}
                    value={watch(`resources.${index}.type`)}
                    onValueChange={(val: CourseTypeOptionsType) =>
                      setValue(`resources.${index}.type`, val)
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select resource type" />
                    </SelectTrigger>
                    <SelectContent>
                      {courseTypeOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.resources?.[index]?.type && (
                    <p className="text-red-500 text-sm">
                      {errors.resources?.[index]?.type.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select
                    {...register(`resources.${index}.status`)}
                    value={watch(`resources.${index}.status`)}
                    onValueChange={(val: CourseStatusOptionsType) =>
                      setValue(`resources.${index}.status`, val)
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select resource status" />
                    </SelectTrigger>
                    <SelectContent>
                      {courseStatusOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.resources?.[index]?.status && (
                    <p className="text-red-500 text-sm">
                      {errors.resources?.[index]?.status.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Files</Label>

                  <Input
                    type="file"
                    accept="video/*,application/pdf,image/*,.docx,.pptx"
                    // {...register(`resources.${index}.file`)}
                    onChange={(e) => {
                      const file = e.target?.files?.[0];
                      console.log("file", file);
                      setValue(`resources.${index}.file`, file as File, {
                        shouldValidate: true,
                      });
                    }}
                  />

                  {errors.resources?.[index]?.file && (
                    <p className="text-red-500 text-sm">
                      {errors.resources?.[index]?.file.message}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full " disabled={isSubmitting}>
            {isSubmitting
              ? isEditing
                ? "Updating..."
                : "Adding..."
              : isEditing
              ? "Update Resource"
              : "Add Resource"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

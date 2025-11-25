"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createCourse, updateCourse } from "@/actions/courses";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Course } from "@/lib/types/course";

const courseSchema = z
  .object({
    name: z.string().min(1, "Course name is required"),
    description: z.string().min(1, "Description is required"),
    courseLength: z.number().min(1, "Course length must be at least 1 minute"),
    isPaid: z.boolean(),
    price: z.number().optional(),
  })
  .refine((data) => (data.isPaid ? !!data.price : true), {
    message: "Price is required for paid courses",
    path: ["price"],
  });

type CourseFormValues = z.infer<typeof courseSchema>;

export default function CreateCourseModal({
  defaultData,
  trigger,
}: {
  defaultData?: Course;
  trigger?: React.ReactNode;
}) {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const isEditing = Boolean(defaultData);

  const {
    watch,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<CourseFormValues>({
    resolver: zodResolver(courseSchema),
    reValidateMode: "onChange",
    defaultValues: {
      name: defaultData?.name || "",
      description: defaultData?.description || "",
      courseLength: Number(defaultData?.courseLength) || 30,
      isPaid: !!Number(defaultData?.price),
      price: Number(defaultData?.price) || 0,
    },
  });

  const onSubmit = async (values: CourseFormValues) => {
    const result = isEditing
      ? await updateCourse({
          id: defaultData!.id,
          ...values,
        })
      : await createCourse(values);
    if (result?.success) {
      toast.success(result?.message);
    } else {
      toast.error(result?.message);
    }
    reset();
    setIsDialogOpen(false);
  };

  const isPaid = watch("isPaid");
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button
            type="button"
            className="bg-primary-color hover:bg-primary-color/90 text-white transition-all duration-200"
            onClick={() => setIsDialogOpen(true)}
          >
            Create Course
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl max-h-[85vh] flex flex-col overflow-hidden">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle>{isEditing ? "Update" : "Create"} Course</DialogTitle>
          <DialogDescription>
            Fill in the details to{" "}
            {isEditing ? "update course" : "create a new course"}.
          </DialogDescription>
        </DialogHeader>
        <form className="flex flex-col flex-1 overflow-hidden" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex-1 overflow-y-auto pr-2 space-y-5">
          <div className="space-y-2">
            <Label htmlFor="name">Course name</Label>
            <Input
              id="name"
              placeholder="e.g. Algebra Basics"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <textarea
              id="description"
              placeholder="Add a brief description"
              className="min-h-[100px] w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              {...register("description")}
            />
            {errors.description && (
              <p className="text-sm text-red-600">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="lengthInMinutes">Course length (minutes)</Label>
            <Input
              id="lengthInMinutes"
              type="number"
              min={1}
              placeholder="60"
              {...register("courseLength", {
                valueAsNumber: true,
              })}
            />
            {errors.courseLength && (
              <p className="text-sm text-red-600">
                {errors.courseLength.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="price" className="mr-2 ">
              Is Paid
            </Label>
            <Switch
              checked={isPaid}
              {...register("isPaid")}
              onCheckedChange={(value) => {
                setValue("isPaid", value);
                setValue("price", 0);
              }}
              className="mt-1"
            />
          </div>
          {isPaid && (
            <div className="space-y-2">
              <Label htmlFor="lengthInMinutes">Course Price</Label>
              <Input
                id="price"
                type="number"
                min={1}
                placeholder="60"
                {...register("price", {
                  valueAsNumber: true,
                })}
              />

              {errors.price && (
                <p className="text-sm text-red-600">{errors.price.message}</p>
              )}
            </div>
          )}
          </div>

          <div className="flex-shrink-0 flex items-center justify-end gap-3 pt-4 border-t mt-4">
            <Button
              type="button"
              variant="outline"
              className="hover:bg-gray-100 transition-all duration-200"
              onClick={() => {
                reset();
                setIsDialogOpen(false);
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-primary-color hover:bg-primary-color/90 text-white transition-all duration-200"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : isEditing ? "Update course" : "Create course"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

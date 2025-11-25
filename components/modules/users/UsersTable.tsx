"use client";

import React, { useEffect, useState } from "react";
import { Eye, Trash } from "lucide-react";
import { Poppins } from "next/font/google";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import EditIcon from "@/assets/icons/EditIcon";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DialogBox from "@/components/common/DialogBox";
import ButtonLoader from "@/components/common/ButtonLoader";
import TableSkeleton from "@/components/common/TableSkeleton";
import ProfileModal from "./ProfileModal";
import { deleteUserProfileAction } from "@/actions/users";

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  profilePicture?: string;
}

interface UsersProp {
  users: User[];
  fontSize?: string;
  isDashboard?: boolean;
  currentPage?: number;
  limit?: number;
  isPending?: boolean;
  handlePageChange?: (page: number) => void;
  onUserDeleted?: () => void;
  isLoading?: boolean;
}

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "400", "700"],
});

export const DEFAULT_USER = {
  id: "",
  name: "",
  email: "",
  role: "student",
  profilePicture: "",
};

function UsersTable({
  users,
  fontSize,
  isDashboard,
  currentPage = 0,
  limit = 0,
  handlePageChange,
  isPending,
  onUserDeleted,
  isLoading,
}: UsersProp) {
  const { data } = useSession();
  const [isShowProfileModal, setIsShowProfileModal] = useState(false);
  const [isShowDialogBox, setIsShowDialogBox] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User>(DEFAULT_USER);

  // useEffect(() => {
  //     if (isShowDialogBox || isShowProfileModal) {
  //         document.body.classList.add('no-scroll');
  //     } else {
  //         document.body.classList.remove('no-scroll');
  //     }

  //     return () => {
  //         document.body.classList.remove('no-scroll');
  //     };
  // }, [isShowDialogBox, isShowProfileModal]);

  const handleOpenProfileModal = (user: User) => {
    setSelectedUser(user);
    setIsShowProfileModal(true);
  };

  const handleCloseProfileModal = () => {
    setIsShowProfileModal(false);
    setSelectedUser(DEFAULT_USER);
  };

  const handleDeleteStudents = async (idToRemove: string) => {
    const sessionUser = data?.user as { token?: string } | undefined;
    const accessToken = sessionUser?.token;

    if (!accessToken) {
      toast.error("No access token found");
      return;
    }

    try {
      const response = await deleteUserProfileAction(accessToken, idToRemove);

      if (!response.success) {
        throw new Error(response.error || "Failed to delete user");
      }

      toast.success("User deleted successfully");

      // Trigger refetch
      if (onUserDeleted) {
        onUserDeleted();
      }
    } catch (error: unknown) {
      let message = "An Error Occurred";
      if (error instanceof Error && error.message) {
        message = error.message;
      }
      toast.error(message);
    }
  };

  const handleConfirmDelete = () => {
    setIsShowDialogBox(false);
    handleDeleteStudents(selectedUser?.id);
  };

  const handleCancelDelete = () => {
    setIsShowDialogBox(false);
  };

  // Show skeleton while loading
  if (isLoading) {
    return (
      <section>
        <TableSkeleton isDashboard={isDashboard} />
      </section>
    );
  }

  return (
    <section>
      <Table
        className={`text-[${fontSize || "18"}px] mobile:text-sm ${
          poppins.className
        }`}
      >
        <TableHeader>
          <TableRow>
            <TableHead className=" text-dark-gray font-bold">SNO.</TableHead>
            <TableHead className=" text-dark-gray font-bold">Name</TableHead>
            {!isDashboard && (
              <TableHead className="text-dark-gray font-bold ">Email</TableHead>
            )}
            <TableHead className="text-dark-gray font-bold">Role</TableHead>
            <TableHead className=" text-dark-gray font-bold">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users?.length > 0 ? (
            users
              ?.map((user: User, index: number) => (
                <TableRow className="border-none" key={user?.id}>
                  <TableCell className="font-medium">
                    <span className="bg-light-gray px-[7px] py-1 rounded-md">
                      {currentPage * limit + index + 1}
                    </span>
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    <span>
                      {user?.name &&
                        user.name.charAt(0).toUpperCase() + user.name.slice(1)}
                    </span>
                  </TableCell>
                  {!isDashboard && (
                    <TableCell className="text-dark-gray whitespace-nowrap">
                      <span className="truncate">{user?.email}</span>
                    </TableCell>
                  )}
                  <TableCell className="text-dark-gray">
                    <span>
                      {user?.role &&
                        user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </span>
                  </TableCell>
                  <TableCell className="flex justify-start items-center p-0 mt-3 ml-3">
                    {isDashboard ? (
                      <div
                        className="mr-2 bg-light-orange rounded-md p-1 cursor-pointer flex items-center mt-1"
                        onClick={() => handleOpenProfileModal(user)}
                      >
                        <Eye color="#F59A3B" width={18} height={18} />
                      </div>
                    ) : (
                      <div className="flex">
                        <div
                          className="mr-2 rounded-md cursor-pointer"
                          onClick={() => handleOpenProfileModal(user)}
                        >
                          <EditIcon width={28} height={28} />
                        </div>
                        <div
                          className="bg-red-100 rounded-md p-1 cursor-pointer"
                          onClick={() => {
                            setSelectedUser(user);
                            setIsShowDialogBox(true);
                          }}
                        >
                          <Trash color="#D34645" width={18} height={18} />
                        </div>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))
              .slice(0, isDashboard ? 4 : users.length)
          ) : (
            <TableRow>
              <TableCell
                colSpan={isDashboard ? 4 : 5}
                className="text-center h-32"
              >
                No User Found!
              </TableCell>
            </TableRow>
          )}
        </TableBody>
        {isPending && (
          <TableRow>
            <TableCell colSpan={5} className="h-12 rounded-lg text-center">
              <ButtonLoader />
            </TableCell>
          </TableRow>
        )}
      </Table>
      <ProfileModal
        userId={selectedUser?.id}
        name={selectedUser?.name}
        email={selectedUser?.email}
        role={selectedUser?.role}
        profilePicture={selectedUser?.profilePicture}
        isViewOnly={isDashboard}
        onClose={handleCloseProfileModal}
        onUserUpdated={onUserDeleted}
        isOpen={isShowProfileModal}
        setIsOpen={setIsShowProfileModal}
      />
      <DialogBox
        isOpen={isShowDialogBox}
        setIsOpen={setIsShowDialogBox}
        message={`Are you sure you want to delete ${
          selectedUser?.name || "this user"
        }?`}
        onYes={handleConfirmDelete}
        onNo={handleCancelDelete}
      />
    </section>
  );
}

export default UsersTable;

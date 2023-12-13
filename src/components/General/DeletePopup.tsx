import apiUrl from "@/getApiPath";
import { useAuth } from "@/util/auth-context";
import axios from "axios";
import { useRouter } from "next/router";
import React, { FC } from "react";

interface DeletePopupProps {
  id: number;
  cancelPopup: () => void;
  isComment?: boolean;
}

const DeletePopup: FC<DeletePopupProps> = ({ id, cancelPopup, isComment }) => {
  const { user } = useAuth();
  const router = useRouter();
  const handleDelete = async () => {
    const apiCall = !isComment
      ? axios.delete(`${apiUrl}/apiThread/${id}?userId=${user?.userId}`)
      : axios.delete(`${apiUrl}/apiComment/${id}?userId=${user?.userId}`);

    try {
      const response = await apiCall;

      if (response.data) {
        isComment ? router.reload() : router.push("/");
      }
    } catch (error) {
      console.error("Error during delete:", error);
    }
  };

  return (
    <div className={`bg-white p-4 shadow-md rounded-md mt-2 w-fit `}>
      <div className="py-4">Are you sure you want to delete?</div>
      <div className="flex gap-4 justify-center">
        <button
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={() => cancelPopup()}
        >
          CANCEL
        </button>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={() => handleDelete()}
        >
          YES
        </button>
      </div>
    </div>
  );
};

export default DeletePopup;

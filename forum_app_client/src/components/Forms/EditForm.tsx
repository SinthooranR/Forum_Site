import { useAuth } from "@/util/auth-context";
import { useRouter } from "next/router";
import React, { FC, useEffect, useState } from "react";
import Input from "./Input";
import axios from "axios";

interface EditProps {
  isComment?: boolean;
  threadId?: number;
  commentId?: number;
  userId?: number;
  threadOwner?: string;
  oldReply?: string;
  oldTitle?: string;
  oldDescription?: string;
  cancelPopup: () => void;
}
const EditForm: FC<EditProps> = ({
  isComment,
  threadId,
  commentId,
  userId,
  oldTitle,
  oldDescription,
  oldReply,
  cancelPopup,
}) => {
  const { user } = useAuth();
  const router = useRouter();
  const [isSuccess, setIsSuccess] = useState(false);
  const [title, setTitle] = useState(oldTitle as string);
  const [description, setDescription] = useState(oldDescription as string);
  const [reply, setReply] = useState(oldReply as string);

  useEffect(() => {
    if (isSuccess) {
      const timeoutId = setTimeout(() => {
        router.reload();
      }, 1000);
      return () => clearTimeout(timeoutId);
    }
  }, [router, isSuccess]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const apiCall = !isComment
      ? axios.put(
          `https://localhost:7252/apiThread/${threadId}?userId=${user?.userId}`,
          {
            id: threadId,
            title,
            description,
          }
        )
      : axios.put(
          `https://localhost:7252/apiComment/${commentId}?threadId=${threadId}&userId=${userId}`,
          {
            id: commentId,
            text: reply,
          }
        );

    try {
      const response = await apiCall;
      if (response.data) {
        setIsSuccess(true);
      }
    } catch (error) {
      console.error("Error during Edit:", error);
    }
  };

  return (
    <div className="fixed top-20 right-0 mb-4 mr-4 z-50 w-4/5 sm:w-1/3 md:w-1/3 lg:w-1/4 xl:w-1/4 ">
      <div
        className="bg-indigo-500 text-white p-2 rounded-full cursor-pointer w-fit ml-auto"
        onClick={() => cancelPopup()}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </div>
      <div className="bg-white p-4 shadow-md rounded-md mt-2">
        <h2 className="text-xl font-semibold mb-4">
          {!isComment ? "Edit Thread" : `Edit Comment`}
        </h2>
        <form onSubmit={handleSubmit}>
          {!isComment ? (
            <>
              <Input
                label="Title"
                input={title}
                setInput={setTitle}
                inputType="text"
              />
              <Input
                label="Description"
                input={description}
                setInput={setDescription}
                inputType="text"
                multiline
              />
            </>
          ) : (
            <Input
              label="Reply"
              input={reply}
              setInput={setReply}
              inputType="text"
              multiline
            />
          )}
          <button
            type="submit"
            className="bg-indigo-500 text-white p-2 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring focus:border-blue-300"
          >
            Submit
          </button>
          {isSuccess && (
            <div className="bg-green-400 text-white p-4 mt-2 rounded-md">
              <p className="font-bold">Successfully Created, Reloading...</p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default EditForm;

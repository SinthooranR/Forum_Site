import React, { FC, useEffect, useState } from "react";
import Input from "../Forms/Input";
import { useAuth } from "@/util/auth-context";
import axios from "axios";
import { useRouter } from "next/router";

interface WidgetProps {
  isComment?: boolean;
  threadId?: number;
  threadOwner?: string;
}

const AddWidget: FC<WidgetProps> = ({ isComment, threadId, threadOwner }) => {
  const { user } = useAuth();
  const router = useRouter();
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [reply, setReply] = useState("");

  const toggleFormVisibility = () => {
    setIsFormVisible((prev) => !prev);
  };

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
      ? axios.post(`https://localhost:7252/apiThread?userId=${user?.userId}`, {
          title,
          description,
        })
      : axios.post(
          `https://localhost:7252/apiComment?userId=${user?.userId}&threadId=${threadId}`,
          {
            text: reply,
          }
        );

    try {
      const response = await apiCall;

      if (response.data) {
        setIsSuccess(true);
      }
    } catch (error) {
      console.error("Error during Post:", error);
    }
  };

  return (
    <div className="fixed bottom-0 right-0 mb-4 mr-4 w-5/6 md:w-1/3 lg:w-1/4 xl:w-1/4">
      <div
        className="bg-indigo-500 text-white p-2 rounded-full cursor-pointer w-fit ml-auto"
        onClick={toggleFormVisibility}
      >
        {isFormVisible ? (
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
        ) : (
          <div className="flex gap-2">
            {!isComment ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-10 h-10"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-10 h-10"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                />
              </svg>
            )}
          </div>
        )}
      </div>
      {isFormVisible && (
        <div className="bg-white p-4 shadow-md rounded-md mt-2">
          <h2 className="text-xl font-semibold mb-4">
            {!isComment
              ? "Make a Thread"
              : `Reply to ${threadOwner || "this Thread"}`}
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
      )}
    </div>
  );
};

export default AddWidget;

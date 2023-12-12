import Link from "next/link";
import React, { FC, useState } from "react";
import EditForm from "../Forms/EditForm";
import { useAuth } from "@/util/auth-context";
import DeletePopup from "../General/DeletePopup";
import { getFormattedTime } from "@/util/getFormattedTime";

interface CommentCardProps {
  userName: string;
  text: string;
  dateCreated: string;
  allowRedirect?: boolean;
  commentId?: number;
  threadId?: number;
  userId?: number;
}

const CommentCard: FC<CommentCardProps> = ({
  text,
  userName,
  dateCreated,
  allowRedirect,
  commentId,
  threadId,
  userId,
}) => {
  const { user } = useAuth();
  const [formOpen, setFormOpen] = useState(false);
  const [deletePopup, setDeletePopup] = useState(false);
  const formattedTime = getFormattedTime(dateCreated);

  return (
    <>
      <div className="relative bg-white shadow-md p-4 rounded-md w-full sm:w-2/3 md:w-1/2 lg:w-1/2 xl:w-1/2">
        {/* User Name */}
        <div className="flex justify-between">
          <div className="font-bold mb-2">{userName}</div>
          {userId === user?.userId && (
            <div className="flex">
              <div className="flex-row">
                <div className="flex">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 cursor-pointer"
                    onClick={() => setFormOpen(!formOpen)}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                    />
                  </svg>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="red"
                    className="w-6 h-6 cursor-pointer"
                    onClick={() => setDeletePopup(!deletePopup)}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                </div>
              </div>
            </div>
          )}

          {allowRedirect && (
            <Link href={`/threads/${threadId}`}>
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
                  d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                />
              </svg>
            </Link>
          )}
        </div>

        {/* Description */}
        <p className="text-gray-700 mb-4 whitespace-pre-line break-words">
          {text}
        </p>

        {/* Date Created and Number of Comments */}
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div>{formattedTime}</div>
        </div>
        {deletePopup && (
          <div className="absolute top-10 right-0 z-50">
            <DeletePopup
              id={commentId as number}
              cancelPopup={() => setDeletePopup(false)}
              isComment
            />
          </div>
        )}
      </div>

      {formOpen && (
        <EditForm
          isComment
          oldReply={text}
          commentId={commentId}
          userId={userId}
          threadId={threadId}
          cancelPopup={() => setFormOpen(false)}
        />
      )}
    </>
  );
};

export default CommentCard;

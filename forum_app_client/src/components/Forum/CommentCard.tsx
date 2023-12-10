import Link from "next/link";
import React, { FC } from "react";

interface CommentCardProps {
  userName: string;
  text: string;
  dateCreated: string;
  allowRedirect?: boolean;
  threadId?: number;
}

const CommentCard: FC<CommentCardProps> = ({
  text,
  userName,
  dateCreated,
  allowRedirect,
  threadId,
}) => {
  return (
    <div className="bg-white shadow-md p-4 rounded-md w-full sm:w-2/3 md:w-1/2 lg:w-1/2 xl:w-1/2">
      {/* User Name */}
      <div className="flex justify-between">
        <div className="font-bold mb-2">{userName}</div>
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
      <p className="text-gray-700 mb-4">{text}</p>

      {/* Date Created and Number of Comments */}
      <div className="flex items-center justify-between text-sm text-gray-500">
        <div>Commented On: {dateCreated}</div>
      </div>
    </div>
  );
};

export default CommentCard;

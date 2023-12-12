import { getFormattedTime } from "@/util/getFormattedTime";
import { useRouter } from "next/router";
import React, { FC } from "react";

interface ForumCardProps {
  id: number;
  title: string;
  description: string;
  userName: string;
  dateCreated: string;
  numberComments: number;
}

const ForumCard: FC<ForumCardProps> = ({
  id,
  title,
  description,
  userName,
  dateCreated,
  numberComments,
}) => {
  const router = useRouter();
  const formattedTime = getFormattedTime(dateCreated);
  return (
    <div className="bg-white shadow-md p-4 rounded-md w-full sm:w-2/3 md:w-1/2 lg:w-1/2 xl:w-1/2">
      {/* User Name */}
      <div className="font-bold mb-2">{userName}</div>

      {/* Title */}
      <h2 className="text-xl font-semibold mb-2">{title}</h2>

      {/* Description */}
      <p className="text-gray-700 mb-4 whitespace-pre-line break-words">
        {description}
      </p>

      {/* Date Created and Number of Comments */}
      <div className="flex items-center justify-between text-sm text-gray-500">
        <div>{formattedTime}</div>
        <div
          className="cursor-pointer"
          onClick={() => router.push(`/threads/${id}`)}
        >
          {numberComments} Comments
        </div>
      </div>
    </div>
  );
};

export default ForumCard;

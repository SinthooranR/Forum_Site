import React, { FC } from "react";

interface CommentCardProps {
  userName: string;
  text: string;
  dateCreated: string;
}

const CommentCard: FC<CommentCardProps> = ({ text, userName, dateCreated }) => {
  return (
    <div className="bg-white shadow-md p-4 rounded-md">
      {/* User Name */}
      <div className="font-bold mb-2">{userName}</div>

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

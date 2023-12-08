import React, { FC } from "react";

interface ForumPageCardProps {
  title: string;
  description: string;
  userName: string;
  dateCreated: string;
}

const ForumPageCard: FC<ForumPageCardProps> = ({
  title,
  description,
  userName,
  dateCreated,
}) => {
  return (
    <div className="bg-white shadow-md p-4">
      {/* User Name */}
      <div className="font-bold mb-2">{userName}</div>

      {/* Title */}
      <h2 className="text-xl font-semibold mb-2">{title}</h2>

      {/* Description */}
      <p className="text-gray-700 mb-4">{description}</p>

      {/* Date Created and Number of Comments */}
      <div className="flex items-center justify-between text-sm text-gray-500">
        <div>Created On: {dateCreated}</div>
      </div>
    </div>
  );
};

export default ForumPageCard;

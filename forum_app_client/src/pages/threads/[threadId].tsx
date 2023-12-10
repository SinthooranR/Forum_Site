import AddWidget from "@/components/AddWidget";
import CommentCard from "@/components/Forum/CommentCard";
import ForumPageCard from "@/components/Forum/ForumPageCard";
import MetaTitle from "@/components/MetaTitle";
import { useAuth } from "@/util/auth-context";
import axios from "axios";
import { GetServerSideProps } from "next";
import React, { FC, Fragment } from "react";

interface Props {
  data: any;
}

interface CommentProps {
  id: number;
  text: string;
  user: {
    firstName: string;
    lastName: string;
  };
  createdDate: string;
}

const ThreadPage: FC<Props> = ({ data }) => {
  const { user } = useAuth();
  const timestampUTC = new Date(data.createdDate);
  const timestampEST = timestampUTC.toLocaleString("en-US", {
    timeZone: "America/New_York",
  });
  console.log(data);
  return (
    <>
      <MetaTitle title={data.title || "Thread"} />
      <div>
        <ForumPageCard
          userName={data.user.firstName + " " + data.user.lastName}
          title={data.title}
          description={data.description}
          dateCreated={timestampEST}
        />
        <h2 className="text-3xl font-bold mb-4 text-white p-4 mt-4 mb-0">
          Comments
        </h2>
        <div className=".container w-screen flex flex-col gap-8 p-4">
          {data.comments.length > 0 &&
            data.comments.map(
              ({ id, user, text, createdDate }: CommentProps) => {
                return (
                  <Fragment key={id}>
                    <CommentCard
                      userName={user.firstName + " " + user.lastName}
                      text={text}
                      dateCreated={createdDate}
                    />
                  </Fragment>
                );
              }
            )}
        </div>
      </div>
      {user && <AddWidget isComment threadId={data.id} />}
    </>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async ({
  params,
}) => {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  const threadId = params?.threadId as string | undefined;
  try {
    const response = await axios.get(
      `https://localhost:7252/apiThread/${threadId}`
    );
    const data = response.data;
    return {
      props: {
        data,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);

    return {
      props: {
        data: "",
      },
      redirect: "/",
    };
  }
};

export default ThreadPage;

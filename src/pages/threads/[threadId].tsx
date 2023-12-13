import AddWidget from "@/components/General/AddWidget";
import CommentCard from "@/components/Forum/CommentCard";
import ForumPageCard from "@/components/Forum/ForumPageCard";
import MetaTitle from "@/components/MetaTitle";
import { useAuth } from "@/util/auth-context";
import axios from "axios";
import { GetServerSideProps } from "next";
import React, { FC, Fragment } from "react";
import { Comment, Thread } from "@/interfaces";
import { getFormattedTime } from "@/util/getFormattedTime";
import apiUrl from "@/getApiPath";

interface ThreadProps {
  thread: Thread;
}

const ThreadPage: FC<ThreadProps> = ({ thread }) => {
  const { user } = useAuth();
  return (
    <>
      <MetaTitle title={thread.title || "Thread"} />
      <div>
        <ForumPageCard
          userName={thread.user?.firstName + " " + thread.user?.lastName}
          title={thread.title}
          description={thread.description}
          dateCreated={thread.createdDate}
          threadId={thread.id}
          userId={thread.user?.id}
        />
        <h2 className="text-3xl font-bold mb-4 text-white py-4 px-8 mt-4 mb-0">
          Comments ({thread.comments?.length})
        </h2>
        <div className="container w-screen flex flex-col gap-8 py-4 px-8">
          {thread.comments &&
            thread.comments?.length > 0 &&
            thread.comments.map(
              ({ id, user, text, createdDate, threadId }: Comment) => {
                return (
                  <Fragment key={id}>
                    <CommentCard
                      userName={user?.firstName + " " + user?.lastName}
                      text={text}
                      dateCreated={createdDate}
                      threadId={threadId}
                      userId={user?.id}
                      commentId={id}
                    />
                  </Fragment>
                );
              }
            )}
        </div>
      </div>
      {user && (
        <AddWidget
          isComment
          threadId={thread.id}
          threadOwner={thread.user?.firstName + " " + thread.user?.lastName}
        />
      )}
    </>
  );
};

export const getServerSideProps: GetServerSideProps<ThreadProps> = async ({
  params,
}) => {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  const threadId = params?.threadId as string | undefined;
  try {
    const response = await axios.get(`${apiUrl}/apiThread/${threadId}`);
    const data = response.data;
    return {
      props: {
        thread: data,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);

    return {
      props: {
        thread: [],
      },
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
};

export default ThreadPage;

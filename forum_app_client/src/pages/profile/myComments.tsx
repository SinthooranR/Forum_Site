import CommentCard from "@/components/Forum/CommentCard";
import MetaTitle from "@/components/MetaTitle";
import { parseJwt } from "@/util/parseJWT";
import axios from "axios";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import React, { FC, Fragment } from "react";

interface Props {
  data: any;
}

const MyComments: FC<Props> = ({ data }) => {
  return (
    <>
      <MetaTitle title="My Comments" />
      <div className="container mx-auto my-auto py-8 px-8 flex flex-col items-center gap-8 bg-slate-900 h-screen">
        {data.length > 0 &&
          data.map((comment: any) => {
            const timestampUTC = new Date(comment.createdDate);
            const timestampEST = timestampUTC.toLocaleString("en-US", {
              timeZone: "America/New_York",
            });
            return (
              <Fragment key={comment.id}>
                <CommentCard
                  userName={
                    comment.user.firstName + " " + comment.user.lastName
                  }
                  text={comment.text}
                  dateCreated={timestampEST}
                  allowRedirect
                  threadId={comment.threadId}
                />
              </Fragment>
            );
          })}
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  const { token } = parseCookies(context);
  const decodedUser = parseJwt(token);
  try {
    const response = await axios.get(
      `https://localhost:7252/apiComment/${decodedUser?.userId}`
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
        data: [],
      },
      redirect: "/",
    };
  }
};

export default MyComments;

import ForumCard from "@/components/Forum/ForumCard";
import axios from "axios";
import { GetServerSideProps } from "next";
import React, { FC, Fragment } from "react";
import { parseCookies } from "nookies";
import { parseJwt } from "@/util/parseJWT";
import MetaTitle from "@/components/MetaTitle";

interface Props {
  data: any;
}

const MyThreads: FC<Props> = ({ data }) => {
  return (
    <>
      <MetaTitle title="My Threads" />
      <div className="container mx-auto my-auto py-8 px-8 flex flex-col items-center gap-8 bg-slate-900 h-screen">
        {data.length > 0 &&
          data.map((forum: any) => {
            const timestampUTC = new Date(forum.createdDate);
            const timestampEST = timestampUTC.toLocaleString("en-US", {
              timeZone: "America/New_York",
            });
            return (
              <Fragment key={forum.id}>
                <ForumCard
                  id={forum.id}
                  userName={forum.user.firstName + " " + forum.user.lastName}
                  title={forum.title}
                  description={forum.description}
                  dateCreated={timestampEST}
                  numberComments={forum.comments.length}
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
      `https://localhost:7252/apiThread/user/${decodedUser?.userId}`
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

export default MyThreads;

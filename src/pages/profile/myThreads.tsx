import ForumCard from "@/components/Forum/ForumCard";
import axios from "axios";
import { GetServerSideProps } from "next";
import React, { FC, Fragment } from "react";
import { parseCookies } from "nookies";
import { parseJwt } from "@/util/parseJWT";
import MetaTitle from "@/components/MetaTitle";
import AddWidget from "@/components/General/AddWidget";
import { useAuth } from "@/util/auth-context";
import { Thread } from "@/interfaces";
import apiUrl from "@/getApiPath";

interface ThreadProps {
  threads: Thread[];
}

const MyThreads: FC<ThreadProps> = ({ threads }) => {
  const { user } = useAuth();
  return (
    <>
      <MetaTitle title="My Threads" />
      {threads.length === 0 ? (
        <div className="container mx-auto h-screen flex flex-col justify-center items-center bg-slate-900">
          <h1 className="text-3xl md:text-5xl lg:text-6xl text-center text-white">
            No Threads Found
          </h1>
        </div>
      ) : (
        <div className="container mx-auto my-auto py-8 px-8 flex flex-col items-center gap-8 bg-slate-900 h-screen">
          {threads
            .sort((a: { id: number }, b: { id: number }) => b.id - a.id)
            .map((forum: Thread) => {
              const timestampUTC = new Date(forum.createdDate);
              const timestampEST = timestampUTC.toLocaleString("en-US", {
                timeZone: "America/New_York",
              });
              return (
                <Fragment key={forum.id}>
                  <ForumCard
                    id={forum.id}
                    userName={
                      forum.user?.firstName + " " + forum.user?.lastName
                    }
                    title={forum.title}
                    description={forum.description}
                    dateCreated={timestampEST}
                    numberComments={
                      (forum.comments && forum.comments.length) || 0
                    }
                  />
                </Fragment>
              );
            })}
        </div>
      )}
      {user && <AddWidget />}
    </>
  );
};

export const getServerSideProps: GetServerSideProps<ThreadProps> = async (
  context
) => {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED =
    process.env.NODE_ENV === "development" ? "0" : "1";
  const { token } = parseCookies(context);
  const decodedUser = parseJwt(token);
  try {
    const response = await axios.get(
      `${apiUrl}/apiThread/user/${decodedUser?.userId}`
    );
    const data = response.data;
    return {
      props: {
        threads: data,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);

    return {
      props: {
        threads: [],
      },
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
};

export default MyThreads;

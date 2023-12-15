import AddWidget from "@/components/General/AddWidget";
import ForumCard from "@/components/Forum/ForumCard";
import MetaTitle from "@/components/MetaTitle";
import { useAuth } from "@/util/auth-context";
import axios from "axios";
import { GetServerSideProps } from "next";
import { FC, Fragment } from "react";
import { Thread } from "@/interfaces";
import apiUrl from "@/getApiPath";

interface Props {
  threads: Thread[];
}

const Home: FC<Props> = ({ threads }) => {
  const { user } = useAuth();
  return (
    <>
      <MetaTitle title="Welcome" />
      {threads.length === 0 ? (
        <div className="container mx-auto h-screen flex flex-col justify-center items-center bg-slate-900">
          <h1 className="text-3xl md:text-5xl lg:text-6xl text-center text-white">
            No Threads Found, make the first one!
          </h1>
        </div>
      ) : (
        <div className="container mx-auto my-auto py-8 px-8 flex flex-col items-center gap-8 bg-slate-900 h-screen">
          {threads
            .sort((a: { id: number }, b: { id: number }) => b.id - a.id)
            .map((forum: Thread) => (
              <Fragment key={forum.id}>
                <ForumCard
                  id={forum.id}
                  userName={forum.user?.firstName + " " + forum.user?.lastName}
                  title={forum.title}
                  description={forum.description}
                  dateCreated={forum.createdDate}
                  numberComments={
                    (forum.comments && forum.comments.length) || 0
                  }
                />
              </Fragment>
            ))}
        </div>
      )}
      {user && <AddWidget />}
    </>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED =
    process.env.NODE_ENV === "development" ? "0" : "1";
  try {
    const response = await axios.get(`${apiUrl}/apiThread/`);
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
    };
  }
};

export default Home;

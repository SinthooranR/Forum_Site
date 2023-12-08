import ForumCard from "@/components/Forum/ForumCard";
import axios from "axios";
import { GetServerSideProps } from "next";
import { FC, Fragment } from "react";

interface Props {
  data: any;
}

const Home: FC<Props> = ({ data }) => {
  console.log("Data:", data);
  return (
    <div className="container mx-auto my-auto py-8 px-8 flex-col flex items-center gap-8 bg-slate-900 h-screen w-screen">
      {data.map((forum: any) => {
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
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  try {
    const response = await axios.get("https://localhost:7252/apiThread/");
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
    };
  }
};

export default Home;

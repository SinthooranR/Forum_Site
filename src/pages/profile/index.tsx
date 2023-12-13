import EditProfileForm from "@/components/Forms/EditProfileForm";
import MetaTitle from "@/components/MetaTitle";
import apiUrl from "@/getApiPath";
import { User } from "@/interfaces";
import { parseJwt } from "@/util/parseJWT";
import axios from "axios";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import React, { FC } from "react";

interface UserProps {
  user: User;
}

const StatContent: FC<{ title: string; count?: number }> = ({
  title,
  count,
}) => {
  return (
    <div className="bg-white shadow-md rounded p-10 h-auto w-full sm:w-3/4 md:w-1/2 lg:w-1/2 xl:w-1/4">
      <div className="text-xl mb-2">{title}</div>
      <div className="text-xl font-bold text-gray-700">{count}</div>
    </div>
  );
};

const ProfilePage: FC<UserProps> = ({ user }) => {
  return (
    <>
      <MetaTitle title="My Profile" />
      <div className="container flex flex-col justify-center gap-4 mx-auto px-4 bg-slate-900 h-screen w-screen">
        <div className="flex items-center justify-center flex-col sm:flex-row gap-2">
          <StatContent title="Threads" count={user.threads.length || 0} />
          <StatContent title="Comments" count={user.comments.length || 0} />
        </div>
        <EditProfileForm data={user} />
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<UserProps> = async (
  context
) => {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "1";
  const { token } = parseCookies(context);
  const decodedUser = parseJwt(token);
  try {
    const response = await axios.get(
      `${apiUrl}/apiUser/${decodedUser?.userId}`
    );
    const data = response.data;
    return {
      props: {
        user: data,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);

    return {
      props: {
        user: null,
      },
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
};

export default ProfilePage;

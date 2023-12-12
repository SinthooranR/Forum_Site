import LoginForm from "@/components/Forms/LoginForm";
import MetaTitle from "@/components/MetaTitle";
import React from "react";

const Login = () => {
  return (
    <>
      <MetaTitle title="Login" />
      <div className="container mx-auto px-4 bg-slate-900 h-screen w-screen">
        <LoginForm />
      </div>
    </>
  );
};

export default Login;

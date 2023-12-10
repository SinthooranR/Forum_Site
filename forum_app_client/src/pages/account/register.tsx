import RegisterForm from "@/components/Account/RegisterForm";
import MetaTitle from "@/components/MetaTitle";
import React from "react";

const Register = () => {
  return (
    <>
      <MetaTitle title="Register" />
      <div className="container mx-auto px-4 bg-slate-900 h-screen w-screen">
        <RegisterForm />
      </div>
    </>
  );
};

export default Register;

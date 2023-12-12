import RegisterForm from "@/components/Forms/RegisterForm";
import MetaTitle from "@/components/MetaTitle";
import React from "react";

const Register = () => {
  return (
    <>
      <MetaTitle title="Register" />
      <div className="flex items-center justify-center bg-slate-900 h-screen">
        <div className="container mx-auto">
          <RegisterForm />
        </div>
      </div>
    </>
  );
};

export default Register;

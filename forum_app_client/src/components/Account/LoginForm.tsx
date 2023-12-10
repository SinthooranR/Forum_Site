import React, { useState } from "react";
import Input from "./Input";
import { useRouter } from "next/router";
import { getAuthToken } from "@/util/getAuthToken";
import { useAuth } from "@/util/auth-context";

const LoginForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Email:", email, "Password:", password);
    try {
      const response = await getAuthToken(email, password);
      login(response);
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  console.log("User:", user);
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 h-2/5 md:w-2/4">
        <h1 className="text-2xl mb-6">Login</h1>
        <form onSubmit={handleSubmit}>
          {/* Use the InputComponent */}
          <Input
            input={email}
            setInput={setEmail}
            inputType="email"
            label="Email"
          />
          <Input
            input={password}
            setInput={setPassword}
            inputType="password"
            label="Password"
          />

          <div className="flex flex-col items-start gap-y-2">
            <button
              type="submit"
              className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none"
            >
              Login
            </button>

            <div
              className="text-indigo-500 font-bold py-2 rounded cursor-pointer"
              onClick={() => router.push("/account/register")}
            >
              Dont have an account? Click here to Register.
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;

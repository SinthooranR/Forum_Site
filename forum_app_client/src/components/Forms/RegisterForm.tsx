import React, { useState, Fragment, useEffect } from "react";
import Input from "./Input";
import { useRouter } from "next/router";
import axios from "axios";

const RegisterForm = () => {
  const router = useRouter();

  //Form Items
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastname] = useState("");

  const [errors, setErrors] = useState<String[]>([]);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email !== confirmEmail || password !== confirmPassword) {
      let newErrors = [...errors];
      if (email !== confirmEmail && !errors.includes("Emails do not match.")) {
        newErrors.push("Emails do not match.");
      }
      if (
        password !== confirmPassword &&
        !errors.includes("Passwords do not match.")
      ) {
        newErrors.push("Passwords do not match.");
      }
      setErrors(newErrors);
    } else {
      setErrors([]);
      try {
        const response = await axios.post("https://localhost:7252/apiUser/", {
          firstName,
          lastName,
          email,
          password,
        });

        if (response.data) {
          setIsSuccess(true);
        }
      } catch (error) {
        if (error.response && error.response.data && error.response.data[""]) {
          const errorMessage = (error.response.data as Record<string, any>)[""]
            .errors[0].errorMessage;
          setErrors([errorMessage]);
        } else if (error.response && error.response.data) {
          const errorArray = error.response.data || [];
          const arrayToPush: String[] = [];
          errorArray.length > 0 &&
            errorArray.forEach(
              (errorItem: { code: string; description: string }) => {
                arrayToPush.push(errorItem.description);
              }
            );
          setErrors(arrayToPush);
        } else {
          console.error("Error handling the response:", error);
        }
      }
    }
  };

  useEffect(() => {
    if (isSuccess) {
      const timeoutId = setTimeout(() => {
        router.push("/account/login");
      }, 5000);
      return () => clearTimeout(timeoutId);
    }
  }, [router, isSuccess]);

  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 h-auto sm:w-full md:w-2/4">
          <h1 className="text-2xl mb-6">Register</h1>
          <form onSubmit={handleSubmit}>
            {/* Use the InputComponent */}

            <Input
              input={firstName}
              setInput={setFirstName}
              inputType="text"
              label="First Name"
            />
            <Input
              input={lastName}
              setInput={setLastname}
              inputType="text"
              label="Last Name"
            />

            <Input
              input={email}
              setInput={setEmail}
              inputType="email"
              label="Email"
            />

            <Input
              input={confirmEmail}
              setInput={setConfirmEmail}
              inputType="email"
              label="Confirm Email"
            />

            <Input
              input={password}
              setInput={setPassword}
              inputType="password"
              label="Password"
            />

            <Input
              input={confirmPassword}
              setInput={setConfirmPassword}
              inputType="password"
              label="Confirm Password"
            />

            <div className="flex flex-col items-start gap-y-2">
              <button
                type="submit"
                className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none"
              >
                Register
              </button>

              <div
                className="text-indigo-500 font-bold py-2 rounded cursor-pointer"
                onClick={() => router.push("/account/login")}
              >
                Dont have an account? Click here to Login.
              </div>
            </div>

            {errors && errors.length > 0 && (
              <div className="bg-red-500 text-white p-4 rounded-md">
                {errors.map((error, index) => (
                  <Fragment key={index}>
                    <p className="font-bold">{error}</p>
                  </Fragment>
                ))}
              </div>
            )}

            {isSuccess && (
              <div className="bg-green-400 text-white p-4 rounded-md">
                <p className="font-bold">
                  Registered Successfully, Redirecting in 5 seconds
                </p>
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default RegisterForm;

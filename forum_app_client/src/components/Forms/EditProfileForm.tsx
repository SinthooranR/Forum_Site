import React, { useState, Fragment, useEffect, FC } from "react";
import Input from "./Input";
import { useRouter } from "next/router";
import axios from "axios";
import { useAuth } from "@/util/auth-context";
import { User } from "@/interfaces";

interface Props {
  data: User;
}

const EditProfileForm: FC<Props> = ({ data }) => {
  const router = useRouter();
  const { user } = useAuth();

  //Form Items
  const [email, setEmail] = useState(data.email);
  // const [password, setPassword] = useState(data.password);
  const [firstName, setFirstName] = useState(data.firstName);
  const [lastName, setLastname] = useState(data.lastName);

  const [errors, setErrors] = useState<String[]>([]);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);
    try {
      const response = await axios.put(
        `https://localhost:7252/apiUser/${user?.userId}`,
        {
          firstName,
          lastName,
        }
      );

      if (response.data) {
        router.reload();
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
  };

  return (
    <>
      <div className="flex items-center justify-center">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 h-auto w-full sm:w-3/4 md:w-1/2 lg:w-1/2 xl:w-1/2">
          <h1 className="text-2xl mb-6">My Profile</h1>
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
              disabled
            />
            <div className="flex flex-col items-start gap-y-2">
              <button
                type="submit"
                className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none"
              >
                Update Profile
              </button>
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

export default EditProfileForm;

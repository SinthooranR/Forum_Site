import React, { useState, FormEvent } from "react";

const Login = () => {
  const [name, setName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  //   const [username, setUsername] = useState<string>("");
  console.log(username);
  return (
    <div>
      <form>
        <input
          type="text"
          placeholder="Enter Name"
          value={username}
          onChange={(e: FormEvent<HTMLInputElement>) =>
            setUsername(e.target.value)
          }
        />
        <input
          type="text"
          placeholder="Enter Username"
          value={username}
          onChange={(e: FormEvent<HTMLInputElement>) =>
            setUsername(e.target.value)
          }
        />
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={(e: FormEvent<HTMLInputElement>) =>
            setUsername(e.target.value)
          }
        />
      </form>
    </div>
  );
};

export default Login;

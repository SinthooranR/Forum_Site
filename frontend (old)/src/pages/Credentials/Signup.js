import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { MainContext } from "../../main_context";
import Input from "../../components/General/Input/Input";
import Button from "../../components/General/Button/Button";
import axios from "axios";
import classes from "./Signup.module.css";

const SignUp = (props) => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const auth = useContext(MainContext);
  const history = useHistory();

  const changeUsername = (event) => {
    setUsername(event.target.value);
  };

  const changeName = (event) => {
    setName(event.target.value);
  };

  const changePassword = (event) => {
    setPassword(event.target.value);
  };

  const submitSignup = async (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:5000/api/users/signup", {
        name: name,
        username: username,
        password: password,
      })
      .then((response) => {
        console.log(response);
        auth.login(response.data.users.id);
        history.push("/"); //redirects the user back to main page
      })
      .catch((error) => {
        history.push("/signup"); //ERROR REDIRECT TEST
        console.log(error);
      });
  };

  return (
    <div className={classes.SignUp}>
      <h2>Please SignUp Below</h2>
      <form noValidate autoComplete="off" onSubmit={submitSignup}>
        <Input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={changeName}
        />
        <Input
          type="text"
          placeholder="Enter Username"
          value={username}
          onChange={changeUsername}
        />
        <Input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={changePassword}
        />
        <span>
          <Button
            type="submit"
            buttonLabel="Verify and SignUp"
            color="dark"
            disabled={!(name && username && password)}
            onClick={() => submitSignup}
          />
        </span>
      </form>
    </div>
  );
};

export default SignUp;

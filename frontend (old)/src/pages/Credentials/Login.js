import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { MainContext } from "../../main_context";
import Input from "../../components/General/Input/Input";
import Button from "../../components/General/Button/Button";
import axios from "axios";
import classes from "./Login.module.css";
const Login = (props) => {
  const history = useHistory();
  const auth = useContext(MainContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const changeUsername = (event) => {
    setUsername(event.target.value);
  };
  const changePassword = (event) => {
    setPassword(event.target.value);
  };

  const submitLogin = async (event) => {
    axios
      .post("http://localhost:5000/api/users/login", {
        username: username,
        password: password,
      })
      .then((response) => {
        console.log(response);
        auth.login(response.data.users.id);
        history.push("/"); //redirects the user back to main page
      })
      .catch((error) => {
        history.push("/login"); //ERROR REDIRECT TEST
        console.log(error);
      });
    history.push("/");
    event.preventDefault();
  };

  return (
    <div className={classes.Login}>
      <h2>Please Login Below</h2>
      <form noValidate autoComplete="off" onSubmit={submitLogin}>
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
            buttonLabel="Authenticate"
            color="dark"
            disabled={!(username && password)}
            onClick={() => submitLogin}
          />
        </span>
      </form>
    </div>
  );
};

export default Login;

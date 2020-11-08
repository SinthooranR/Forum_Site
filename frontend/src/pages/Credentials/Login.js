import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {MainContext} from '../../main_context';

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

  const registerHandler = (event) => {
    history.push("/signup");
    event.preventDefault();
  };

  const submitLogin = (event) => {
    alert(`${username}, ${password}`);
    console.log(username, password);
    auth.login();
    history.push("/");
    event.preventDefault();
  };

  return (
    <div className={classes.Login}>
      <h2>Please Login Below</h2>
      <form noValidate autoComplete="off" onSubmit={submitLogin}>
        <TextField
          id="outlined-basic"
          label="Username"
          variant="outlined"
          value={username}
          onChange={changeUsername}
        />
        <TextField
          id="outlined-basic"
          type="password"
          label="Password"
          variant="outlined"
          value={password}
          onChange={changePassword}
        />
        <span>
          <Button type="submit" variant="contained" onClick={() => submitLogin}>
            Login
          </Button>
          <Button variant="contained" color="primary" onClick={registerHandler}>
            Register Now!
          </Button>
        </span>
      </form>
    </div>
  );
};

export default Login;

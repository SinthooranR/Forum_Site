import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { MainContext } from "../../main_context";
import Input from "../../components/General/Input/Input";
import classes from "./Login.module.css";
import Button from '../../components/General/Button/Button';

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
          {/* <Button
            type="submit"
            variant="contained"
            onClick={() => submitLogin}
            disabled={!(username && password)}
          >
            Login
          </Button>
          <Button
            variant="contained"
            style={{ backgroundColor: "orange" }}
            onClick={registerHandler}
          >
            Register Now!
          </Button> */}
          <Button type="submit" buttonLabel="Authenticate" color="dark" disabled={!(username && password)} onClick={() => submitLogin}/>
        </span>
      </form>
    </div>
  );
};

export default Login;

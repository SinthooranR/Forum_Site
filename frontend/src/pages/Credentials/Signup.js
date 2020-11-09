import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { MainContext } from '../../main_context';
import classes from "./Signup.module.css";

const SignUp = (props) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const auth = useContext(MainContext)
  const history = useHistory();

  const changeUsername = (event) => {
    setUsername(event.target.value);
  };

  const changeEmail = (event) => {
    setEmail(event.target.value);
  };

  const changePassword = (event) => {
    setPassword(event.target.value);
  };

  const changeConfirmPassword = (event) => {
    setConfirmPassword(event.target.value);
  };

  const loginHandler = (event) => {
    history.push("/login");
    event.preventDefault();
  };

  const submitSignup = (event) => {
    auth.login();
    alert(`${username}, ${email}, ${password}, ${confirmPassword}`);
    console.log(username, email, password, confirmPassword);
    history.push("/");
    event.preventDefault();
  };

  return (
    <div className={classes.SignUp}>
      <h2>Please SignUp Below</h2>
      <form noValidate autoComplete="off" onSubmit={submitSignup}>
        <TextField
          id="outlined-basic"
          label="Username"
          variant="outlined"
          value={username}
          onChange={changeUsername}
        />
        <TextField
          id="outlined-basic"
          type="email"
          label="Email"
          variant="outlined"
          value={email}
          onChange={changeEmail}
        />
        <TextField
          id="outlined-basic"
          type="password"
          label="Password"
          variant="outlined"
          value={password}
          onChange={changePassword}
        />
        <TextField
          id="outlined-basic"
          type="password"
          label="Confirm Password"
          variant="outlined"
          value={confirmPassword}
          onChange={changeConfirmPassword}
        />
        <span>
          <Button
            type="submit"
            variant="contained"
            onClick={() => submitSignup}
          >
            Register
          </Button>
          <Button variant="contained" color="primary" onClick={loginHandler}>
            Login Instead!
          </Button>
        </span>
      </form>
    </div>
  );
};

export default SignUp;

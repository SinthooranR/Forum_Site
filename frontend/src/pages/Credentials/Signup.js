import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { MainContext } from "../../main_context";
import Input from "../../components/General/Input/Input";
import Button from '../../components/General/Button/Button';
import classes from "./Signup.module.css";

const SignUp = (props) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const auth = useContext(MainContext);
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
        <Input
          type="text"
          placeholder="Enter Username"
          value={username}
          onChange={changeUsername}
        />
        <Input
          type="text"
          placeholder="Enter Email"
          value={email}
          onChange={changeEmail}
        />
        <Input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={changePassword}
        />
        <Input
          type="text"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={changeConfirmPassword}
        />

        <span>
        <Button type="submit" buttonLabel="Verify and SignUp" color="dark" disabled={!(username && email && password && confirmPassword)} onClick={() => submitSignup}/>
        </span>
      </form>
    </div>
  );
};

export default SignUp;

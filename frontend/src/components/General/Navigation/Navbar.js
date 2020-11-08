import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import NavItem from "./NavItem";
import logo from "../../../assets/logo.png";
import Button from "@material-ui/core/Button";

import { MainContext } from "../../../main_context";

import classes from "./Navbar.module.css";

const Navbar = (props) => {
  const auth = useContext(MainContext);
  const history = useHistory();

  const loginHandler = (event) => {
    history.push("/login");
    event.preventDefault();
  };


  const logoutHandler = (event) => {
    auth.logout();
    history.push("/");
    event.preventDefault();
  };

  const signupHandler = (event) => {
    history.push("/signup");
    event.preventDefault();
  };

  const homeHandler = (event) => {
    history.push("/");
    event.preventDefault();
  };

  let navButtons;

  if (!auth.loggedIn) {
    navButtons = (
      <React.Fragment>
        <Button
          variant="contained"
          style={{ marginRight: "5px" }}
          onClick={loginHandler}
        >
          Login
        </Button>
        <Button variant="contained" color="primary" onClick={signupHandler}>
          SignUp
        </Button>
      </React.Fragment>
    );
  } else {
    navButtons = (
      <Button
        variant="contained"
        style={{ marginRight: "5px" }}
        onClick={logoutHandler}
      >
        Logout
      </Button>
    );
  }

  return (
    <div className={classes.Navbar}>
      <img src={logo} onClick={homeHandler} />
      <span>{navButtons}</span>
    </div>
  );
};
export default Navbar;

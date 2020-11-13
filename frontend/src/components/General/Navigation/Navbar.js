import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import NavItem from "./NavItem";
import logo from "../../../assets/logo.png";
// import Button from "@material-ui/core/Button";
import Button from "../Button/Button";
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

  const themeSwitchHandler = () => {
    auth.setTheme();
  };

  let navColor
  if (auth.themeSwitch === false) {
    navColor = classes.LightNav;
  } else {
    navColor = classes.DarkNav;
  }

  const homeHandler = (event) => {
    history.push("/");
    event.preventDefault();
  };

  const createPostHandler = (event) => {
    history.push("/createPost");
    event.preventDefault();
  };

  let navButtons;

  if (!auth.loggedIn) {
    navButtons = (
      <React.Fragment>
        <Button
          type="submit"
          buttonLabel="Login"
          color="dark"
          onClick={loginHandler}
        />
        <Button buttonLabel="Register" color="light" onClick={signupHandler} />
      </React.Fragment>
    );
  } else {
    navButtons = (
      <React.Fragment>
        <Button
          type="submit"
          buttonLabel="Create Post"
          color="dark"
          onClick={createPostHandler}
        />
        <Button buttonLabel="Logout" color="light" onClick={logoutHandler} />
      </React.Fragment>
    );
  }

  return (
    <div className={[classes.Navbar, navColor].join(" ")}>
      <img src={logo} onClick={homeHandler} />
      {auth.loggedIn && (
        <span className={classes.Links}>
          <NavItem exact to="/" routeName="Home" />
          <NavItem to="/myPosts" routeName="My Posts" />
        </span>
      )}
      <span>
        {navButtons}{" "}
        <Button
          buttonLabel="Switch Theme"
          color="dark"
          onClick={themeSwitchHandler}
        />
      </span>
    </div>
  );
};
export default Navbar;

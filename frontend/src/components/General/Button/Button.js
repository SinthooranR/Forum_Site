import React, { useContext } from "react";
import classes from "./Button.module.css";
import {MainContext} from '../../../main_context';

const Button = (props) => {
  const themeContext = useContext(MainContext);
    let buttonColor = undefined;
  switch (themeContext.themeSwitch) {
    case false:
      buttonColor = classes.Light;
      break;

    case true:
      buttonColor = classes.Dark;
      break;

    default:
  }

  return (
    <button
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}
      className={[classes.Button, buttonColor].join(" ")}
      style={props.style}
    >
      {props.buttonLabel}
    </button>
  );
};

export default Button;

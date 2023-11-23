import React, { useContext } from "react";

import { MainContext } from "../../../main_context";
import WbSunnyIcon from "@material-ui/icons/WbSunny";
import NightsStayIcon from "@material-ui/icons/NightsStay";

import classes from "./Button.module.css";
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
    <React.Fragment>
      {props.icon ? (
        <React.Fragment>
          {!themeContext.themeSwitch ? (
            <WbSunnyIcon
              onClick={props.onClick}
              fontSize="large"
              className={classes.Icon}
            />
          ) : (
            <NightsStayIcon
              onClick={props.onClick}
              fontSize="large"
              className={classes.Icon}
            />
          )}
        </React.Fragment>
      ) : (
        <button
          type={props.type}
          onClick={props.onClick}
          disabled={props.disabled}
          className={[classes.Button, buttonColor].join(" ")}
          style={props.style}
        >
          {props.buttonLabel}
        </button>
      )}
    </React.Fragment>
  );
};

export default Button;

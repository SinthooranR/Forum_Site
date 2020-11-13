import React, { useContext } from "react";
import { MainContext } from "../../../main_context";
import classes from "./Input.module.css";

const Input = (props) => {
  const inputContext = useContext(MainContext);
  let inputTheme;

  if (!inputContext.themeSwitch) {
    inputTheme = classes.LightInput;
  } else {
    inputTheme = classes.DarkInput;
  }

  let input = (
    <input
      className={inputTheme}
      type={props.type}
      placeholder={props.placeholder}
      onChange={props.onChange}
      value={props.value}
    />
  );
  let textarea = (
    <textarea
      className={inputTheme}
      type="text"
      placeholder={props.placeholder}
      onChange={props.onChange}
      value={props.value}
      rows={props.rows}
    >
      {props.paragraph}{" "}
    </textarea>
  );

  return (
    <div className={classes.Input}>{props.multiLine ? textarea : input}</div>
  );
};

export default Input;

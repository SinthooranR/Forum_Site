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
      className={[classes.Input, inputTheme].join(" ")}
      type="text"
      placeholder={props.placeholder}
      onChange={props.onChange}
      value={props.value}
      rows={props.rows}
    >
      {props.paragraph}{" "}
    </textarea>
  );

  return <React.Fragment>{props.multiLine ? textarea : input}</React.Fragment>;
};

export default Input;

import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { MainContext } from "../../main_context";
import { makeStyles } from '@material-ui/core/styles';
import classes from "./CreatePost.module.css";


const CreateForm = (props) => {
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [paragraph, setParagraph] = useState("");

  const changeTitle = (event) => {
    setTitle(event.target.value);
  };
  const changeParagraph = (event) => {
    setParagraph(event.target.value);
  };

  const cancelCreatePost = (event) => {
    history.push("/");
    event.preventDefault();
  };

  const submitPost = (event) => {
    alert(`${title}, ${paragraph}`);
    console.log(title, paragraph);
    history.push("/");
    event.preventDefault();
  };

  return (
    <div className={classes.Post}>
      <h2>Enter Post Below</h2>
      <form noValidate autoComplete="off" onSubmit={submitPost}>
        <TextField
          id="outlined-basic"
          label="Enter Username"
          variant="outlined"
          color="primary"
          value={title}
          onChange={changeTitle}
        />
        <TextField
          id="outlined-multiline-static"
          label="Enter Paragraph"
          multiline
          rows={10}
          value={paragraph}
          onChange={changeParagraph}
          variant="outlined"
        />
        <span>
          <Button variant="contained" onClick={cancelCreatePost}>
            CANCEL
          </Button>
          <Button variant="contained" color="primary" onClick={submitPost}>
            SUBMIT POST
          </Button>
        </span>
      </form>
    </div>
  );
};

export default CreateForm;

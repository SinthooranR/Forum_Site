import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { MainContext } from "../../main_context";
import { makeStyles } from '@material-ui/core/styles';
// import classes from "./CreatePost.module.css";

const useStyles = makeStyles({
    root: {
        display: "flex",
        flexDirection: "column",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        width: "50%",
        marginLeft:  "25%",
        marginTop: "2.5%"
    },
    input:{
        border:{
            marginBottom: "2%"
        },
        text:{

        }
    }
  });

const CreateForm = (props) => {
  const classes = useStyles();
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
    <div className={classes.root}>
      <h2>Enter Post Below</h2>
      <form noValidate autoComplete="off" onSubmit={submitPost} className={classes.form}>
        <TextField
          id="outlined-basic"
          label="Username"
          variant="outlined"
          color="primary"
          value={title}
          onChange={changeTitle}
          className={classes.input.border}
        />
        <TextField
          id="outlined-multiline-static"
          label="Multiline"
          multiline
          rows={10}
          InputProps={{
            classes: {
              root: classes.root,
            },
          }}
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

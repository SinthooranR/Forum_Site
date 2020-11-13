import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { MainContext } from "../../main_context";
import Input from "../../components/General/Input/Input";
import Button from "../../components/General/Button/Button";
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
        <Input
          type="text"
          placeholder="Enter Title"
          value={title}
          onChange={changeTitle}
        />
        <Input
          multiLine
          rows={10}
          type="text"
          placeholder="Enter Paragraph"
          value={paragraph}
          onChange={changeParagraph}
        />

        <span>
          <Button
            type="submit"
            buttonLabel="Submit Post"
            color="dark"
            onClick={() => submitPost}
          />
          <Button
            buttonLabel="Cancel"
            color="light"
            onClick={cancelCreatePost}
          />
        </span>
      </form>
    </div>
  );
};

export default CreateForm;

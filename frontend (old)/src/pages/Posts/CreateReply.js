import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { MainContext } from "../../main_context";
import Input from "../../components/General/Input/Input";
import Button from "../../components/General/Button/Button";
import axios from "axios";
import classes from "./CreatePost.module.css";

const ReplyToPost = (props) => {
  const mainContext = useContext(MainContext);
  const history = useHistory();
  const [paragraph, setParagraph] = useState("");
  const [author, setAuthor] = useState("");

  const changeParagraph = (event) => {
    setParagraph(event.target.value);
  };

  const cancelCreatePost = (event) => {
    history.push("/");
    event.preventDefault();
  };

  useEffect(() => {
    const fetchData = async () => {
      const httpResult = await axios.get(
        `http://localhost:5000/api/users/${mainContext.userId}`
      );
      setAuthor(httpResult.data.users.username);
      console.log(author);
    };

    fetchData();
  }, [author, mainContext.userId]);

  const submitReply = async (event) => {
    event.preventDefault();
    await axios
      .post("http://localhost:5000/api/posts/createReply", {
        paragraph: paragraph,
        author: author,
        postID: mainContext.postId,
        userID: mainContext.userId,
      })
      // IF THE PAGE RERENDERS AFTER CREATING COMMENT THE .then() out
      .then((response) => {
        console.log(response);
        // alert("Hi", author);
        // userContext.login(response.data.users.id);
        // history.push("/")
      })
      .then((response) => {
        console.log(response);
        // alert(response.data.users.userID);
        // auth.login(response.data.user.id);
        event.preventDefault();
      })
      .catch((error) => {
        history.push("/authentication"); //ERROR REDIRECT TEST
        console.log(error);
      });
    history.push("/"); //redirects the user back to main page
  };

  return (
    <div className={classes.Post}>
      <h2>Enter Reply Below {author}</h2>
      <form noValidate autoComplete="off" onSubmit={submitReply}>
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
            onClick={() => submitReply}
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

export default ReplyToPost;

import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { MainContext } from "../../main_context";
import ForumPost from "../../components/ForumPost/ForumPost";
import Button from "../../components/General/Button/Button";
import axios from "axios";

const UserHome = (props) => {
  const history = useHistory();
  const [posts, setPosts] = useState([]);
  const [name, setName] = useState("");
  const mainContext = useContext(MainContext);

  let buttonLabel;
  let introMessage;

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`http://localhost:5000/api/posts/getPosts`)
        .then(function (response) {
          console.log(response);
          setPosts(response.data.posts);
        })
        .catch((error) => {
          // history.push("/authentication"); //ERROR REDIRECT TEST
          console.log(error);
        });
    };

    const fetchName = async () => {
      const httpResult = await axios.get(
        `http://localhost:5000/api/users/${mainContext.userId}`
      );
      setName(httpResult.data.users.name);
      console.log(name);
    };

    fetchData();
    fetchName();

    // NEEDS TO BE FIXED
    // adding posts causes an infinite request loop
  }, [name, mainContext.userId]);

  const replyForm = (postID) => {
    if (mainContext.loggedIn) {
      mainContext.usePost(postID);
      history.push("/createReply");
    } else {
      history.push("/login");
    }
  };

  const viewFullPost = (postID) => {
    mainContext.usePost(postID);
    history.push("/viewPost");
  };

  if (mainContext.loggedIn) {
    buttonLabel = "Reply";
    introMessage = `Welcome ${name}`;
  } else {
    buttonLabel = "Sign In to Reply";
    introMessage = "Welcome to the Mock Forum";
  }

  return (
    // <ForumPost author="Bob" title="YO" post="YO MY NAME IS BOB" date="11-20-2020" />
    <div>
      <h2>{introMessage}</h2>
      {posts.map((post) => (
        <React.Fragment key={post.id}>
          <ForumPost
            forumPost
            author={post.author}
            title={post.title}
            post={post.paragraph}
            onClick={() => viewFullPost(post.id)}
            style={{ width: "40%", marginLeft: "20%" }}
          />

          <Button
            buttonLabel={buttonLabel}
            onClick={() => replyForm(post.id)}
            style={{ marginLeft: "25%", marginTop: "0.5%" }}
          />
        </React.Fragment>
      ))}
    </div>
  );
};

export default UserHome;

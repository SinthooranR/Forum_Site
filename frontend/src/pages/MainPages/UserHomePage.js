import React, { useState, useEffect, useContext } from "react";
import {useHistory} from 'react-router-dom';
import {MainContext} from '../../main_context';
import ForumPost from "../../components/ForumPost/ForumPost";
import Button from '../../components/General/Button/Button';
import axios from "axios";

const UserHome = (props) => {
  const history = useHistory();
  const [posts, setPosts] = useState([]);
  const postContext = useContext(MainContext);

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`http://localhost:5000/api/posts/getPosts`)
        .then(function (response) {
            console.log(response)
          setPosts(response.data.posts);
        })
        .catch((error) => {
          // history.push("/authentication"); //ERROR REDIRECT TEST
          console.log(error);
        });
    };

    fetchData();

    // NEEDS TO BE FIXED
    // adding posts causes an infinite request loop
  }, []);

  const replyForm = (postID) => {
    postContext.usePost(postID);
    history.push('/createReply');
}


const viewFullPost = (postID) => {
  postContext.usePost(postID);
  history.push('/viewPost');
}

  return (
    // <ForumPost author="Bob" title="YO" post="YO MY NAME IS BOB" date="11-20-2020" />
    <div>
      {posts.map((post) => (
        <React.Fragment key={post.id}>
        <div onClick={() => viewFullPost(post.id)}><ForumPost forumPost author={post.author} title={post.title} post={post.paragraph}/></div>
        <Button
            buttonLabel="Reply"
            onClick={() => replyForm(post.id)}
            style={{marginLeft: "25%", marginTop: "0.5%"}}
          />
        </React.Fragment>
        
      ))}
    </div>
  );
};

export default UserHome;

// GOT TO GRAB POSTS BY THEIR ID in BACKEND FIRST :D

import React, { useContext, useEffect, useState } from "react";
import { MainContext } from "../../main_context";
import Button from "../../components/General/Button/Button";
import ForumPost from "../../components/ForumPost/ForumPost";
import axios from "axios";

const FullPost = (props) => {
  const mainContext = useContext(MainContext);
  const [replies, setReplies] = useState([]);
  const [post, setPost] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const httpResult = await axios.get(
        `http://localhost:5000/api/posts/${mainContext.postId}`
      );
      setPost(httpResult.data.posts);
      // console.log(post);
    };

    const fetchData2 = async () => {
      const httpResult = await axios.get(
        `http://localhost:5000/api/posts/getReplies/${mainContext.postId}`
      );
      // . then((response) => {
      //   console.log(response);
      // })

      setReplies(httpResult.data.posts);
      console.log(replies);
    };

    fetchData();
    fetchData2();
  }, [mainContext.postId]);

  return (
    <div>
      <ForumPost
        author={post.author}
        title={post.title}
        post={post.paragraph}
        postView
      />
      <div>
        <div>
          {replies.map((reply) => (
            <ForumPost
              key={reply.id}
              reply
              author={reply.author}
              reply={reply.paragraph}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FullPost;

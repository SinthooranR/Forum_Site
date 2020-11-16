import React, { useState, useEffect } from "react";
import ForumPost from "../../components/ForumPost/ForumPost";
import axios from "axios";

const UserHome = (props) => {
  const [posts, setPosts] = useState([]);

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

  return (
    // <ForumPost author="Bob" title="YO" post="YO MY NAME IS BOB" date="11-20-2020" />
    <div>
      {posts.map((post) => (
        <div key={post.id}><ForumPost  author={post.author} title={post.title} post={post.paragraph}/></div>
      ))}
    </div>
  );
};

export default UserHome;

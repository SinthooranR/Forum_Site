import React from 'react';
import classes from './ForumPost.module.css'

const ForumPost = (props) => {
    return (
        <div className={classes.Post}>
            <p>{props.author}</p>
            <h2>{props.title}</h2>
            <p>{props.post}</p>
        </div>
    )
}

export default ForumPost;
import React from 'react';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import classes from './ForumPost.module.css'

const ForumPost = (props) => {
    return (
        // <div className={classes.Post}>
        //     <p>{props.author}</p>
        //     <h2>{props.title}</h2>
        //     <p>{props.post}</p>
        // </div>
        <Card className={classes.Post} variant="outlined">
            <CardContent>
                <Typography color="textSecondary" gutterBottom>
                    {props.title}
                </Typography>
                <Typography color="textSecondary" style={{ display: "flex", justifyContent: "space-between" }}>
                    <p>Posted by{props.author}</p>
                    <p>On {props.date}</p>
                </Typography>
                <Typography variant="body2" component="p">
                    {props.post}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Reply</Button>
            </CardActions>
        </Card>
    )
}

export default ForumPost;
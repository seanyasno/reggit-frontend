import {Card, Typography, Divider, makeStyles} from '@material-ui/core';
import React, {useEffect, useState} from 'react';
import IPost from '../../../models/post';
import IPostProps from './post-props';
import {Voting} from '../index';

const useStyles = makeStyles({
    card: {
        margin: 'auto',
        padding: '0.6em 1em',
        textAlign: 'start',
        borderRadius: '1em'
    },
    author: {
        fontWeight: 'lighter',
    },
    content: {
        fontWeight: 'normal'
    },
    divider: {
        margin: '0.5em 0'
    }
});

const Post = (props: IPostProps) => {
    const {postId, getPostById} = props;
    const [post, setPost] = useState<IPost>({
        author: '',
        votes: 0,
        id: '',
        content: ''
    });
    const classes = useStyles(props);

    useEffect(() => {
        getPostById(postId).then(postData => {
            setPost(postData);
        })
    }, [postId, getPostById]);

    const setVotes: (votes: number) => void = (updatedVotes) => {
        setPost({
            ...post, votes: updatedVotes
        });
    }

    return(
        <Card className={classes.card} elevation={3}>
            <Typography className={classes.author} variant={'body2'}>{post?.author}</Typography>
            <Typography className={classes.content} variant={'body1'}>{post?.content}</Typography>
            <Divider className={classes.divider}/>
            <Voting postId={postId} votes={post?.votes || 0} setVotes={setVotes}/>
        </Card>
    );
}

export default Post;
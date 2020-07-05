import {Card, Typography, Divider, makeStyles} from '@material-ui/core';
import config from '../../../conf/local-config.json';
import React, {useEffect, useState} from 'react';
import {useCardStyle} from '../../../constants';
import IPost from '../../../models/post';
import IPostProps from './post-props';
import {Voting} from '../index';
import axios from 'axios';

const useStyles = makeStyles({
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
    const {postId} = props;
    const classes = useStyles(props);
    const cardStyle = useCardStyle(props);
    const [post, setPost] = useState<IPost>({
        id: '',
        author: '',
        content: '',
        votes: 0
    });

    const setVotes = (updatedVotes: number) => {
        setPost({
            ...post,
            votes: updatedVotes
        });
    }

    useEffect(() => {
        const url = config.SERVER_URL + ':' + config.SERVER_PORT + config.ROUTES.POST.GET_POST_BY_ID;
        axios.get(url + postId).then(response => {
            const post = response.data;
            setPost(post);
        });
    }, [postId]);

    return(
        <Card className={cardStyle.style} elevation={3}>
            <Typography className={classes.author} variant={'body2'}>{post?.author}</Typography>
            <Typography className={classes.content} variant={'body1'}>{post?.content}</Typography>
            <Divider className={classes.divider}/>
            <Voting postId={post.id} votes={post?.votes || 0} setVotes={setVotes}/>
        </Card>
    );
}

export default Post;
import {Card, Typography, Divider, makeStyles} from '@material-ui/core';
import config from '../../../conf/local-config.json';
import React, {useEffect, useState} from 'react';
import {useCardStyle} from '../../../constants';
import { useHistory } from 'react-router-dom';
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
    const {postId, postData, canOpenInNewPage} = props;
    const classes = useStyles(props);
    const history = useHistory();
    const cardStyle = useCardStyle(props);
    const [post, setPost] = useState<IPost>();

    const setVotes = (updatedVotes: number) => {
        if (post) {
            setPost({
                ...post,
                votes: updatedVotes
            });
        }
    }

    const openPostInNewPage = () => {
        if (canOpenInNewPage) {
            history.push(`/post/${postId}`);
        }
    }

    useEffect(() => {
        if (postData) {
            setPost(postData);
        } else {
            const url = config.SERVER_URL + ':' + config.SERVER_PORT + config.ROUTES.POST.GET_POST_BY_ID;
            axios.get(url + postId).then(response => {
                const post = response.data;
                setPost(post);
            });
        }
    }, [postId, postData]);

    return(
        <Card className={cardStyle.style} elevation={3}>
            <div onClick={() => openPostInNewPage()}>
                <Typography className={classes.author} variant={'body2'}>{post?.user.profile.firstName} {post?.user.profile.lastName}</Typography>
                <Typography className={classes.content} variant={'body1'}>{post?.content}</Typography>
            </div>
            <Divider className={classes.divider}/>
            <Voting postId={post?.id || ''} votes={post?.votes || 0} setVotes={setVotes}/>
        </Card>
    );
}

export default Post;
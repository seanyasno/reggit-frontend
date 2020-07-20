import CreateComment from '../../components/create-comment/create-comment';
import IPostPageParams from './post-page-params';
import React, {useEffect, useState} from 'react';
import IComment from '../../../models/comment';
import Post from '../../components/post/post';
import {makeStyles} from '@material-ui/core';
import {useParams} from 'react-router-dom';
import Config from '../../../conf/Config';
import {Comment} from '../../components';
import axios from 'axios';

const useStyles = makeStyles({
    post: {
        margin: 'auto',
        padding: '1em 0',
    }
});

const PostPage = () => {
    const classes = useStyles();
    const params = useParams<IPostPageParams>();
    const {postId} = params;
    const [comments=[], setComments] = useState<Array<IComment>>();

    useEffect(() => {
        const fetchComments = async () => {
            const url = Config.getInstance().getServerUrl() + Config.getInstance().getConfiguration().ROUTES.COMMENT.GET_ALL_BY_POST_ID + postId;
            const response = await axios.get(url);
            return response.data;
        }
        fetchComments().then(comments => {
            setComments(comments);
        });
    }, [postId]);

    return (
        <div>
            <div className={classes.post}>
                <Post canOpenInNewPage={false} postId={postId || ''} postData={undefined}/>
                <CreateComment postId={postId || ''}/>
                {comments?.map((comment, index) => (<Comment key={index} comment={comment}/>))}
            </div>
        </div>
    );
}

export default PostPage;
import config from '../../../conf/local-config.json';
import IPostPageParams from './post-page-params';
import {makeStyles} from '@material-ui/core';
import {useParams} from 'react-router-dom';
import IPost from '../../../models/post';
import {Post} from '../../components';
import React from 'react';
import axios from 'axios';

const useStyles = makeStyles({
    post: {
        margin: 'auto',
        padding: '1em 0',
        maxWidth: '50%',
        minWidth: '300px',
    }
});

const PostPage = () => {
    const classes = useStyles();
    const params = useParams<IPostPageParams>();
    const url = config.SERVER_URL + ':' + config.SERVER_PORT + config.ROUTES.POST.GET_POST_BY_ID;

    const fetchPost = async (postId: string): Promise<IPost> => {
        const response = await axios.get(url + postId);
        return await response.data;
    }

    return (
        <div>
            <div className={classes.post}>
                <Post postId={params.postId || ''} getPostById={fetchPost}/>
            </div>
        </div>
    );
}

export default PostPage;
import config from '../../../conf/local-config.json';
import IPostPageParams from './post-page-params';
import {useParams} from 'react-router-dom';
import IPost from '../../../models/post';
import {Post} from '../../components';
import React from 'react';
import axios from 'axios';

const PostPage = () => {
    const params = useParams<IPostPageParams>();
    const url = config.SERVER_URL + ':' + config.SERVER_PORT + config.ROUTES.POST.GET_POST_BY_ID;

    const fetchPost = async (postId: string): Promise<IPost> => {
        const response = await axios.get(url + postId);
        return await response.data;
    }

    return (
        <div>
            <Post postId={params.postId || ''} getPostById={fetchPost}/>
        </div>
    );
}

export default PostPage;
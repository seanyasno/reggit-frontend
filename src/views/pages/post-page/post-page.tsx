import IPostPageParams from './post-page-params';
import {useParams} from 'react-router-dom';
import {Post} from '../../components';
import React from 'react';

const PostPage = () => {
    const params = useParams<IPostPageParams>();

    return (
        <div>
            <Post postId={params.postId || ''}/>
        </div>
    );
}

export default PostPage;
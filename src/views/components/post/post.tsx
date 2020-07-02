import React, {useEffect, useState} from 'react';
import IPost from '../../../models/post';
import IPostProps from './post-props';

const Post = (props: IPostProps) => {
    const {postId, getPostById} = props;
    const [post, setPost] = useState<IPost>();

    useEffect(() => {
        getPostById(postId).then(postData => {
            setPost(postData);
        })
    }, [postId, getPostById]);

    return(
        <div>
            <div>Author: {post?.author}</div>
            <div>Content: {post?.content}</div>
        </div>
    );
}

export default Post;
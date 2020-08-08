import React, {useContext, useEffect, useState} from 'react';
import {AuthenticationContext} from '../../../contexts';
import {PostingController} from '../../../controllers';
import {useHistory} from 'react-router-dom';
import IPost from '../../../models/post';
import IPostProps from './post-props';
import PostView from './post-view';

const Post: React.FunctionComponent<IPostProps> = (props) => {
    const {postId, postData, canOpenInNewPage} = props;
    const {user} = useContext(AuthenticationContext);
    const history = useHistory();
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

    const removePost = async () => {
        try {
            await PostingController.removePostById(postId);
            setPost({
                id: '',
                userId: '',
                user: {
                    id: '',
                    username: '',
                    profile: {
                        firstName: '[removed]',
                        lastName: ''
                    }
                },
                votes: 0,
                content: '[removed]'
            });
        } catch (error) {
            alert("Couldn't delete post");
        }
    }

    useEffect(() => {
        let mounted = true;
        if (postData && mounted) {
            setPost(postData);
        } else {
            PostingController.getPostById(postId).then(post => {
                setPost(post);
            });
        }
        return () => {
            mounted = false;
        }
    }, [postId, postData]);

    return (
        <div onClick={openPostInNewPage}>
            <PostView user={user} post={post} removePost={removePost} setVotes={setVotes}/>
        </div>
    );
}

export default Post;
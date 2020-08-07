import {AuthenticationContext} from '../../../contexts';
import {PostingController} from '../../../controllers';
import ICreatePostProps from './create-post-props';
import React, {useContext, useState} from 'react';
import CreatePostView from './create-post-view';
import IForum from '../../../models/forum';

const CreatePost: React.FunctionComponent<ICreatePostProps> = (props) => {
    const {onCancel, onDone} = props;
    const {user} = useContext(AuthenticationContext);
    const [content, setContent] = useState('');
    const [selectedForum, setSelectedForum] = useState<IForum>();

    const uploadPost = async () => {
        if (!user) {
            return;
        }

        if (!content) {
            alert("Can't post an empty post.");
            return;
        }

        if (selectedForum?.id) {
            const newPost = await PostingController.createNewPost(user.id, content, selectedForum.id);
            onDone(newPost);
        } else {
            alert('Please select a forum.');
        }
    }

    return (
        <CreatePostView user={user} uploadPost={uploadPost} onCancel={onCancel} setContent={setContent} setSelectedForum={setSelectedForum}/>
    );
}

export default CreatePost;
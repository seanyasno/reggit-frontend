import PostingAction from '../../../stores/posting/posting-action';
import React, {useEffect} from 'react';
import IPostProps from './post-props';
import {connect} from 'react-redux';

const Post = (props: IPostProps) => {
    const {postId, getPostById} = props;

    useEffect(() => {
        getPostById(postId).then(response => {
            console.log(response);
        });
    })

    return(
        <div>
            <div>Author:</div>
            <div>Content:</div>
        </div>
    );
}

const getPostById = PostingAction.getPostById;
export default connect(null, {getPostById})(Post);
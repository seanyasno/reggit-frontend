import IPostPageParams from './post-page-params';
import {makeStyles} from '@material-ui/core';
import {useParams} from 'react-router-dom';
import {Post} from '../../components';
import React from 'react';

const useStyles = makeStyles({
    post: {
        margin: 'auto',
        padding: '1em 0',
    }
});

const PostPage = () => {
    const classes = useStyles();
    const params = useParams<IPostPageParams>();

    return (
        <div>
            <div className={classes.post}>
                <Post canOpenInNewPage={false} postId={params.postId || ''} postData={undefined}/>
            </div>
        </div>
    );
}

export default PostPage;
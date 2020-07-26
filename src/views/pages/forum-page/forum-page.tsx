import {ForumController} from '../../../controllers';
import IForumPageParams from './forum-page-params';
import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core';
import {useParams} from 'react-router-dom';
import IPost from '../../../models/post';
import {Post} from '../../components';

const useStyles = makeStyles({
    post: {
        margin: '1.5em 0 0 0'
    }
});

const ForumPage: React.FunctionComponent = () => {
    const params = useParams<IForumPageParams>();
    const [posts, setPosts] = useState<Array<IPost>>([]);
    const classes = useStyles();

    useEffect(() => {
        let mounted = true;
        ForumController.getPostsByForumId(params.forumId || '').then(allPosts => {
           if (mounted) {
               setPosts(allPosts);
           }
        });

        return () => {
            mounted = false;
        }
    }, [params.forumId])

    return (
        <div>
            {
                posts.map((post, index) => (
                    <div className={classes.post} key={index}>
                        <Post canOpenInNewPage={true} postId={post.id} postData={post}/>
                    </div>
                ))
            }
        </div>
    );
}

export default ForumPage;
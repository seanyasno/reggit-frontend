import {Dialog, makeStyles} from '@material-ui/core';
import {ForumController} from '../../../controllers';
import IForumPageParams from './forum-page-params';
import {CreatePost, Post} from '../../components';
import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {ForumDetails} from './components';
import IPost from '../../../models/post';

const useStyles = makeStyles({
    post: {
        margin: '1.5em 0 0 0'
    },
    dialog: {
        borderRadius: '1em',
    }
});

const ForumPage: React.FunctionComponent = () => {
    const params = useParams<IForumPageParams>();
    const [showDialog, setShowDialog] = useState(false);
    const [posts, setPosts] = useState<Array<IPost>>([]);
    const classes = useStyles();

    const onNewCreatedPost = (newPost: IPost) => {
        setShowDialog(false);
        setPosts([...posts, newPost]);
    }

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
        <div style={{margin: '1em 0'}}>
            <ForumDetails forumId={params.forumId}/>
            <Dialog style={{maxWidth: '30%', margin: 'auto'}} PaperProps={{className: classes.dialog}} open={showDialog}
                    onClose={() => setShowDialog(false)}>
                <CreatePost selectForum={true} onCancel={() => setShowDialog(false)} onDone={onNewCreatedPost}/>
            </Dialog>
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
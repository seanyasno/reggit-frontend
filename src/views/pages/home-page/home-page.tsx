import {Dialog, makeStyles, Card, Typography} from '@material-ui/core';
import {CreatePost, Post} from '../../components';
import React, {useEffect, useState} from 'react';
import {useCardStyle} from '../../../constants';
import IPost from '../../../models/post';
import axios from 'axios';
import config from '../../../conf/local-config.json';

const useStyles = makeStyles({
    body: {
        margin: '1em 0',
    },
    dialog: {
        borderRadius: '1em',
    }
})

const HomePage = () => {
    const [showDialog, setShowDialog] = useState(false);
    const classes = useStyles();
    const cardStyle = useCardStyle();

    const [posts, setPosts] = useState<Array<IPost>>([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const url = config.SERVER_URL + ':' + config.SERVER_PORT + config.ROUTES.POST.ALL_POSTS;
            const posts = await axios.get(url);
            setPosts(posts.data);
        }

        fetchPosts();
    }, []);

    const fetchPost = async (postId: string): Promise<IPost> => {
        const url = config.SERVER_URL + ':' + config.SERVER_PORT + config.ROUTES.POST.GET_POST_BY_ID;
        const response = await axios.get(url + postId);
        return await response.data;
    }

    return (
        <div className={classes.body}>
            <Card elevation={2} className={cardStyle.style} style={{borderRadius: '10em'}} onClick={() => setShowDialog(true)}>
                <Typography color={'textSecondary'}>What's on your mind?</Typography>
            </Card>
            <Dialog PaperProps={{className: classes.dialog}} open={showDialog} onClose={() => setShowDialog(false)}>
                <CreatePost username={''} onCancel={() => setShowDialog(false)}/>
            </Dialog>
            {/*{posts.map(post => (<Post postId={post.id} getPostById={}))}*/}
        </div>
    );
}


export default HomePage;
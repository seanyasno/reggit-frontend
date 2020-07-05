import {Dialog, makeStyles, Card, Typography} from '@material-ui/core';
import config from '../../../conf/local-config.json';
import {CreatePost, Post} from '../../components';
import React, {useEffect, useState} from 'react';
import {useCardStyle} from '../../../constants';
import IPost from '../../../models/post';
import axios from 'axios';

const useStyles = makeStyles({
    body: {
        margin: '1em 0',
    },
    dialog: {
        borderRadius: '1em',
    },
    post: {
        margin: '1.5em 0 0 0'
    }
})

const HomePage = () => {
    const [showDialog, setShowDialog] = useState(false);
    const classes = useStyles();
    const cardStyle = useCardStyle();

    const [posts, setPosts] = useState<Array<IPost>>([]);

    useEffect(() => {
        const url = config.SERVER_URL + ':' + config.SERVER_PORT + config.ROUTES.POST.ALL_POSTS;
        axios.get(url).then(response => {
            const posts = response.data;
            console.log(posts);
            setPosts(posts);
        });
    }, []);

    return (
        <div className={classes.body}>
            <Card elevation={2} className={cardStyle.style} style={{borderRadius: '10em'}}
                  onClick={() => setShowDialog(true)}>
                <Typography color={'textSecondary'}>What's on your mind?</Typography>
            </Card>
            <Dialog PaperProps={{className: classes.dialog}} open={showDialog} onClose={() => setShowDialog(false)}>
                <CreatePost username={''} onCancel={() => setShowDialog(false)}/>
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


export default HomePage;
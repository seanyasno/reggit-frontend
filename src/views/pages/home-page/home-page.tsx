import {List, ListItem, Dialog, makeStyles, Card, Typography} from '@material-ui/core';
import {CreatePost, Post} from '../../components';
import React, {useEffect, useState} from 'react';
import {useCardStyle} from '../../../constants';
import Config from '../../../conf/Config';
import IPost from '../../../models/post';
import axios from 'axios';
import ForumCard from '../../components/forum-card/forum-card';

const useStyles = makeStyles({
    body: {
        margin: '1em 0',
    },
    dialog: {
        borderRadius: '1em',
    },
    post: {
        margin: '1.5em 0 0 0'
    },
    forums: {
        display: 'flex',
        overflowX: 'auto',
        padding: '0',
        paddingBottom: '.75em',
        margin: 'auto',
        marginTop: '1em',
        flexDirection: 'row',
        maxWidth: '30%',
        minWidth: '400px',
    }
});

const HomePage = () => {
    const [showDialog, setShowDialog] = useState(false);
    const [forums, setForums] = useState([]);
    const classes = useStyles();
    const cardStyle = useCardStyle();

    const [posts, setPosts] = useState<Array<IPost>>([]);

    useEffect(() => {
        const url = Config.getInstance().getServerUrl() + Config.getInstance().getConfiguration().ROUTES.POST.ALL_POSTS;
        axios.get(url).then(response => {
            const posts = response.data;
            setPosts(posts);
        });

        const fetchAllForums = async () => {
            const url = Config.getInstance().getServerUrl() + Config.getInstance().getConfiguration().ROUTES.FORUM.GET_ALL_FORUMS;
            const response = await axios.get(url);
            setForums(response.data);
        }

        fetchAllForums();
    }, []);

    const onNewCreatedPost = (newPost: IPost) => {
        setShowDialog(false);
        setPosts([...posts, newPost]);
    }

    const generateForumCards = (): Array<JSX.Element> => {
        const forumCards: Array<JSX.Element> = [];
        forums.map((forum, index) => forumCards.push(<ListItem key={index}><ForumCard
            forum={forum}/></ListItem>));
        return forumCards;
    }

    return (
        <div className={classes.body}>
            <Card elevation={2} className={cardStyle.style} style={{borderRadius: '10em'}}
                  onClick={() => setShowDialog(true)}>
                <Typography color={'textSecondary'}>What's on your mind?</Typography>
            </Card>
            <List className={classes.forums}>
                {generateForumCards()}
            </List>
            <Dialog PaperProps={{className: classes.dialog}} open={showDialog} onClose={() => setShowDialog(false)}>
                <CreatePost user={undefined} onCancel={() => setShowDialog(false)} onDone={onNewCreatedPost}/>
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
import {Card, Typography, Divider, makeStyles, Menu, MenuItem} from '@material-ui/core';
import React, {useContext, useEffect, useState} from 'react';
import {AuthenticationContext} from '../../../contexts';
import {PostingController} from '../../../controllers';
import {useCardStyle} from '../../../constants';
import {useHistory} from 'react-router-dom';
import {MoreVert} from '@material-ui/icons';
import IPost from '../../../models/post';
import IPostProps from './post-props';
import {Voting} from '../index';

const useStyles = makeStyles({
    topSection: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    showMore: {
        fontSize: 'large'
    },
    author: {
        fontWeight: 'lighter',
    },
    content: {
        fontWeight: 'normal'
    },
    divider: {
        margin: '0.5em 0'
    }
});

const Post: React.FunctionComponent<IPostProps> = (props) => {
    const {postId, postData, canOpenInNewPage} = props;
    const {user} = useContext(AuthenticationContext);
    const history = useHistory();
    const classes = useStyles(props);
    const cardStyle = useCardStyle(props);
    const [post, setPost] = useState<IPost>();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

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
            setAnchorEl(null);
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
        if (postData) {
            setPost(postData);
        } else {
            PostingController.getPostById(postId).then(post => {
                setPost(post);
            });
        }
    }, [postId, postData]);

    return (
        <Card className={cardStyle.style} elevation={3}>
            <div className={classes.topSection}>
                <Typography className={classes.author}
                            variant={'body2'}>{post?.user?.profile.firstName} {post?.user?.profile.lastName}</Typography>
                <div>
                    {user?.id === post?.userId && <MoreVert aria-controls={'options-menu'} aria-haspopup={'true'} className={classes.showMore}
                              onClick={handleClick}/>}
                    <Menu
                        id={'options-menu'}
                        open={Boolean(anchorEl)}
                        getContentAnchorEl={null}
                        anchorOrigin={{vertical: "bottom", horizontal: "center"}}
                        transformOrigin={{vertical: "top", horizontal: "center"}}
                        onClose={() => setAnchorEl(null)}
                        anchorEl={anchorEl}>
                        <MenuItem onClick={() => removePost()}>Delete</MenuItem>
                    </Menu>
                </div>
            </div>
            <div onClick={() => openPostInNewPage()}>
                <Typography className={classes.content} variant={'body1'}>{post?.content}</Typography>
            </div>
            <Divider className={classes.divider}/>
            <Voting postId={post?.id || ''} votes={post?.votes || 0} setVotes={setVotes}/>
        </Card>
    );
}

export default Post;
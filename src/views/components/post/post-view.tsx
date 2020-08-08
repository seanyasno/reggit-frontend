import {Card, Divider, makeStyles, Menu, MenuItem, Typography} from '@material-ui/core';
import {useCardStyle} from '../../../constants';
import IPostViewProps from './post-view-props';
import {MoreVert} from '@material-ui/icons';
import {Voting} from '../index';
import React from 'react';

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

const PostView: React.FunctionComponent<IPostViewProps> = (props) => {
    const {user, post, removePost, setVotes} = props;
    const classes = useStyles(props);
    const cardStyle = useCardStyle(props);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    return (
        <Card className={cardStyle.style} elevation={3}>
            <div className={classes.topSection}>
                <Typography className={classes.author}
                            variant={'body2'}>{post?.user?.profile.firstName} {post?.user?.profile.lastName}</Typography>
                <div>
                    {user?.id === post?.userId &&
                    <MoreVert aria-controls={'options-menu'} aria-haspopup={'true'} className={classes.showMore}
                              onClick={handleClick}/>}
                    <Menu
                        id={'options-menu'}
                        open={Boolean(anchorEl)}
                        getContentAnchorEl={null}
                        anchorOrigin={{vertical: "bottom", horizontal: "center"}}
                        transformOrigin={{vertical: "top", horizontal: "center"}}
                        onClose={() => setAnchorEl(null)}
                        anchorEl={anchorEl}>
                        <MenuItem onClick={() => {
                            removePost().then(() => setAnchorEl(null));
                        }}>Delete</MenuItem>
                    </Menu>
                </div>
            </div>
            <Typography className={classes.content} variant={'body1'}>{post?.content}</Typography>
            <Divider className={classes.divider}/>
            <Voting postId={post?.id || ''} votes={post?.votes || 0} setVotes={setVotes}/>
        </Card>
    );
}

export default PostView;

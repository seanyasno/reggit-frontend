import {Card, Typography, makeStyles} from '@material-ui/core';
import {useCardStyle} from '../../../constants';
import ICommentProps from './comment-props';
import React from 'react';

const useStyles = makeStyles({
    root: {
      margin: '1em 0',
    },
    author: {
        fontWeight: 'lighter',
    },
    content: {
        fontWeight: 'normal'
    },
});

const Comment: React.FunctionComponent<ICommentProps> = (props) => {
    const {comment} = props;
    const classes = useStyles(props);
    const cardStyle = useCardStyle();

    return (
        <div className={classes.root}>
            <Card className={cardStyle.style} elevation={2}>
                <Typography
                    className={classes.author}>{`${comment.user.profile.firstName} ${comment.user.profile.lastName}`}</Typography>
                <Typography className={classes.content}>{comment.content}</Typography>
            </Card>
        </div>
    );
}

export default Comment;
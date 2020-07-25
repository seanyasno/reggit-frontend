import {makeStyles, Button, Card, TextField} from '@material-ui/core';
import ICreateCommentProps from './create-comment-props';
import {AuthenticationContext} from '../../../contexts';
import React, {useContext, useState} from 'react';
import {useCardStyle} from '../../../constants';
import CommentingController from '../../../controllers/commenting-controller';

const useStyles = makeStyles({
    root: {
        marginTop: '1em'
    },
    input: {
      marginBottom: '0.6em'
    },
    commentButton: {
        borderRadius: '0.6em'
    }
});

const CreateComment: React.FunctionComponent<ICreateCommentProps> = (props) => {
    const {postId} = props;
    const {user} = useContext(AuthenticationContext);
    const classes = useStyles(props);
    const cardStyle = useCardStyle();
    const [content, setContent] = useState<string>('');

    const createComment = async () => {
        if (!user) return;

        try {
            await CommentingController.createComment(postId, user.id, content);
            setContent('');
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className={classes.root}>
            <Card className={cardStyle.style}>
                <TextField
                    className={classes.input}
                    fullWidth
                    placeholder={'Write what you think here...'}
                    focused
                    multiline
                    onChange={event => setContent(event.target.value)}
                />
                <Button
                    className={classes.commentButton}
                    fullWidth
                    color={'primary'}
                    variant={'contained'}
                    onClick={() => createComment()}
                >Comment</Button>
            </Card>
        </div>
    );
}

export default CreateComment;
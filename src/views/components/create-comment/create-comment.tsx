import {makeStyles, Button, Card, TextField} from '@material-ui/core';
import ICreateCommentProps from './create-comment-props';
import {AuthenticationContext} from '../../../contexts';
import React, {useContext, useState} from 'react';
import {useCardStyle} from '../../../constants';
import Config from '../../../conf/Config';
import axios from 'axios';
import _ from 'lodash';

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
        if (_.isEmpty(content)) {
            alert("Can't create an empty comment.");
            return;
        }

        const url = Config.getInstance().getServerUrl() + Config.getInstance().getConfiguration().ROUTES.COMMENT.CREATE + postId;
        await axios.post(url, {
            userId: user?.id,
            content
        });
        setContent('');
        window.location.reload();
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
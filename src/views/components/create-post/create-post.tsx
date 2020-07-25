import {makeStyles, Card, Button, Divider, Typography, InputBase, Fab} from '@material-ui/core';
import {AuthenticationContext} from '../../../contexts';
import {PostingController} from '../../../controllers';
import ICreatePostProps from './create-post-props';
import React, {useContext, useState} from 'react';
import {useCardStyle} from '../../../constants';
import {Clear} from '@material-ui/icons';

const useStyles = makeStyles({
    titleSection: {
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        textAlign: 'center',
        position: 'relative'
    },
    title: {
        textAlign: 'center',
        fontWeight: 'bold',
        alignSelf: 'center',
    },
    cancelButton: {
        marginLeft: 'auto',
        boxShadow: 'none'
    },
    dummyButton: {
        marginRight: 'auto',
        visibility: 'hidden'
    },
    contentInput: {
        width: '100%',
        margin: '0.4em 0',
        fontSize: 'larger'
    },
    divider: {
        margin: '0.6em 0 0.2em 0'
    },
    postButton: {
        width: '100%',
        borderRadius: '0.6em'
    }
});

const CreatePost: React.FunctionComponent<ICreatePostProps> = (props) => {
    const {onCancel, onDone} = props;
    const {user} = useContext(AuthenticationContext);
    const [content, setContent] = useState('');
    const classes = useStyles(props);
    const cardStyle = useCardStyle(props);

    const uploadPost = async () => {
        if (!user) {
            return;
        }
        const newPost = await PostingController.createNewPost(user.id, content);
        onDone(newPost);
    }

    return (
        <Card className={cardStyle.style}>
            <div className={classes.titleSection}>
                <Fab size={'small'} className={classes.dummyButton}><Clear/></Fab>
                <Typography variant={'h5'} className={classes.title}>Create Post</Typography>
                <Fab onClick={() => onCancel()} size={'small'} className={classes.cancelButton}><Clear/></Fab>
            </div>
            <Divider className={classes.divider}/>
            <InputBase
                className={classes.contentInput}
                placeholder={`What's on your mind, ${user?.profile.firstName}?`}
                multiline
                rows={6}
                autoFocus={true}
                rowsMax={15}
                onChange={event => setContent(event.target.value)}/>
            <Button
                className={classes.postButton}
                variant={'contained'}
                color={'primary'}
                onClick={() => uploadPost()}>Post</Button>
        </Card>
    );
}

export default CreatePost;
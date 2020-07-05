import {makeStyles, Card, Button, Divider, Typography, InputBase, Fab} from '@material-ui/core';
import config from '../../../conf/local-config.json';
import ICreatePostProps from './create-post-props';
import {useCardStyle} from '../../../constants';
import {Clear} from '@material-ui/icons';
import React, {useState} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';

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

const CreatePost = (props: ICreatePostProps) => {
    const {username, onCancel, onDone} = props;
    const [content, setContent] = useState('');
    const classes = useStyles(props);
    const cardStyle = useCardStyle(props);

    const uploadPost = async () => {
        const url = config.SERVER_URL + ':' + config.SERVER_PORT + config.ROUTES.POST.CREATE;
        const response = axios.post(url, {
            author: username,
            content
        });
        const responseData = await response;
        const newPost = responseData.data;
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
                placeholder={`What's on your mind, ${username}?`}
                multiline
                rows={6}
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

const mapStateToProps = (state: any) => {
    return {
        username: state.authentication.user.username
    };
}

export default connect(mapStateToProps, undefined)(CreatePost);
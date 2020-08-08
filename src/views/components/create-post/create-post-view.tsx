import {Button, Card, Divider, Fab, InputBase, makeStyles, Typography} from '@material-ui/core';
import ICreatePostViewProps from './create-post-view-props';
import ForumChips from '../forum-chips/forum-chips';
import {Clear} from '@material-ui/icons';
import React from 'react';

const useStyles = makeStyles({
    card: {
        margin: 'auto',
        padding: '0.8em 1em',
        textAlign: 'start',
        borderRadius: '1em',
        minWidth: '400px',
    },
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
    },
    forums: {
        width: '100%',
        margin: '0.5em 0',
        '& > * > *': {
            margin: '0.25em'
        },
    }
});

const CreatePostView: React.FunctionComponent<ICreatePostViewProps> = (props) => {
    const {user, onCancel, uploadPost, setContent, setSelectedForum, selectForum} = props;
    const classes = useStyles();

    return (
        <Card className={classes.card}>
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
            {
                selectForum && <div className={classes.forums}>
                    <ForumChips setSelectedForum={setSelectedForum}/>
                </div>
            }
            <Button
                className={classes.postButton}
                variant={'contained'}
                color={'primary'}
                onClick={() => uploadPost()}>Post</Button>
        </Card>
    );
}

export default CreatePostView;
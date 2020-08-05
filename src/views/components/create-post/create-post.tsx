import { makeStyles, Chip, Card, Button, Divider, Typography, InputBase, Fab } from '@material-ui/core';
import { AuthenticationContext } from '../../../contexts';
import { ForumController, PostingController } from '../../../controllers';
import ICreatePostProps from './create-post-props';
import React, { useContext, useEffect, useState } from 'react';
import { Clear } from '@material-ui/icons';
import IForum from '../../../models/forum';

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
        '& > *': {
            margin: '0.25em'
        },
    }
});

const CreatePost: React.FunctionComponent<ICreatePostProps> = (props) => {
    const { onCancel, onDone } = props;
    const { user } = useContext(AuthenticationContext);
    const [content, setContent] = useState('');
    const [forums, setForums] = useState<Array<{ value: IForum, selected: boolean }>>([]);
    const classes = useStyles(props);

    const uploadPost = async () => {
        if (!user) {
            return;
        }

        if (!content) {
            alert("Can't post an empty post.");
            return;
        }

        const selectedForum: IForum | undefined = forums.find(forum => forum.selected)?.value;
        if (selectedForum?.id) {
            const newPost = await PostingController.createNewPost(user.id, content, selectedForum.id);
            onDone(newPost);
        } else {
            alert('Please select a forum.');
        }
    }

    const onForumChipSelect = (forumIndex: number, selected: boolean) => {
        setForums((prevForums) =>
            prevForums.map((forum, index) =>
                forum.selected || (forumIndex === index && prevForums.filter(forum => forum.selected).length === 0) ? { ...forum, selected: !selected } : forum
            )
        );
    }

    const generateForumChips = (): Array<JSX.Element> => {
        return forums.map((forum, index) =>
            <Chip
                key={index}
                variant={forum.selected ? 'default' : 'outlined'}
                color={forum.selected ? 'primary' : 'default'}
                label={forum.value.name}
                onClick={() => onForumChipSelect(index, forum.selected)}
            />);
    }

    useEffect(() => {
        let mounted = true;
        ForumController.getAllForums().then(allForums => {
            if (mounted) {
                let forums: Array<{ value: IForum, selected: boolean }> = [];
                allForums.map(forum => forums.push({ value: forum, selected: false }));
                setForums(forums);
            }
        });
        return () => {
            mounted = false;
        }
    }, []);

    return (
        <Card className={classes.card}>
            <div className={classes.titleSection}>
                <Fab size={'small'} className={classes.dummyButton}><Clear /></Fab>
                <Typography variant={'h5'} className={classes.title}>Create Post</Typography>
                <Fab onClick={() => onCancel()} size={'small'} className={classes.cancelButton}><Clear /></Fab>
            </div>
            <Divider className={classes.divider} />
            <InputBase
                className={classes.contentInput}
                placeholder={`What's on your mind, ${user?.profile.firstName}?`}
                multiline
                rows={6}
                autoFocus={true}
                rowsMax={15}
                onChange={event => setContent(event.target.value)} />
            <div className={classes.forums}>
                {generateForumChips()}
            </div>
            <Button
                className={classes.postButton}
                variant={'contained'}
                color={'primary'}
                onClick={() => uploadPost()}>Post</Button>
        </Card>
    );
}

export default CreatePost;
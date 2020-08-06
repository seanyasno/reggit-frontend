import {Card, Typography, Divider, makeStyles} from '@material-ui/core';
import {AuthenticationContext} from '../../../contexts';
import IForumCardProps from './forum-card-props';
import {useHistory} from 'react-router-dom';
import {ForumSubscription} from '../index';
import React, {useContext} from 'react';

const useStyles = makeStyles({
    card: {
        height: '200px',
        width: '150px',
        borderRadius: '1em',
        padding: '0.4em 1em',
    },
    title: {
        fontWeight: 'lighter',
        wordWrap: 'break-word',
        width: '80%'
    },
    topSection: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    join: {
        alignSelf: 'start',
        margin: '0.25em 0',
    }
});

const ForumCard: React.FunctionComponent<IForumCardProps> = (props) => {
    const {forum} = props;
    const {user} = useContext(AuthenticationContext);
    const history = useHistory();
    const classes = useStyles(props);

    return (
        <Card className={classes.card} elevation={3}>
            <div className={classes.topSection}>
                <Typography className={classes.title} noWrap={false} variant={'h6'} onClick={() => {
                    history.push(`/forum/${forum.id}`);
                }}>{forum.name}</Typography>
                <ForumSubscription
                    userId={user?.id || ''}
                    forumId={forum.id || ''}
                />
            </div>
            <div>
                <Divider/>
                <div>
                    <Typography>{forum.description}</Typography>
                </div>
            </div>
        </Card>
    );
}

export default ForumCard;
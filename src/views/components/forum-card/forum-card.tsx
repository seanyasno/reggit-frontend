import {Card, Typography, Divider, makeStyles} from '@material-ui/core';
import {AddBoxRounded} from '@material-ui/icons';
import IForumCardProps from './forum-card-props';
import {useHistory} from 'react-router-dom';
import React from 'react';

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
    const history = useHistory();
    const classes = useStyles(props);

    return (
        <Card className={classes.card} elevation={3} onClick={() => {
            history.push(`/forum/${forum.id}`);
        }}>
            <div className={classes.topSection}>
                <Typography className={classes.title} noWrap={false} variant={'h6'}>{forum.name}</Typography>
                <AddBoxRounded className={classes.join} color={'primary'} onClick={() => alert('nice')}/>
            </div>
            <Divider/>
            <div>
                <Typography>{forum.description}</Typography>
            </div>
        </Card>
    );
}

export default ForumCard;
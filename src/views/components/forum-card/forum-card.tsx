import {Card, Typography, Divider, makeStyles} from '@material-ui/core';
import {AddBoxRounded, DoneRounded} from '@material-ui/icons';
import {AuthenticationContext, SubscriptionContext} from '../../../contexts';
import IForumCardProps from './forum-card-props';
import {useHistory} from 'react-router-dom';
import React, {useContext} from 'react';
import axios from 'axios';
import _ from 'lodash';
import Config from '../../../conf/Config';

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
    const {forum, subscribed = false} = props;
    const {user} = useContext(AuthenticationContext);
    const {forumIds, setForumIds} = useContext(SubscriptionContext);
    const history = useHistory();
    const classes = useStyles(props);

    const subscribe = async () => {
        if (!user || _.isEmpty(user)) return;
        const userId: string = user.id;
        const url: string = Config.getInstance().getServerUrl() + Config.getInstance().getConfiguration().ROUTES.SUBSCRIPTION.CREATE;
        const response = await axios.post(url, {userId, forumId: forum.id});
        if (response.status === 200) {
            setForumIds([...forumIds, forum.id]);
        }
    }

    const unsubscribe = async () => {
        if (!user || _.isEmpty(user)) return;
        const userId: string = user.id;
        const url: string = Config.getInstance().getServerUrl() + Config.getInstance().getConfiguration().ROUTES.SUBSCRIPTION.REMOVE;
        const response = await axios.delete(url,{data: {userId, forumId: forum.id}});
        if (response.status === 200) {
            setForumIds(forumIds.filter(forumId => forumId !== forum.id));
        }
    }

    return (
        <Card className={classes.card} elevation={3}>
            <div className={classes.topSection}>
                <Typography className={classes.title} noWrap={false} variant={'h6'} onClick={() => {
                    history.push(`/forum/${forum.id}`);
                }}>{forum.name}</Typography>
                {
                    subscribed ?
                        <DoneRounded className={classes.join} color={'primary'} onClick={() => unsubscribe()}/> :
                        <AddBoxRounded className={classes.join} color={'primary'} onClick={() => subscribe()}/>
                }
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
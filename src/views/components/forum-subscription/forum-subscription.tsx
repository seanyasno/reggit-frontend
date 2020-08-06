import IForumSubscriptionProps from './forum-subscription-props';
import {AddBoxRounded, DoneRounded} from '@material-ui/icons';
import {SubscriptionContext} from '../../../contexts';
import {makeStyles} from '@material-ui/core';
import Config from '../../../conf/Config';
import React, {useContext} from 'react';
import axios from 'axios';
import _ from 'lodash';

const useStyles = makeStyles({
    join: {
        alignSelf: 'start',
        margin: '0.25em 0',
    }
});

const ForumSubscription: React.FunctionComponent<IForumSubscriptionProps> = (props) => {
    const {userId, forumId} = props;
    const {forumIds = [], setForumIds} = useContext(SubscriptionContext);
    const classes = useStyles();

    const subscribe = async () => {
        if (_.isEmpty(userId) || _.isEmpty(forumId)) return;
        const url: string = Config.getInstance().getServerUrl() + Config.getInstance().getConfiguration().ROUTES.SUBSCRIPTION.CREATE;
        const response = await axios.post(url, {userId, forumId: forumId});
        if (response.status === 200) {
            setForumIds([...forumIds, forumId]);
        }
    }

    const unsubscribe = async () => {
        if (_.isEmpty(userId) || _.isEmpty(forumId)) return;
        const url: string = Config.getInstance().getServerUrl() + Config.getInstance().getConfiguration().ROUTES.SUBSCRIPTION.REMOVE;
        const response = await axios.delete(url, {data: {userId, forumId: forumId}});
        if (response.status === 200) {
            setForumIds(forumIds.filter(id => id !== forumId));
        }
    }

    return (
        <div>
            {
                Boolean(forumIds.find(id => id === forumId)) ?
                    <DoneRounded className={classes.join} color={'primary'} onClick={() => unsubscribe()}/> :
                    <AddBoxRounded className={classes.join} color={'primary'} onClick={() => subscribe()}/>
            }
        </div>
    );
}

export default ForumSubscription;
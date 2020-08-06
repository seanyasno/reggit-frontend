import {AuthenticationContext} from '../../../../../contexts';
import React, {useState, useEffect, useContext} from 'react';
import {ForumController} from '../../../../../controllers';
import {ForumSubscription} from '../../../../components';
import IForumDetailsProps from './forum-details-props';
import {useCardStyle} from '../../../../../constants';
import {makeStyles} from '@material-ui/core/styles';
import {Card, Typography} from '@material-ui/core';
import IForum from '../../../../../models/forum';

const useStyles = makeStyles({
   topSection: {
       display: 'flex',
       justifyContent: 'space-between'
   }
});

const ForumDetails: React.FunctionComponent<IForumDetailsProps> = (props) => {
    const {forumId} = props;
    const cardStyle = useCardStyle();
    const {user} = useContext(AuthenticationContext);
    const [forum, setForum] = useState<IForum>();
    const classes = useStyles();

    useEffect(() => {
        if (!forumId) return;
        let mounted = true;
        ForumController.getForumById(forumId).then(forum => {
            if (mounted) {
                setForum(forum);
            }
        });
        return () => {
            mounted = false;
        }
    }, [forumId])

    return (
        <Card className={cardStyle.style}>
            <div className={classes.topSection}>
                <Typography>{forum?.name}</Typography>
                <ForumSubscription userId={user?.id || ''} forumId={forumId || ''}/>
            </div>
            <Typography>{forum?.description}</Typography>
        </Card>
    );
}

export default ForumDetails;
import { ForumController } from '../../../../../controllers';
import { useCardStyle } from '../../../../../constants';
import IForumDetailsProps from './forum-details-props';
import { Card, Typography } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import IForum from '../../../../../models/forum';

const ForumDetails: React.FunctionComponent<IForumDetailsProps> = (props) => {
    const { forumId } = props;
    const cardStyle = useCardStyle();
    const [forum, setForum] = useState<IForum>();

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
            <Typography>{forum?.name}</Typography>
            <Typography>{forum?.description}</Typography>
        </Card>
    );
}

export default ForumDetails;
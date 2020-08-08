import {ForumController} from '../../../controllers';
import IForumChipsProps from './forum-chips-props';
import React, {useEffect, useState} from 'react';
import IForum from '../../../models/forum';
import {Chip} from '@material-ui/core';

const ForumChips: React.FunctionComponent<IForumChipsProps> = (props) => {
    const {setSelectedForum} = props;
    const [forums, setForums] = useState<Array<{ value: IForum, selected: boolean }>>([]);

    const onForumChipSelect = (forumIndex: number, selected: boolean) => {
        setForums((prevForums) =>
            prevForums.map((forum, index) =>
                forum.selected || (forumIndex === index && prevForums.filter(forum => forum.selected).length === 0) ? {
                    ...forum,
                    selected: !selected
                } : forum
            )
        );
        setSelectedForum(forums[forumIndex].value);
    }

    useEffect(() => {
        let mounted = true;
        ForumController.getAllForums().then(allForums => {
            if (mounted) {
                let forums: Array<{ value: IForum, selected: boolean }> = [];
                allForums.map(forum => forums.push({value: forum, selected: false}));
                setForums(forums);
            }
        });
        return () => {
            mounted = false;
        }
    }, []);

    return (
        <div>
            {
                forums.map((forum, index) =>
                    <Chip
                        key={index}
                        variant={forum.selected ? 'default' : 'outlined'}
                        color={forum.selected ? 'primary' : 'default'}
                        label={forum.value.name}
                        onClick={() => onForumChipSelect(index, forum.selected)}
                    />)
            }
        </div>
    )
}

export default ForumChips;
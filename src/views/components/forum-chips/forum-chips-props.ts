import {Dispatch, SetStateAction} from 'react';
import IForum from '../../../models/forum';

export default interface IForumChipsProps {
    setSelectedForum: Dispatch<SetStateAction<IForum | undefined>>
}
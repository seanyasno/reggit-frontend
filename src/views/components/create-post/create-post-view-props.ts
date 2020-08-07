import {Dispatch, SetStateAction} from 'react';
import IForum from '../../../models/forum';
import IUser from '../../../models/user';

export default interface ICreatePostViewProps {
    user: IUser | undefined;
    onCancel: () => void;
    uploadPost: () => {};
    setContent: Dispatch<SetStateAction<string>>;
    setSelectedForum: Dispatch<SetStateAction<IForum | undefined>>;
}
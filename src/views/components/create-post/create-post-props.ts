import IPost from '../../../models/post';
import IUser from '../../../models/user';

export default interface ICreatePostProps {
    user: IUser | undefined;
    onCancel: () => void;
    onDone: (newPost: IPost) => void;
}
import IForum from '../../../models/forum';
import IPost from '../../../models/post';

export default interface ICreatePostProps {
    onCancel: () => void;
    onDone: (newPost: IPost) => void;
    selectForum?: boolean;
    forum?: IForum;
}
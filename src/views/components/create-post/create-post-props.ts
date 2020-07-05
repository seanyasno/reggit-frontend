import IPost from '../../../models/post';

export default interface ICreatePostProps {
    username: string;
    onCancel: () => void;
    onDone: (newPost: IPost) => void;
}
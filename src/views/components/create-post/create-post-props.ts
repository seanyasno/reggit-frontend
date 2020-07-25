import IPost from '../../../models/post';

export default interface ICreatePostProps {
    onCancel: () => void;
    onDone: (newPost: IPost) => void;
}
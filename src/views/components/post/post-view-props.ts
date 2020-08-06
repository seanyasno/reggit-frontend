import IPost from '../../../models/post';
import IUser from '../../../models/user';

export default interface IPostViewProps {
    user: IUser | undefined;
    post: IPost | undefined;
    removePost: () => Promise<void>;
    setVotes: (updatedVotes: number) => void;
}
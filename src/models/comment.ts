import IUser from './user';

export default interface IComment {
    id: string;
    userId: string;
    postId: string;
    parent: string | null;
    content: string;
    user: IUser;
}
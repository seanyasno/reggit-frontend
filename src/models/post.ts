import IUser from './user';

export default interface IPost {
    id: string;
    userId: string;
    content: string;
    votes: number;
    user: IUser;
}
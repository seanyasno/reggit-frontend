import IUser from '../../../models/user';

export default interface ICreateCommentProps {
    postId: string;
    user?: IUser;
}
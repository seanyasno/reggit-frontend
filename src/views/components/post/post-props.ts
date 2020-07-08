import IPost from '../../../models/post';

export default interface IPostProps {
    postId: string;
    postData: IPost | undefined;
    canOpenInNewPage: boolean;
    userId?: string;
}
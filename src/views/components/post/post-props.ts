import IPost from '../../../models/post';

export default interface IPostProps {
    postId: string;
    getPostById: (postId: string) => Promise<IPost>;
}
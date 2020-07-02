export default interface IPostProps {
    postId: string;
    getPostById: (postId: string) => Promise<void>;
}
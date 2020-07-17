export default interface IVotingProps {
    postId: string;
    votes: number;
    setVotes: (updatedVotes: number) => void;
    userId?: string;
}
export default interface ISubscriptionContextProps {
    forumIds: Array<string>;
    setForumIds: (newForumIds: Array<string>) => void;
}
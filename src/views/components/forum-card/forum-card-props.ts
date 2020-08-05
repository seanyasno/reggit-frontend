import IForum from '../../../models/forum';

export default interface IForumCardProps {
    forum: IForum;
    subscribed: boolean;
}
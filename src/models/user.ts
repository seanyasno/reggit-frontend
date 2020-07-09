import IProfile from './profile';

export default interface IUser {
    id: string;
    username: string;
    profile: IProfile;
}
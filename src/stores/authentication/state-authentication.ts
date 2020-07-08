import IUser from '../../models/user';

export default interface IStateAuthentication {
    isAuthenticated: boolean;
    user: IUser;
}
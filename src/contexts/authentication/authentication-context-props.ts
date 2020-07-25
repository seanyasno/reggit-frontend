import IUser from '../../models/user';

export default interface IAuthenticationContextProps {
    isAuthenticated: boolean;
    user: IUser | undefined;
    setIsAuthenticated: (newVal: boolean) => void;
    setUser: (newVal: IUser | undefined) => void;
}

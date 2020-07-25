import IAuthenticationContextProps from './authentication-context-props';
import React from 'react';

const initialValue: IAuthenticationContextProps = {
    isAuthenticated: false,
    user: undefined,
    setIsAuthenticated: () => {},
    setUser: () => {}
};

const AuthenticationContext = React.createContext<IAuthenticationContextProps>(initialValue);

export default AuthenticationContext;
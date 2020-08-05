import ISubscriptionContextProps from './subscription-context-props';
import React from 'react';

const initialValue: ISubscriptionContextProps = {
    forumIds: [],
    setForumIds: () => {}
};

const AuthenticationContext = React.createContext<ISubscriptionContextProps>(initialValue);

export default AuthenticationContext;
import SubscriptionController from '../controllers/subscription-controller';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {AuthenticationContext, SubscriptionContext} from '../contexts';
import {ForumPage, HomePage, LoginPage, PostPage} from './pages';
import React, {useEffect, useState} from 'react';
import {requireAuthentication} from '../utils';
import {NavBar} from './components';
import IUser from '../models/user';
import jwtDecode from 'jwt-decode';
import './App.css';


const App: React.FunctionComponent = () => {
    const [user, setUser] = useState<IUser>();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [forumIds, setForumIds] = useState<Array<string>>([]);

    const loadUser = async (): Promise<IUser | undefined> => {
        if (localStorage.jwtToken) {
            setUser(jwtDecode(localStorage.jwtToken));
            setIsAuthenticated(true);
            return jwtDecode(localStorage.jwtToken);
        }
        return undefined;
    }

    useEffect(() => {
        let mounted = true;
        loadUser().then(user => {
            SubscriptionController.getAllForumsByUserId(user?.id || '').then(forumIds => {
                if (mounted) {
                    setForumIds(forumIds);
                    console.log(user?.id);
                    console.log(forumIds);
                }
            });
        });
        return () => {
            mounted = false;
        }
    }, []);

    return (
        <Router>
            <AuthenticationContext.Provider value={{
                user,
                isAuthenticated,
                setUser,
                setIsAuthenticated
            }}>
                <SubscriptionContext.Provider value={{forumIds, setForumIds}}>
                    <div className={'App'}>
                        {isAuthenticated && <NavBar/>}
                        <Switch>
                            <Route path={'/'} exact component={requireAuthentication(HomePage)}/>
                            <Route path={'/login'} component={LoginPage}/>
                            <Route path={'/post/:postId'} component={requireAuthentication(PostPage)}/>
                            <Route path={'/forum/:forumId'} component={requireAuthentication(ForumPage)}/>
                        </Switch>
                    </div>
                </SubscriptionContext.Provider>
            </AuthenticationContext.Provider>
        </Router>
    );
}

export default App;
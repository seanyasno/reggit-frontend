import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {ForumPage, HomePage, LoginPage, PostPage} from './pages';
import {AuthenticationContext} from '../contexts';
import React, {useEffect, useState} from 'react';
import {requireAuthentication} from '../utils';
import {NavBar} from './components';
import IUser from '../models/user';
import jwtDecode from 'jwt-decode';
import './App.css';


const App: React.FunctionComponent = () => {
    const [user, setUser] = useState<IUser>();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        if (localStorage.jwtToken) {
            setUser(jwtDecode(localStorage.jwtToken));
            setIsAuthenticated(true);
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
                <div className={'App'}>
                    {isAuthenticated && <NavBar/>}
                    <Switch>
                        <Route path={'/'} exact component={requireAuthentication(HomePage)}/>
                        <Route path={'/login'} component={LoginPage}/>
                        <Route path={'/post/:postId'} component={requireAuthentication(PostPage)}/>
                        <Route path={'/forum/:forumId'} component={requireAuthentication(ForumPage)}/>
                    </Switch>
                </div>
            </AuthenticationContext.Provider>
        </Router>
    );
}

export default App;
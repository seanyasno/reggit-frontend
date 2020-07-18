import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {HomePage, LoginPage, PostPage} from './pages';
import {requireAuthentication} from '../utils';
import IState from '../stores/state';
import {connect} from 'react-redux';
import {NavBar} from './components';
import IAppProps from './app-props';
import React from 'react';
import './App.css';

const App: React.FunctionComponent<IAppProps> = (props) => {
    const {isAuthenticated = false} = props;

    return (
        <Router>
            <div className={'App'}>
                {isAuthenticated && <NavBar/>}
                <Switch>
                    <Route path={'/'} exact component={requireAuthentication(HomePage)}/>
                    <Route path={'/login'} component={LoginPage}/>
                    <Route path={'/post/:postId'} component={requireAuthentication(PostPage)}/>
                </Switch>
            </div>
        </Router>
    );
}

const mapStateToProps = (state: IState) => {
    return {
        isAuthenticated: state.authentication.isAuthenticated
    };
}

export default connect(mapStateToProps, undefined)(App);

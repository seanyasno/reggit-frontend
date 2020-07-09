import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {HomePage, LoginPage, PostPage} from './pages';
import {requireAuthentication} from '../utils';
import {NavBar} from './components';
import React from 'react';
import './App.css';

function App() {
  return (
    <Router>
        <div className={'App'}>
            <NavBar/>
            <Switch>
                <Route path={'/'} exact component={requireAuthentication(HomePage)}/>
                <Route path={'/login'} component={LoginPage}/>
                <Route path={'/post/:postId'} component={requireAuthentication(PostPage)}/>
            </Switch>
        </div>
    </Router>
  );
}

export default App;

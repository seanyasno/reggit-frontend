import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {requireAuthentication} from '../utils';
import {HomePage, LoginPage} from './pages';
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
            </Switch>
        </div>
    </Router>
  );
}

export default App;

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {HomePage, LoginPage} from './pages';
import React from 'react';
import './App.css';

function App() {
  return (
    <Router>
        <div>
            <Switch>
                <Route path={'/'} exact component={HomePage}/>
                <Route path={'/login'} component={LoginPage}/>
            </Switch>
        </div>
    </Router>
  );
}

export default App;

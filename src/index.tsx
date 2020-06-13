import AuthenticationAction from './stores/authentication/authentication-action';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux';
import {rootStore} from './stores';
import ReactDOM from 'react-dom';
import App from './views/App';
import React from 'react';
import './index.css';

const initialState = {};
const store = rootStore(initialState);

if (localStorage.jwtToken) {
    // @ts-ignore
    store.dispatch(AuthenticationAction.setCurrentUser(localStorage.jwtToken));
}

ReactDOM.render(
    <Provider store={store}>
        <App/>,
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

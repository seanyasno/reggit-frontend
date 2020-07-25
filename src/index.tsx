import {MuiThemeProvider, createMuiTheme} from '@material-ui/core';
import * as serviceWorker from './serviceWorker';
import ReactDOM from 'react-dom';
import App from './views/App';
import React from 'react';
import './index.css';

const THEME = createMuiTheme({
    typography: {
        fontFamily: 'Segoe UI'
    }
});

ReactDOM.render(
    <MuiThemeProvider theme={THEME}>
        <App/>
    </MuiThemeProvider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

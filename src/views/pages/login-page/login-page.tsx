import {AuthenticationContext} from '../../../contexts';
import loginImg from '../../../pictures/login_img.svg';
import React, {useContext, useEffect} from 'react';
import {makeStyles} from '@material-ui/core';
import {useHistory} from 'react-router-dom';
import {LoginForm} from '../../components';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        justifyContent: 'space-evenly'
    },
    loginImg: {
        maxHeight: '100vh',
        maxWidth: '50%',
    }
});

const LoginPage = () => {
    const history = useHistory();
    const classes = useStyles();
    const {isAuthenticated} = useContext(AuthenticationContext);

    useEffect(() => {
        if (isAuthenticated) {
            history.push('/');
        }
    });

    return(
      <div className={classes.root}>
          <img className={classes.loginImg} src={loginImg} alt={''}/>
          <LoginForm/>
      </div>
    );
}

export default LoginPage;
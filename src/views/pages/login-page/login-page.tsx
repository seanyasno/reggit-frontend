import loginImg from '../../../pictures/login_img.svg';
import ILoginPageProps from './login-page-props';
import {makeStyles} from '@material-ui/core';
import {useHistory} from 'react-router-dom';
import {LoginForm} from '../../components';
import React, {useEffect} from  'react';
import {connect} from 'react-redux';

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

const LoginPage = (props: ILoginPageProps) => {
    const history = useHistory();
    const classes = useStyles(props);

    useEffect(() => {
        if (props.isAuthenticated) {
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

const mapStateToProps = (state: any) => {
    return {
        isAuthenticated: state.authentication.isAuthenticated
    };
}

export default connect(mapStateToProps, null)(LoginPage);
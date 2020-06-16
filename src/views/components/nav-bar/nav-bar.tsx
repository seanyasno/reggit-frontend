import AuthenticationAction from '../../../stores/authentication/authentication-action';
import {makeStyles, AppBar, Toolbar, Typography} from '@material-ui/core';
import INavBarProps from './nav-bar-props';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import React from 'react';

const useStyles = makeStyles({
    logo: {
        fontWeight: 'bold',
        color: 'white',
    },
    link: {
        textDecoration: 'none'
    },
    linkText: {
        margin: '0 2em',
        color: 'white',
    }
});

const NavBar = (props: INavBarProps) => {
    const classes = useStyles();
    const {isAuthenticated, logout} = props;

    return (
        <div>
            <AppBar position={'static'}>
                <Toolbar>
                    <Link className={classes.link} to='/'>
                        <Typography className={classes.logo} variant='h5'>Reggit</Typography>
                    </Link>
                    {!isAuthenticated &&
                    <Link className={classes.link} to='/login'>
                        <Typography className={classes.linkText} variant='h6'>Login</Typography>
                    </Link>}
                    {isAuthenticated &&
                    <Link onClick={() => logout()} className={classes.link} to='/login'>
                        <Typography className={classes.linkText} variant='h6'>Logout</Typography>
                    </Link>}
                </Toolbar>
            </AppBar>
        </div>
    );
}

const mapStateToProps = (state: any) => {
    return {
        isAuthenticated: state.authentication.isAuthenticated
    };
}

const logout = AuthenticationAction.logout;
export default connect(mapStateToProps, {logout})(NavBar);
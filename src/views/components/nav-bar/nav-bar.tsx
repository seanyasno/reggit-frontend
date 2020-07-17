import AuthenticationAction from '../../../stores/authentication/authentication-action';
import {makeStyles, AppBar, Toolbar, Typography} from '@material-ui/core';
import INavBarProps from './nav-bar-props';
import {IState} from '../../../stores';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import React from 'react';

const useStyles = makeStyles({
    toolbar: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    logo: {
        fontWeight: 'bold',
        color: 'white',
    },
    title: {
        fontWeight: 'lighter',
        margin: '0 1em',
    },
    link: {
        textDecoration: 'none'
    },
    linkText: {
        color: 'white',
    }
});

const NavBar = (props: INavBarProps) => {
    const classes = useStyles();
    const {isAuthenticated, firstName, logout} = props;

    return (
        <div>
            <AppBar elevation={0} position={'static'}>
                <Toolbar className={classes.toolbar}>
                    <div style={{display: 'flex'}}>
                        <Link className={classes.link} to='/'>
                            <Typography className={classes.logo} variant='h5'>Reggit</Typography>
                        </Link>
                        {isAuthenticated && <Typography className={classes.title} variant={'h6'}>Hello, {firstName}</Typography>}
                    </div>
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

const mapStateToProps = (state: IState) => {
    return {
        isAuthenticated: state.authentication.isAuthenticated,
        firstName: state.authentication.user.profile?.firstName
    };
}

const logout = AuthenticationAction.logout;
export default connect(mapStateToProps, {logout})(NavBar);
import AuthenticationAction from '../../../stores/authentication/authentication-action';
import {makeStyles, AppBar, Toolbar, Typography} from '@material-ui/core';
import INavBarProps from './nav-bar-props';
import {IState} from '../../../stores';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import React from 'react';
import logo from '../../../pictures/logo.svg';

const useStyles = makeStyles({
    toolbar: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    logo: {
        fontWeight: 'bold',
        color: 'white',
        height: '3em',
        alignSelf: 'center',
    },
    title: {
        fontWeight: 'lighter',
        margin: '0 1em',
        alignSelf: 'center',
    },
    link: {
        textDecoration: 'none',
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
                            <img className={classes.logo} src={logo} alt={'Reggit'}/>
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
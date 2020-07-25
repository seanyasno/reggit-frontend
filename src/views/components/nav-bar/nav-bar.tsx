import {makeStyles, AppBar, Toolbar, Typography} from '@material-ui/core';
import {AuthenticationController} from '../../../controllers';
import {AuthenticationContext} from '../../../contexts';
import logo from '../../../pictures/logo.svg';
import React, {useContext} from 'react';
import {Link} from 'react-router-dom';

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

const NavBar: React.FunctionComponent = () => {
    const classes = useStyles();
    const {isAuthenticated, user, setUser, setIsAuthenticated} = useContext(AuthenticationContext);

    const logout = () => {
        AuthenticationController.logout().then(() => {
            setIsAuthenticated(false);
            setUser(undefined);
        });
    }

    return (
        <div>
            <AppBar elevation={0} position={'static'}>
                <Toolbar className={classes.toolbar}>
                    <div style={{display: 'flex'}}>
                        <Link className={classes.link} to='/'>
                            <img className={classes.logo} src={logo} alt={'Reggit'}/>
                        </Link>
                        {isAuthenticated && <Typography className={classes.title} variant={'h6'}>Hello, {user?.profile.firstName}</Typography>}
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

export default NavBar;
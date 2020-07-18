import {Typography, Checkbox, TextField, Button, makeStyles} from '@material-ui/core';
import ILoginFormViewProps from './login-form-view-props';
import React from 'react';

const useStyles = makeStyles({
    root: {
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '25%',
    },
    titleSection: {
        textAlign: 'start',
        alignSelf: 'start',
        margin: '1.5em 0'
    },
    title: {
        fontWeight: 'lighter',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        margin: 'auto',
        width: '100%',
    },
    bottomSection: {
        display: 'flex',
        justifyContent: 'space-between',
        textAlign: 'center',
        alignItems: 'center',
    },
    innerBottomSection: {
        display: 'flex',
        textAlign: 'start',
        justifyContent: 'left',
        alignItems: 'center',
    },
    inputField: {
        margin: '0.5em 0',
    },
    login: {
        margin: '1em 0',
        padding: '0.6em',
        borderRadius: '0.6em',
        textTransform: 'none',
        fontSize: 'large',
        fontWeight: 'lighter',
        backgroundColor: '#6C63FF',
    },
    registerSection: {
        display: 'flex',
        justifyContent: 'start'
    },
    register: {
        fontWeight: 'bold',
        marginLeft: '0.4em'
    }
});

export default (props: ILoginFormViewProps) => {
    const classes = useStyles();
    const {onChange, onSubmit} = props;

    return (
        <div className={classes.root}>
            <form className={classes.form} onSubmit={onSubmit}>
                <div className={classes.titleSection}>
                    <Typography className={classes.title} variant='h3'>Hello,</Typography>
                    <Typography className={classes.title} variant='h3'>Welcome back</Typography>
                </div>
                <TextField
                    className={classes.inputField}
                    label={'Username'}
                    name={'username'}
                    onChange={onChange}
                />
                <TextField
                    className={classes.inputField}
                    label={'Password'}
                    name={'password'}
                    type={'password'}
                    onChange={onChange}
                />
                <div className={classes.bottomSection}>
                    <div className={classes.innerBottomSection}>
                        <Checkbox color={'primary'}/>
                        <Typography>Remember me</Typography>
                    </div>
                    <Typography>Forgot password?</Typography>
                </div>
                <Button className={classes.login} type={'submit'} variant={'contained'}
                        color={'primary'} >Login</Button>
                <div className={classes.registerSection}>
                    <Typography>Don't have an account?</Typography>
                    <Typography className={classes.register}>Click here</Typography>
                </div>
            </form>
        </div>
    );
}
import {Typography, TextField, Button, makeStyles, Card} from '@material-ui/core';
import ILoginFormViewProps from './login-form-view-props';
import {useCardStyle} from '../../../constants';
import React from 'react';

const useStyles = makeStyles({
    root: {
        height: '80vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        textAlign: 'center',
        fontWeight: 'bold',
        alignSelf: 'center',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        margin: 'auto'
    },
    inputField: {
        margin: '0.5em 0',
    },
    login: {
        margin: '1em 0',
        borderRadius: '0.6em'
    }
});

export default (props: ILoginFormViewProps) => {
    const classes = useStyles();
    const {onChange, onSubmit} = props;
    const cardStyle = useCardStyle();

    return (
        <div className={classes.root}>
            <Card className={cardStyle.style} elevation={3}>
                <form className={classes.form} onSubmit={onSubmit}>
                    <Typography className={classes.title} variant={'h4'}>Sign In</Typography>
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
                    <Button className={classes.login} type={'submit'} variant={'contained'} color={'primary'}>Submit</Button>
                </form>
            </Card>
        </div>
    );
}
import React from 'react';
import {Typography, TextField, Button, makeStyles} from '@material-ui/core';
import ILoginFormViewProps from './login-form-view-props';

const useStyles = makeStyles({
    form: {
        display: 'flex',
        flexDirection: 'column',
        width: '50%',
        margin: 'auto'
    }
});

export default (props: ILoginFormViewProps) => {
    const classes = useStyles();
    const {onChange, onSubmit} = props;

    return (
        <div>
            <form className={classes.form} onSubmit={onSubmit}>
                <Typography variant={'h4'}>Login</Typography>
                <TextField
                    label={'username'}
                    variant={'outlined'}
                    name={'username'}
                    onChange={onChange}
                />
                <TextField
                    label={'password'}
                    variant={'outlined'}
                    name={'password'}
                    type={'password'}
                    onChange={onChange}
                />
                <Button type={'submit'} variant={'contained'} color={'primary'}>Login</Button>
            </form>
        </div>
    );
}
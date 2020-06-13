import React from 'react';
import {Typography, TextField, Button, makeStyles} from '@material-ui/core';

const useStyles = makeStyles({
    form: {
        display: 'flex',
        flexDirection: 'column',
        width: '50%',
        margin: 'auto'
    }
});

export default () => {
    const classes = useStyles();

    return (
        <div>
            <form className={classes.form}>
                <Typography variant={'h4'}>Login</Typography>
                <TextField
                    label={'username'}
                    variant={'outlined'}
                    name={'username'}
                />
                <TextField
                    label={'password'}
                    variant={'outlined'}
                    name={'password'}
                    type={'password'}
                />
                <Button type={'submit'} variant={'contained'} color={'primary'}>Login</Button>
            </form>
        </div>
    );
}
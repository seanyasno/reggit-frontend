import AuthenticationAction from '../../../stores/authentication/authentication-action';
import React, {ChangeEvent, FormEvent, useState} from 'react';
import ILoginFormProps from './login-form-props';
import LoginFormView from './login-form-view';
import {useHistory} from 'react-router-dom';
import {connect} from 'react-redux';

const LoginForm = (props: ILoginFormProps) => {
    const history = useHistory();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [isLoading, setLoading] = useState(false);

    const formHandleChange = {
        username: setUsername,
        password: setPassword
    };

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (username && password) {
            setErrors({});
            setLoading(true);
            props.login({username, password, errors, isLoading}).then(
                response => {
                    history.push('/');
                },
                error => {
                    setErrors(error.errors);
                    setLoading(false);
                }
            );
        }
    }

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        // @ts-ignore
        formHandleChange[event.target.name](event.target.value);
    }

    return(<LoginFormView onChange={onChange} onSubmit={onSubmit} errors={errors} isLoading={isLoading}/>);
}

const login = AuthenticationAction.login;
export default connect(null, {login})(LoginForm);
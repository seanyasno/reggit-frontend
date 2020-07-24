import AuthenticationAction from '../../../stores/authentication/authentication-action';
import {LoginFormActionType} from './stores/login-form-action-type';
import React, {ChangeEvent, FormEvent, useReducer} from 'react';
import loginFormReducer from './stores/login-form-reducer';
import ILoginFormProps from './login-form-props';
import LoginFormView from './login-form-view';
import {useHistory} from 'react-router-dom';
import {connect} from 'react-redux';

const LoginForm = (props: ILoginFormProps) => {
    const history = useHistory();
    const [state, dispatch] = useReducer(loginFormReducer, {
        username: '',
        password: '',
        errors: {},
        isLoading: false
    });
    const {username, password, errors, isLoading} = state;

    const formHandleChange: any = {
        username: (username: string) => dispatch({
            type: LoginFormActionType.SET_USERNAME,
            payload: {username}
        }),
        password: (password: string) => dispatch({
            type: LoginFormActionType.SET_PASSWORD,
            payload: {password}
        })
    };

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (username && password) {
            dispatch({
                type: LoginFormActionType.SET_ERRORS,
                payload: {errors: {}}
            });
            dispatch({
                type: LoginFormActionType.SET_IS_LOADING,
                payload: {isLoading: true}
            });
            props.login({username, password, errors, isLoading}).then(
                response => {
                    history.push('/');
                },
                error => {
                    dispatch({
                        type: LoginFormActionType.SET_ERRORS,
                        payload: {errors}
                    });
                    dispatch({
                        type: LoginFormActionType.SET_IS_LOADING,
                        payload: {isLoading: false}
                    });
                }
            );
        }
    }

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        formHandleChange[event.target.name](event.target.value);
    }

    return(<LoginFormView onChange={onChange} onSubmit={onSubmit} errors={errors} isLoading={isLoading}/>);
}

const login = AuthenticationAction.login;
export default connect(null, {login})(LoginForm);
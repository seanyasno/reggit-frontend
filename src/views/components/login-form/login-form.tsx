import React, {ChangeEvent, FormEvent, useContext, useReducer} from 'react';
import {LoginFormActionType} from './stores/login-form-action-type';
import {AuthenticationController} from '../../../controllers';
import loginFormReducer from './stores/login-form-reducer';
import {AuthenticationContext} from '../../../contexts';
import LoginFormView from './login-form-view';
import {useHistory} from 'react-router-dom';

const LoginForm = () => {
    const history = useHistory();
    const {setIsAuthenticated, setUser} = useContext(AuthenticationContext);
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
            AuthenticationController.login(username, password).then(user => {
                setIsAuthenticated(true);
                setUser(user);
                history.push('/');
            });
        }
    }

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        formHandleChange[event.target.name](event.target.value);
    }

    return(<LoginFormView onChange={onChange} onSubmit={onSubmit} errors={errors} isLoading={isLoading}/>);
}

export default LoginForm;
import {LoginFormActionType} from './login-form-action-type';
import ILoginFormAction from './login-form-action';
import ILoginFormState from './login-form-state';

const loginFormReducer = (state: ILoginFormState, action: ILoginFormAction): ILoginFormState => {
    switch (action.type) {
        case LoginFormActionType.SET_USERNAME:
            return {
                ...state,
                username: action.payload.username || ''
            }
        case LoginFormActionType.SET_PASSWORD:
            return {
                ...state,
                password: action.payload.password || ''
            }
        case LoginFormActionType.SET_ERRORS:
            return {
                ...state,
                errors: action.payload.errors || {}
            }
        case LoginFormActionType.SET_IS_LOADING:
            return {
                ...state,
                isLoading: action.payload.isLoading || false
            }
        default:
            throw new Error();
    }
}

export default loginFormReducer;
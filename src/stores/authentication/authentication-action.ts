import {ActionUtility} from '../../utils';
import {Dispatch} from 'react';
import AuthenticationEffect from './authentication-effect';

export default class AuthenticationAction {
    static LOGIN = 'AuthenticationAction.LOGIN';
    static LOGIN_FINISHED = 'AuthenticationAction.LOGIN_FINISHED';

    static LOGOUT = 'AuthenticationAction.LOGOUT';
    static LOGOUT_FINISHED = 'AuthenticationAction.LOGOUT_FINISHED';

    static SET_CURRENT_USER = 'Authentication.SET_CURRENT_USER';
    static SET_CURRENT_USER_FINISHED = 'Authentication.SET_CURRENT_USER_FINISHED';

    static login(data: any ) {
        return async (dispatch: Dispatch<any>) => {
            await ActionUtility.createThunkEffect(dispatch, AuthenticationAction.LOGIN, AuthenticationEffect.login, data, dispatch);
        }
    }

    static logout() {
        return async (dispatch: Dispatch<any>) => {
            await ActionUtility.createThunkEffect(dispatch, AuthenticationAction.LOGOUT, AuthenticationEffect.logout, dispatch);
        }
    }

    static setCurrentUser(user: any) {
        return async (dispatch: Dispatch<any>) => {
            await ActionUtility.createThunkEffect(dispatch, AuthenticationAction.SET_CURRENT_USER, AuthenticationEffect.setCurrentUser, user);
        }
    }
}
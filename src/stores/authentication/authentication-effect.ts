import AuthenticationAction from './authentication-action';
import Config from '../../conf/Config';
import jwtDecode from 'jwt-decode';
import {Dispatch} from 'react';
import axios from 'axios';

export default class AuthenticationEffect {
    static async login(data: any, dispatch: Dispatch<any>) {
        const url = Config.getInstance().getServerUrl() + Config.getInstance().getConfiguration().ROUTES.AUTH.LOGIN;
        const response = await axios.post(url, {...data});
        const responseData = await response.data;

        if (responseData.status === 401) {
            return Promise.reject(responseData);
        }

        const token = responseData.token;
        localStorage.setItem('jwtToken', token);
        dispatch(AuthenticationAction.setCurrentUser(jwtDecode(token)))
        return await responseData;
    }

    static logout(dispatch: Dispatch<any>) {
        if (localStorage.jwtToken) {
            localStorage.removeItem('jwtToken');
            dispatch(AuthenticationAction.setCurrentUser({}));
            return {};
        }
    }

    static setCurrentUser(user: any) {
        return {user};
    }
}
import AuthenticationAction from './authentication-action';
import config from '../../conf/local-config.json';
import {Dispatch} from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

export default class AuthenticationEffect {
    static async login(data: any, dispatch: Dispatch<any>) {
        const response = await axios.post(`${config.SERVER_URL}:${config.SERVER_PORT}${config.ROUTES.AUTH.LOGIN}`, {...data});
        const responseData = await response.data;

        if (responseData.status === 401) {
            return Promise.reject(responseData);
        }

        const token = responseData.token;
        localStorage.setItem('token', token);
        dispatch(AuthenticationAction.setCurrentUser(jwtDecode(token)))
        return await responseData;
    }

    static setCurrentUser(user: any) {
        return {user};
    }
}
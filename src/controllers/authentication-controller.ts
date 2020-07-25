import Config from '../conf/Config';
import jwtDecode from 'jwt-decode';
import IUser from '../models/user';
import axios from 'axios';

export default class AuthenticationController {
    static LOGIN_URL: string = Config.getInstance().getServerUrl() + Config.getInstance().getConfiguration().ROUTES.AUTH.LOGIN;

    static async login(username: string, password: string): Promise<IUser> {
        const response = await axios.post(AuthenticationController.LOGIN_URL, {username, password});
        const responseData = await response.data;

        if (responseData.status === 401) {
            return Promise.reject(responseData);
        }

        const token = responseData.token;
        localStorage.setItem('jwtToken', token);
        return jwtDecode(token);
    }

    static async logout() {
        if (localStorage.jwtToken) {
            localStorage.removeItem('jwtToken');
            return;
        }
    }
}
import {BaseReducer} from '../../models';
import AuthenticationAction from './authentication-action';

export default class AuthenticationReducer extends BaseReducer {
    initialState = {
        isAuthenticated: false,
        user: {}
    };

    [AuthenticationAction.LOGIN_FINISHED](state: object, action: object) {
        return state;
    }

    [AuthenticationAction.LOGOUT_FINISHED](state: object, action: object) {
        return {
            isAuthenticated: false,
            user: {}
        };
    }

    [AuthenticationAction.SET_CURRENT_USER_FINISHED](state: object, action: object) {
        // @ts-ignore
        return { isAuthenticated: !!action.payload.user, user: action.payload.user};
    }
}
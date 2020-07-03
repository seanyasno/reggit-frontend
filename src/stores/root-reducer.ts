import AuthenticationReducer from './authentication/authentication-reducer';
import {combineReducers} from 'redux';

export default () => {
    return combineReducers({
        authentication: new AuthenticationReducer().reducer
    });
}
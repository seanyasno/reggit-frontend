import AuthenticationReducer from './authentication/authentication-reducer';
import PostingReducer from './posting/posting-reducer';
import {combineReducers} from 'redux';

export default () => {
    return combineReducers({
        authentication: new AuthenticationReducer().reducer,
        posting: new PostingReducer().reducer
    });
}
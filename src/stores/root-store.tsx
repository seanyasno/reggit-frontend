import {composeWithDevTools} from 'redux-devtools-extension';
import {applyMiddleware, createStore} from 'redux';
import {rootReducer} from './index';
import thunk from 'redux-thunk';

export default (initialState: object, history: History) => {
    const middleware = [thunk].filter(Boolean);

    return createStore(
        rootReducer(),
        initialState,
        composeWithDevTools(applyMiddleware(...middleware))
    );
}
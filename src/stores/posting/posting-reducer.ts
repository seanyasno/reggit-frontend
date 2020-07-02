import PostingAction from './posting-action';
import {BaseReducer} from '../../models';

export default class PostingReducer extends BaseReducer {
    [PostingAction.GET_POST_BY_ID_FINISHED](state: object, action: object) {
        return state;
    }
}
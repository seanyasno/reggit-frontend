import PostingEffect from './posting-effect';
import {ActionUtility} from '../../utils';
import {Dispatch} from 'react';

export default class PostingAction {
    static GET_POST_BY_ID = 'PostingAction.GET_POST_BY_ID';
    static GET_POST_BY_ID_FINISHED = 'PostingAction.GET_POST_BY_ID_FINISHED';

    static getPostById(postId: string) {
        return async (dispatch: Dispatch<any>) => {
            await ActionUtility.createThunkEffect(dispatch, PostingAction.GET_POST_BY_ID, PostingEffect.getPostById, postId);
        }
    }
}
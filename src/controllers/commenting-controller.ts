import IComment from '../models/comment';
import Config from '../conf/Config';
import axios from 'axios';
import _ from 'lodash';

export default class CommentingController {
    static CREATE_COMMENT_URL: string = Config.getInstance().getServerUrl() + Config.getInstance().getConfiguration().ROUTES.COMMENT.CREATE;
    static GET_ALL_COMMENTS_URL: string = Config.getInstance().getServerUrl() + Config.getInstance().getConfiguration().ROUTES.COMMENT.GET_ALL_BY_POST_ID;

    static async createComment(postId: string, userId: string, content: string): Promise<IComment> {
        if (_.isEmpty(content)) {
            return Promise.reject({errors: {form: "Can't create a comment with empty content."}});
        }

        const response = await axios.post(CommentingController.CREATE_COMMENT_URL + postId, {
            userId,
            content
        });
        return response.data;
    }
}
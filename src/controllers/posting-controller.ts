import Config from '../conf/Config';
import IPost from '../models/post';
import axios from 'axios';

export default class PostingController {
    static CREATE_POST_URL: string = Config.getInstance().getServerUrl() + Config.getInstance().getConfiguration().ROUTES.POST.CREATE;
    static GET_ALL_POSTS_URL: string = Config.getInstance().getServerUrl() + Config.getInstance().getConfiguration().ROUTES.POST.ALL_POSTS;
    static GET_POST_BY_ID_URL: string = Config.getInstance().getServerUrl() + Config.getInstance().getConfiguration().ROUTES.POST.GET_POST_BY_ID;
    static DELETE_POST_URL: string = Config.getInstance().getServerUrl() + Config.getInstance().getConfiguration().ROUTES.POST.DELETE_POST;

    static async createNewPost(userId: string, content: string): Promise<IPost> {
        const response = await axios.post(PostingController.CREATE_POST_URL, {
            userId,
            content
        });
        return response.data;
    }
}
import IForum from '../models/forum';
import Config from '../conf/Config';
import IPost from '../models/post';
import axios from 'axios';

export default class ForumController {
    static GET_ALL_FORUMS_URL: string = Config.getInstance().getServerUrl() + Config.getInstance().getConfiguration().ROUTES.FORUM.GET_ALL_FORUMS;
    static GET_FORUM_BY_ID_URL: string = Config.getInstance().getServerUrl() + Config.getInstance().getConfiguration().ROUTES.FORUM.GET_FORUM_BY_ID;
    static GET_POSTS_BY_FORUM_ID_URL: string = Config.getInstance().getServerUrl() + Config.getInstance().getConfiguration().ROUTES.FORUM.GET_ALL_POSTS_BY_FORUM_ID;

    static async getAllForums(): Promise<Array<IForum>> {
        const response = await axios.get(ForumController.GET_ALL_FORUMS_URL);
        return response.data;
    }

    static async getForumById(forumId: string): Promise<IForum> {
        const response = await axios.get(ForumController.GET_FORUM_BY_ID_URL + forumId);
        return response.data;
    }

    static async getPostsByForumId(forumId: string): Promise<Array<IPost>> {
        const response = await axios.get(ForumController.GET_POSTS_BY_FORUM_ID_URL + forumId);
        return response.data;
    }
}
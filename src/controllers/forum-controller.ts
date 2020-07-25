import Config from '../conf/Config';
import IForum from '../models/forum';
import axios from 'axios';

export default class ForumController {
    static GET_ALL_FORUMS_URL: string = Config.getInstance().getServerUrl() + Config.getInstance().getConfiguration().ROUTES.FORUM.GET_ALL_FORUMS;

    static async getAllForums(): Promise<Array<IForum>> {
        const response = await axios.get(ForumController.GET_ALL_FORUMS_URL);
        return response.data;
    }
}
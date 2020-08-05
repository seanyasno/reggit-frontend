import Config from '../conf/Config';
import axios from 'axios';

export default class SubscriptionController {
    static CREATE_URL: string = Config.getInstance().getServerUrl() + Config.getInstance().getConfiguration().ROUTES.SUBSCRIPTION.CREATE;
    static REMOVE_URL: string = Config.getInstance().getServerUrl() + Config.getInstance().getConfiguration().ROUTES.SUBSCRIPTION.REMOVE;
    static GET_ALL_FORUMS_BY_USER_ID_URL: string = Config.getInstance().getServerUrl() + Config.getInstance().getConfiguration().ROUTES.SUBSCRIPTION.GET_ALL_FORUMS_BY_USER_ID;
    static GET_ALL_USERS_BY_FORUM_ID_URL: string = Config.getInstance().getServerUrl() + Config.getInstance().getConfiguration().ROUTES.SUBSCRIPTION.GET_ALL_USERS_BY_FORUM_ID;

    static async createSubscribe(userId: string, forumId: string) {
        const response = await axios.post(SubscriptionController.CREATE_URL, {userId, forumId});
        return response.data;
    }

    static async removeSubscribe(userId: string, forumId: string) {
        const response = await axios.delete(SubscriptionController.REMOVE_URL, {
            data: {userId, forumId}
        });
        return response.data;
    }

    static async getAllForumsByUserId(userId: string) {
        if (!userId) return;
        const response = await axios.get(SubscriptionController.GET_ALL_FORUMS_BY_USER_ID_URL, {
            params: {userId}
        });
        return response.data;
    }

    static async getAllUsersByForumId(forumId: string) {
        if (!forumId) return;
        const response = await axios.get(SubscriptionController.GET_ALL_USERS_BY_FORUM_ID_URL, {
            params: {forumId}
        });
        return response.data;
    }
}
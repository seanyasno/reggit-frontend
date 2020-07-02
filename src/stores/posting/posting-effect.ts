import config from '../../conf/local-config.json';
import axios from 'axios';

export default class PostingEffect {
    static async getPostById(postId: string) {
        const url = config.SERVER_URL + ':' + config.SERVER_PORT + config.ROUTES.POST.GET_POST_BY_ID + postId;
        const response = await axios.get(url);
        const responseData = await response.data;

        if (responseData.status === 401) {
            return Promise.reject(responseData);
        }

        return await responseData;
    }
}
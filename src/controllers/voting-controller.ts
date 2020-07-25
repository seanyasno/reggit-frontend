import Config from '../conf/Config';
import IPost from '../models/post';
import axios from 'axios';

export default class VotingController {
    static GET_VOTE_STATE_URL = Config.getInstance().getServerUrl() + Config.getInstance().getConfiguration().ROUTES.POST.GET_VOTE_STATE;
    static SET_VOTE_URL = Config.getInstance().getServerUrl() + Config.getInstance().getConfiguration().ROUTES.POST.VOTE;

    static async setVote(postId: string, voteState: boolean, userId: string): Promise<number> {
        const url: string = VotingController.SET_VOTE_URL + postId + `/${voteState}`;
        const response = await axios.put(url, {}, {
            headers: {
                user_id: userId
            }
        });
        const post: IPost = response.data;
        return post.votes;
    }

    static async getVoteState(postId: string, userId: string): Promise<number> {
        const response = await axios.get(VotingController.GET_VOTE_STATE_URL + postId + '/voteState', {
            headers: {
                user_id: userId
            }
        });
        return response.data?.state;
    }
}
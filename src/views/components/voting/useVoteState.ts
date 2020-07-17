import config from '../../../conf/local-config.json';
import {useState} from 'react';
import axios from 'axios';

const useVoteState = (postId: string, userId: string): number => {
    const [voteState, setVoteState] = useState(0);

    if (!postId) return 0;

    const url = config.SERVER_URL + ':' + config.SERVER_PORT + config.ROUTES.POST.GET_VOTE_STATE + postId + '/voteState';
    console.log(url);
    axios.get(url, {
        headers: {
            user_id: userId
        }
    }).then(response => {
        if (response.data) {
            setVoteState(response.data.state);
        }

        return voteState;
    });

    return 0;
}

export default useVoteState;
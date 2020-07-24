import {VotingController} from '../../../controllers';
import {useEffect, useState} from 'react';

const useVoteState = (postId: string, userId: string | undefined): number => {
    const [voteState, setVoteState] = useState(0);

    const fetchVoteState = async (): Promise<number> => {
        if (!postId || !userId) return Promise.reject();

        const voteState = await VotingController.getVoteState(postId, userId);
        if (voteState) {
            return voteState;
        }

        return 0;
    }

    useEffect(() => {
        fetchVoteState().then(voteState => setVoteState(voteState));
    });

    return voteState;
}

export default useVoteState;
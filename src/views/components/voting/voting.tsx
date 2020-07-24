import {ArrowUpward, ArrowDownward} from '@material-ui/icons';
import {Typography, makeStyles} from '@material-ui/core';
import {VotingController} from '../../../controllers';
import useVoteState from './useVoteState';
import IVotingProps from './voting-props';
import {useSelector} from 'react-redux';
import {IState} from '../../../stores';
import React from 'react';

const useStyles = makeStyles({
    votingSection: {
        display: 'flex',
        alignItems: 'center'
    },
    upvote: {
        color: 'darkorange'
    },
    downvote: {
        color: 'darkcyan'
    },
    votes: {
        margin: '0 0.5em',
    }
});

const Voting: React.FunctionComponent<IVotingProps> = (props) => {
    const userId = useSelector<IState>(state => state.authentication.user.id);
    const {postId, votes, setVotes}: IVotingProps = props;
    const voteState = useVoteState(postId, userId as string);
    const classes = useStyles();

    const vote = async (voteState: boolean) => {
        if (!userId) return;
        const votes = await VotingController.setVote(postId, voteState, userId as string);
        setVotes(votes);
    }

    return (
        <div className={classes.votingSection}>
            <ArrowUpward className={voteState === 1 ? classes.upvote : ''} onClick={() => vote(true)}/>
            <Typography className={classes.votes} display={'inline'}>{votes}</Typography>
            <ArrowDownward className={voteState === -1 ? classes.downvote : ''} onClick={() => vote(false)}/>
        </div>
    );
}

export default Voting;
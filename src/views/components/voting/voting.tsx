import {ArrowUpward, ArrowDownward} from '@material-ui/icons';
import {Typography, makeStyles} from '@material-ui/core';
import {VotingController} from '../../../controllers';
import useVoteState from './useVoteState';
import IVotingProps from './voting-props';
import {IState} from '../../../stores';
import {connect} from 'react-redux';
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
    const {postId, votes, setVotes, userId}: IVotingProps = props;
    const voteState = useVoteState(postId, userId);
    const classes = useStyles();

    const vote = async (voteState: boolean) => {
        if (!userId) return;
        const votes = await VotingController.setVote(postId, voteState, userId);
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

const mapStateToProps = (state: IState) => {
    return {
        userId: state.authentication.user.id
    }
}

export default connect(mapStateToProps, undefined)(Voting);
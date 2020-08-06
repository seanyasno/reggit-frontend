import {ArrowUpward, ArrowDownward} from '@material-ui/icons';
import {Typography, makeStyles} from '@material-ui/core';
import {AuthenticationContext} from '../../../contexts';
import {VotingController} from '../../../controllers';
import useVoteState from './useVoteState';
import IVotingProps from './voting-props';
import React, {useContext} from 'react';

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
    const {postId, votes, setVotes}: IVotingProps = props;
    const {user} = useContext(AuthenticationContext);
    const voteState = useVoteState(postId, user?.id);
    const classes = useStyles();

    const vote = async (event: React.MouseEvent<SVGSVGElement>, voteState: boolean) => {
        event.stopPropagation();
        if (!user?.id) return;
        const votes = await VotingController.setVote(postId, voteState, user?.id);
        setVotes(votes);
    }

    return (
        <div className={classes.votingSection}>
            <ArrowUpward className={voteState === 1 ? classes.upvote : ''} onClick={(event) => vote(event, true)}/>
            <Typography className={classes.votes} display={'inline'}>{votes}</Typography>
            <ArrowDownward className={voteState === -1 ? classes.downvote : ''} onClick={(event) => vote(event, false)}/>
        </div>
    );
}

export default Voting;
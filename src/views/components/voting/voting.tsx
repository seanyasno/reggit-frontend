import {ArrowUpward, ArrowDownward} from '@material-ui/icons';
import {Typography, makeStyles} from '@material-ui/core';
import config from '../../../conf/local-config.json';
import IVotingProps from './voting-props';
import IPost from '../../../models/post';
import {connect} from 'react-redux';
import React from 'react';
import axios from 'axios';
import {IState} from '../../../stores';

const useStyles = makeStyles({
    votingSection: {
        display: 'flex',
        alignItems: 'center'
    },
    upvote: {},
    downvote: {},
    votes: {
        margin: '0 0.5em',
    }
});

const Voting = (props: IVotingProps) => {
    const {postId, votes, setVotes, userId}: IVotingProps = props;
    const classes = useStyles();
    const voteUrl = config.SERVER_URL + ':' + config.SERVER_PORT + config.ROUTES.POST.VOTE + '/';

    const vote = async (voteState: boolean) => {
        const url = voteUrl + postId + `/${voteState}`;
        const response = await axios.put(url, {}, {
            headers: {
                user_id: userId
            }
        });
        const responseData: IPost = await response.data;
        setVotes(responseData.votes);
    }

    return (
        <div className={classes.votingSection}>
            <ArrowUpward className={classes.upvote} onClick={() => vote(true)}/>
            <Typography className={classes.votes} display={'inline'}>{votes}</Typography>
            <ArrowDownward className={classes.downvote} onClick={() => vote(false)}/>
        </div>
    );
}

const mapStateToProps = (state: IState) => {
    return {
        userId: state.authentication.user.id
    }
}

export default connect(mapStateToProps, undefined)(Voting);
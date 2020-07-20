import {ArrowUpward, ArrowDownward} from '@material-ui/icons';
import {Typography, makeStyles} from '@material-ui/core';
import React, {useEffect, useState} from 'react';
import IVotingProps from './voting-props';
import Config from '../../../conf/Config';
import IPost from '../../../models/post';
import {IState} from '../../../stores';
import {connect} from 'react-redux';
import axios from 'axios';

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

const Voting = (props: IVotingProps) => {
    const {postId, votes, setVotes, userId}: IVotingProps = props;
    const [voteState, setVoteState] = useState(0);
    const classes = useStyles();
    const voteUrl = Config.getInstance().getServerUrl() + Config.getInstance().getConfiguration().ROUTES.POST.VOTE + '/';

    const fetchVoteState = async () => {
        if (!postId) return Promise.reject();

        const url = Config.getInstance().getServerUrl() + Config.getInstance().getConfiguration().ROUTES.POST.GET_VOTE_STATE + postId + '/voteState';
        const response = await axios.get(url, {
            headers: {
                user_id: userId
            }
        });
        if (response.data) {
            setVoteState(response.data.state);
        }

        return voteState;
    }

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

    useEffect(() => {
        fetchVoteState();
    });

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
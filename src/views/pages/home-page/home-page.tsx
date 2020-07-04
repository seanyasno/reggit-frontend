import React, {useState} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import config from '../../../conf/local-config.json';

const HomePage = (props: any) => {
    const {username} = props;
    const [content, setContent] = useState('');

    const uploadPost = async () => {
        const url = config.SERVER_URL + ':' + config.SERVER_PORT + config.ROUTES.POST.CREATE;
        const response = axios.post(url, {
            author: username,
            content
        });
        const responseData = await response;
        console.log(responseData);
    }

    return (
        <div>
            <input onChange={event => setContent(event.target.value)}/>
            <button onClick={() => uploadPost()}>upload</button>
        </div>
    );
}

const mapStateToProps = (state: any) => {
    return {
        username: state.authentication.user.username
    };
}

export default connect(mapStateToProps, undefined)(HomePage);
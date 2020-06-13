import {useHistory} from 'react-router-dom';
import React, {useEffect} from 'react';
import {connect} from 'react-redux';

export default function (ComposedComponent: any) {
    function Authenticate(props: any) {
        const history = useHistory();

        useEffect(() => {
            if (!props.isAuthenticated) {
                history.push('/login');
            }
        });

        return (<ComposedComponent {...props}/>);
    }

    function mapStateToFunction(state: any) {
        return {
            isAuthenticated: state.authentication.isAuthenticated
        };
    }

    return connect(mapStateToFunction, {})(Authenticate);
}
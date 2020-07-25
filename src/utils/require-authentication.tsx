import React, {useContext, useEffect} from 'react';
import {AuthenticationContext} from '../contexts';
import {useHistory} from 'react-router-dom';

export default function (ComposedComponent: any) {
    function Authenticate(props: any) {
        const history = useHistory();
        const {isAuthenticated} = useContext(AuthenticationContext);

        useEffect(() => {
            if (!localStorage.jwtToken || !isAuthenticated) {
                history.push('/login');
            }
        });

        return (<ComposedComponent {...props}/>);
    }

    return Authenticate;
}

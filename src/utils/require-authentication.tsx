import {useHistory} from 'react-router-dom';
import React, {useEffect} from 'react';

export default function (ComposedComponent: any) {
    function Authenticate(props: any) {
        const history = useHistory();

        useEffect(() => {
            if (!localStorage.jwtToken) {
                history.push('/login');
            }
        });

        return (<ComposedComponent {...props}/>);
    }

    return Authenticate;
}

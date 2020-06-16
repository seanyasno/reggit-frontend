import ILoginPageProps from './login-page-props';
import {useHistory} from 'react-router-dom';
import {LoginForm} from '../../components';
import React, {useEffect} from  'react';
import {connect} from 'react-redux';

const LoginPage = (props: ILoginPageProps) => {
    const history = useHistory();
    useEffect(() => {
        if (props.isAuthenticated) {
            history.push('/');
        }
    });

    return(
      <div>
          <LoginForm/>
      </div>
    );
}

const mapStateToProps = (state: any) => {
    return {
        isAuthenticated: state.authentication.isAuthenticated
    };
}

export default connect(mapStateToProps, null)(LoginPage);
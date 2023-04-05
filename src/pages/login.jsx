import React from 'react';
import LoginForm from "../components/LoginForm/LoginForm";

const Login = (props) => {
    return (
        <LoginForm setToken={props.setToken}/>
    );
};

export default Login;
import React from 'react';
import SignUpForm from "../components/LoginForm/SignUpForm";

const SignUp = (props) => {
    return (
        <SignUpForm setToken={props.setToken} />
    );
};

export default SignUp;
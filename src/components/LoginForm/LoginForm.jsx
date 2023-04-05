import React, {useState} from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";

import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";

const LoginForm = (props) => {
    const navigate = useNavigate();
    const [loginForm, setLoginForm] = useState({
        login: "",
        password: "",
    });
    const handleLogin = async (e) => {
        e.preventDefault();
        axios({
            method: "POST",
            url: "http://127.0.0.1:5001/login",
            data: {
                "login": loginForm.login,
                "password": loginForm.password,
            },
            headers: {
                'Content-Type': 'application/json',
            }
        }).then((response) => {
            const token = response.data['access_token'];
            props.setToken(token);
            const isRedirect = !!(token && token !== "" && token !== undefined && token !== null);
            if (isRedirect) navigate("/todo");
        });
    }
    const handleChange = (event) => {
        const name = event.target.name;
        setLoginForm(prevNote => ({
                ...prevNote, [name]: event.target.value
            })
        )
    };

    return (
        <div className={'d-flex justify-content-center w-100'}>
            <Form className={'mt-3'}>
                <Form.Group
                    className="mb-3"
                    controlId="login"
                    value={loginForm.login}
                    onChange={handleChange}
                    name='login'
                >
                    <Form.Control type="login" placeholder="Логин" name='login'/>
                </Form.Group>
                <Form.Group
                    className="mb-3"
                    controlId="password"
                    value={loginForm.password}
                    onChange={handleChange}
                >
                    <Form.Control type="password" placeholder="Пароль" name="password"/>
                </Form.Group>
                <Button variant="outline-dark" type="submit" className={'w-full'} onClick={handleLogin}>
                    Войти
                </Button>
            </Form>
        </div>
    );
};

export default LoginForm;
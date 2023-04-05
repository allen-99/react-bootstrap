import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from "axios";
import {useNavigate} from "react-router-dom";


const SignUpForm = (props) => {
    const navigate = useNavigate();

    const [signUpForm, setSignUpForm] = useState({
        login: "",
        password: "",
        repPassword: "",
        name: "",
    });
    const handleLogin = async (e) => {
        e.preventDefault();
        axios({
            method: "POST",
            url: "http://127.0.0.1:5001/signup",
            data: {
                "login": signUpForm.login,
                "password": signUpForm.password,
                "password_rep": signUpForm.repPassword,
                "name": signUpForm.name,
            },
            headers: {
                'Content-Type': 'application/json',
            }
        }).then((response) => {
            if (response) {
                const token = response.data['access_token'];
                props.setToken(token);
                navigate("/todo");
            } else {
                alert(response.data);
            }
        });
    }
    const handleChange = (event) => {
        const name = event.target.name;
        setSignUpForm(prevNote => ({
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
                    value={signUpForm.login}
                    onChange={handleChange}
                >
                    <Form.Control type="login" name="login" placeholder="Логин"/>
                </Form.Group>
                <Form.Group
                    className="mb-3"
                    controlId="password"
                    value={signUpForm.password}
                    onChange={handleChange}
                >
                    <Form.Control type="password" name='password' placeholder="Пароль"/>
                </Form.Group>
                <Form.Group
                    className="mb-3"
                    controlId="repPassword"
                    value={signUpForm.repPassword}
                    onChange={handleChange}
                >
                    <Form.Control type="password" name="repPassword" placeholder="Повторите пароль"/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="name" name="name" value={signUpForm.name}
                            onChange={handleChange}>
                    <Form.Control type="name" placeholder="Имя" name='name'/>
                </Form.Group>
                <Button variant="outline-dark" className={'w-full'} type="submit" onClick={handleLogin}>
                    Зарегистрироваться
                </Button>
            </Form>
        </div>
    );
};

export default SignUpForm;
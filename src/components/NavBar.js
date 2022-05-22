import React from "react";
import {Container, Navbar, Nav}
    from 'react-bootstrap';

const NavBar = () => {
    return (
        <Navbar bg="secondary bg-opacity-25" expand="lg">
            <Container>
                <Navbar.Brand className="h2" href="/">TODO</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto h5">
                        <Nav.Link href="/login">Вход</Nav.Link>
                        <Nav.Link href="/todo">Задачи</Nav.Link>
                        <Nav.Link href="/sign-up">Регистрация</Nav.Link>
                        <Nav.Link href="/done-tasks">Готовые задачи</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};
export default NavBar;
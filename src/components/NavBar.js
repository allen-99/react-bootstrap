import React, {useState} from "react";
import {Container, Navbar, Nav, NavDropdown}
    from 'react-bootstrap';
import axios from "axios";
import NewTagModal from "./UI/Modals/NewTagModal";


const NavBar = () => {
    const [modalAddTagShow, setModalAddTagShow] = useState(false)
    const [tag, setTag] = useState({tag_name: '', tag_id: '', _id: ''})

    const showModal = (e) => {
        e.preventDefault()
        setModalAddTagShow(true)
    }

    const addTag = (new_tag) => {

        axios.post('http://localhost:5001/add_tag', {
            tag_name: new_tag
        })
            .then((response) => {
                setTag({
                    tag_id: response.data[1],
                    _id: response.data[0],
                    tag_name: tag.tag_name
                })
                setTag.tag_id = response.data[1]
                setTag._id = response.data[0]
                setTag.tag_name = new_tag
                console.log(tag)
            })
    }
    return (
        <Navbar bg="secondary bg-opacity-25" expand="lg">
            <Container>
                <Navbar.Brand className="h2" href="/">TODO</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto h5">
                        {/*<Nav.Link href="/login">Вход</Nav.Link>*/}
                        <Nav.Link href="/todo">Задачи</Nav.Link>
                        {/*<Nav.Link href="/sign-up">Регистрация</Nav.Link>*/}
                        <Nav.Link href="/done-tasks">Готовые задачи</Nav.Link>
                        <NavDropdown title="Тег" id="basic-nav-dropdown">
                            <NavDropdown.Item onClick={(e) => showModal(e)}>Добавить тег</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Показать теги</NavDropdown.Item>
                        </NavDropdown>
                        <NewTagModal
                            show={modalAddTagShow}
                            onHide={() => setModalAddTagShow(false)}
                            newMessage={addTag}
                        />
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};
export default NavBar;
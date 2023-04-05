import React, {useEffect, useState} from "react";
import {Nav, Navbar, NavDropdown} from 'react-bootstrap';
import ShowTagsModal from "../components/modals/ShowTagsModal";
import NewTagModal from "../components/modals/NewTagModal";
import axios from "axios";
import TodoLogo from "../components/UI/TodoLogo";
import UserIcon from "../components/UI/UserIcon";

const HeaderBar = ({token, removeToken}) => {
    const [tags, setTags] = useState([]);
    const [modalAddTagShow, setModalAddTagShow] = useState(false);
    const [modalTagsShow, setModalTagsShow] = useState(false);
    const [tag, setTag] = useState({name: '', id: ''});
    const [user, setUser] = useState({name: '', login: ''})
    const isAuth = () => {
        return !!(token && token !== "" && token !== undefined && token !== null);
    }

    useEffect(() => {
        const fetchData = () => {
            axios({
                method: "GET",
                url: 'http://127.0.0.1:5001/user',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            })
                .then((response) => {
                    setUser(response.data)
                })

        };
        fetchData();
    }, []);

    const get_tags = () => {
        axios({
            method: 'GET',
            url: 'http://127.0.0.1:5001/tags',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        })
            .then((response) => {
                setTags(response.data)
            })
    }

    const showModal = (e) => {
        e.preventDefault()
        setModalAddTagShow(true)

    }
    const showTagsModal = (e) => {
        e.preventDefault()
        get_tags()
        setModalTagsShow(true)
    }

    const addTag = (new_tag) => {
        axios({
            method: "POST",
            url: 'http://127.0.0.1:5001/tags',
            data: {
                name: new_tag,
            },
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        })
            .then((response) => {
                setTag(response.data)
                setTags([...tags, tag]);
            })
    }
    return (
        <Navbar bg="secondary bg-opacity-25 px-4" expand="lg" sticky="top">
            <Navbar.Brand href="/"><TodoLogo/></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav" className={'visible w-full'}>
                <Nav className="justify-between flex w-full h-full">
                    <div className={'me-auto h5 flex items-center mb-0'}>
                        {!isAuth() && <Nav.Link href="/login">Вход</Nav.Link>}
                        {!isAuth() && <Nav.Link href="/sign-up">Регистрация</Nav.Link>}
                        {isAuth() && <Nav.Link href="/todo">Задачи</Nav.Link>}
                        {isAuth() && <Nav.Link href="/done-tasks">Готовые задачи</Nav.Link>}
                        {isAuth() && <NavDropdown title="Тег" id="basic-nav-dropdown">
                            <NavDropdown.Item onClick={(e) => showModal(e)}>Добавить тег</NavDropdown.Item>
                            <NavDropdown.Item onClick={(e) => showTagsModal(e)}>Показать теги</NavDropdown.Item>
                        </NavDropdown>}
                        <NewTagModal
                            show={modalAddTagShow}
                            onHide={() => setModalAddTagShow(false)}
                            newMessage={addTag}
                        />
                        <ShowTagsModal
                            show={modalTagsShow}
                            tags={tags}
                            token={token}
                            setTags={setTags}
                            onHide={() => setModalTagsShow(false)}
                        />
                        {isAuth() &&
                            <Nav.Item className="btn btn-link h-10" onClick={removeToken}>Выйти</Nav.Item>
                        }
                    </div>
                    <div className={'flex justify-center'}>
                        <Navbar.Text className={'font-bold h5'}>
                            {user ? (
                                <div className={'flex justify-center'}>
                                    <UserIcon/>
                                    <span>{user.name}</span>
                                </div>
                            ) : (<div/>)}
                        </Navbar.Text>
                    </div>

                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};
export default HeaderBar;
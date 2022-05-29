import React, {useState, useEffect} from 'react';
import TaskItem from "../UI/TaskItem/TaskItem";
import Taska from '../Taska'
import InputForm from "../UI/Input/inputForm";
import {useFetching} from "../../hooks/useFetching";
import {usePosts} from '../../hooks/usePosts'
import {TodosService} from "../../API/TodosService";
import TaskList from "../TaskList";
import MyModal from "../UI/Modals/MyModal";
import EditModal from '../UI/Modals/EditModal'
import axios from "axios";
import {Dropdown, Row, DropdownButton, Container, Col} from 'react-bootstrap';
import Select from '../Select';

const ColumnItem = ({column, editColumn, removeColumn}) => {

    const [todos, setTodos] = useState([])
    const [answer, setAnswer] = useState({message: ''})
    const [filterTodos, setFilterTodos] = useState(todos)
    const [modalShow, setModalShow] = useState(false);
    const [editModalShow, setEditModalShow] = useState(false);
    const [filter, setFilter] = useState({sort: '', query: ''})
    const sortedAndFilteredTodos = usePosts(todos, filter.sort, filter.query)
    const [editingTodo, setEditingTodo] = useState(
        {
            header: '',
            place: '',
            text: '',
            date_begin: '',
            date_end: '',
            tag: '',
            group_id: column.group_id,
            _id: '',
            is_done: '',
            tag_name: ''
        })
    const [newTodo, setNewTodo] = useState(
        {
            header: '',
            place: '',
            text: '',
            date_begin: '',
            date_end: '',
            tag: '',
            group_id: column.group_id,
            _id: '',
            is_done: '',
            tag_name: ''
        })

    const [tags, setTags] = useState([])

    const get_tags = () => {
        axios.get('http://localhost:5001/tags')
            .then((response) => {
                setTags(response.data)
            })
    }

    useEffect(() => {
        fetch('http://localhost:5001/todos/' + column.group_id, {
            'methods': 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(response => {
                setTodos(response)
            })
            .catch(error => console.log(error))
    }, [column.group_id])

    const show_modal = (e) => {
        e.preventDefault()
        get_tags()
        setModalShow(true)

    }

    const delete_todo = (todo_id) => {
        setTodos(todos.filter(m => m._id !== todo_id))
        axios.post('http://localhost:5001/delete_todo', {
            _id: todo_id
        })
            .then((response) => {
                setAnswer(response.data)
            })
    }

    const click_on_edit_button = (todo) => {
        setEditModalShow(true)
        get_tags()
        setEditingTodo(todo)
    }

    const editedTodo = (todo) => {
        axios.post('http://localhost:5001/edit_todo', {
            group_id: column.group_id,
            header: todo.header,
            place: todo.place,
            date_begin: todo.date_begin,
            date_end: todo.date_end,
            text: todo.text,
            tag_id: todo.tag_id,
            _id: todo._id,
            is_done: todo.is_done
        })
            .then((response) => {
                console.log(response.data)
                todo.tag_name = response.data.tag_name
                setTodos(todos.filter(m => m._id !== todo._id))
                setTodos([...todos, todo])

            })
    }

    // console.log(sortedAndFilteredTotos)
    // console.log(filter)
    const newMessage = (message) => {
        setNewTodo({...newTodo})
        axios.post('http://localhost:5001/todos', {
            group_id: column.group_id,
            header: message.header,
            place: message.place,
            date_begin: message.date_begin,
            date_end: message.date_end,
            text: message.text,
            tag_id: message.tag_id
        })
            .then((response) => {
                setAnswer(response.data) //_id
                message._id = response.data.todo_id
                message.tag_name = response.data.tag_name
                setTodos([...todos, message])
            })
    }

    const done_todo = (todo_id) => {
        setTodos(todos.filter(m => m._id !== todo_id))
        axios.post('http://localhost:5001/done_todo', {
            _id: todo_id
        })
            .then((response) => {
                setAnswer(response.data)
            })
    }

    return (
        <Row className={'col list-group min-vw-30 m-2 col-sm-3'}>
            <div className={'bg-light'}>
                <Container>
                    <Row className={'py-3'}>
                        <Col className={'display-6 '}>
                            {column.group_name}
                        </Col>
                        <Col className={"col-3 p-1"}>
                            <DropdownButton id="dropdown-secondary-button"
                                            title=''
                                            variant={'outline-secondary'}>

                                <Dropdown.Item onClick={() => editColumn(column)}>Изменить</Dropdown.Item>
                                <Dropdown.Item onClick={() => removeColumn(column)}>Удалить</Dropdown.Item>
                            </DropdownButton>
                        </Col>
                    </Row>
                    <Select filter={filter} setFilter={setFilter}/>
                </Container>

                <TaskList messages={todos}
                          delete_todo={delete_todo}
                          edit_todo={click_on_edit_button}
                          done_todo={done_todo}
                />
            </div>
            <InputForm onClick={(e) => show_modal(e)}/>
            <MyModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                newMessage={newMessage}
                tags={tags}
            />
            <EditModal
                show={editModalShow}
                onHide={() => setEditModalShow(false)}
                oldTodo={editingTodo}
                setOldTodo={setEditingTodo}
                newMessage={editedTodo}
                tags={tags}
            />
        </Row>

    );
};

export default ColumnItem;
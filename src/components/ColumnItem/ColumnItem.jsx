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
import {Dropdown, Row} from 'react-bootstrap';
import Select from '../Select';

const ColumnItem = ({column}) => {

    const [todos, setTodos] = useState([])
    const [answer, setAnswer] = useState({message: ''})
    const [filterTodos, setFilterTodos] = useState(todos)
    const [modalShow, setModalShow] = useState(false);
    const [editModalShow, setEditModalShow] = useState(false);
    const [filter, setFilter] = useState({sort: '', query: ''})
    const sortedAndFilteredTotos = usePosts(todos, filter.sort, filter.query)
    const [editingTodo, setEditingTodo] = useState(
        {header: '', place: '', text: '', date_begin: '', date_end: '', tag: '', group_id: column.group_id})
    const [newTodo, setNewTodo] = useState(
        {header: '', place: '', text: '', date_begin: '', date_end: '', tag: '', group_id: column.group_id})


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

    const  show_modal = (e) => {
        e.preventDefault();
        setModalShow(true)
    }

    const delete_todo = (task_id) => {
        console.log('delete')
        setTodos(todos.filter(m => m._id !== task_id))
        axios.post('http://localhost:5001/delete_todo', {
            _id: task_id
        })
            .then((response) => {
                setAnswer(response.data)
                console.log(answer)
                console.log(response.data)
            })
    }

    const click_on_edit_button = (task) => {
        setEditModalShow(true)
        setEditingTodo(task)
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
            _id: todo._id
        })
            .then((response) => {
                setAnswer(response.data) //_id
            })
        setTodos(todos.filter(m => m._id !== todo._id))
        setTodos([...todos, todo])
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
                message._id = response.data
            })
        setTodos([...todos, message])

    }
    return (
        <Row className={'col list-group min-vw-30 m-2 col-sm-3'} >
            <div className={'bg-light'}>
                <p className={"p-3 h5 bg-light"}>{column.group_name}  </p>
                <Select filter={filter} setFilter={setFilter}/>
                <TaskList messages={todos}
                          delete_todo={delete_todo}
                          edit_todo={click_on_edit_button}
                />
            </div>
            <InputForm onClick={(e) => show_modal(e)}/>
            <MyModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                newMessage={newMessage}
            />
            <EditModal
                show={editModalShow}
                onHide={() => setEditModalShow(false)}
                oldTodo={editingTodo}
                setOldTodo={setEditingTodo}
                newMessage={editedTodo}
            />
        </Row>

    );
};

export default ColumnItem;
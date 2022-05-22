import React, {usePosts, useState, useEffect} from 'react';
import TaskItem from "../UI/TaskItem/TaskItem";
import Taska from '../Taska'
import InputForm from "../UI/Input/inputForm";
import Select from "../UI/Select/Select";
import {useFetching} from "../../hooks/useFetching";
import {TodosService} from "../../API/TodosService";
import TaskList from "../TaskList";
import MyModal from "../UI/MyModal";
import axios from "axios";

const ColumnItem = ({column}) => {

    const [todos, setTodos] = useState([]);

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
                console.log(todos)
                console.log(response)
            })
            .catch(error => console.log(error))
    }, [])


    const [modalShow, setModalShow] = React.useState(false);

    function show(e) {
        e.preventDefault();
        setModalShow(true)
    }

    function print(e) {
        e.preventDefault();

        console.log(todos)
    }

    // useEffect(() => {
    //          fetch('http://localhost:5001/todos' , {
    //              'methods': 'POST',
    //              body: JSON.stringify(todo),
    //              headers: {
    //                  'Content-Type': 'application/json'
    //              }
    //          })
    //              .then(response => response.json())
    //              .then(response => {
    //                  setAnswer(response)
    //                  console.log(answer)
    //                  console.log(response)
    //              })
    //              .catch(error => console.log(error))
    //          },[])

    const [newTodo, setNewTodo] = useState(
        {name: '', place: '', text: '', date_begin:'', date_end: '', tag: '', group_id: column.group_id})
    const newMessage = (message) => {
        setNewTodo(message)
        console.log(newTodo)
        console.log(message)
    }
    return (
        <div className={'col list-group min-vw-30 m-2 col-3 '}>
            <div className={'bg-light'}>
                <p className={"p-3 h5 bg-light"}>{column.group_name} </p>
                <form className="d-flex m-3">
                    <input className="form-control me-2 " type="search" placeholder="Поиск..." aria-label="Search"/>
                    <button className="btn btn-outline-success"
                            type="submit"
                            onClick={(e) => print(e)}>
                        Поиск
                    </button>
                </form>
                <Select/>
                <TaskList messages={todos}/>
            </div>
            <InputForm onClick={(e) => show(e)}/>
            <MyModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                newMessage={newMessage}

            />
        </div>

    );
};

export default ColumnItem;
import React, {useEffect, useState} from 'react';
import {Button, Table} from 'react-bootstrap'
import {CSSTransition, TransitionGroup} from "react-transition-group";
import Taska from "../components/Taska";

const DoneTasks = () => {

    const [doneTodo, setDoneTodo] = useState([])
    const [columns, setColumns] = useState([])


    useEffect(() => {
        fetch('http://localhost:5001/done_todo', {
            'methods': 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(response => {
                setDoneTodo(response)
            })
            .catch(error => console.log(error))
    }, []) //todos
    useEffect(() => {
        fetch('http://localhost:5001/columns', {
            'methods': 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(response => {
                setColumns(response)
            })
            .catch(error => console.log(error))
    }, []) //columns


    doneTodo.map((todo) => {
        const groupName = columns.filter((column) => todo.group_id === column.group_id)[0].group_name
        todo['group'] = groupName
        const tagName = 's'
        console.log(todo)
    })
    return (
        <Table striped bordered hover>
            <thead>
            <tr>
                <th>#</th>
                <th>Название задачи</th>
                <th>Место</th>
                <th>Описание</th>
                <th>Дата начала</th>
                <th>Дата окончания</th>
                <th>Название столбца</th>
                <th>Тэг</th>
            </tr>
            </thead>
            <tbody>
            {doneTodo.map((todo) =>
                <tr>
                    <td>
                        <Button variant={"secondary"}>
                            Удалить
                        </Button>
                    </td>
                    <td>{todo.header}</td>
                    <td>{todo.place}</td>
                    <td>{todo.text}</td>
                    <td>{todo.date_begin}</td>
                    <td>{todo.date_end}</td>
                    <td>{todo.group}</td>
                    <td>{todo.tag_id}</td>
                </tr>
            )}
            </tbody>
        </Table>
    );
};

export default DoneTasks;
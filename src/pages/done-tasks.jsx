import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Table} from "react-bootstrap";
import DeleteButton from "../components/UI/DeleteButton";
import UnDoneButton from "../components/UI/UnDoneButton";

const DoneTasks = ({token}) => {
    const correctDataFormat = (iso) => {
        const dateBegin = new Date(iso);
        let formattedDateBegin = dateBegin.toLocaleString('ru-RU', {
            timeZone: 'UTC',
            hour12: false,
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        });
        if (iso === '') {
            formattedDateBegin = '';
        }
        return formattedDateBegin
    };
    const [doneTodos, setDoneTodos] = useState([]);

    useEffect(() => {
        const fetchData = () => {
            axios({
                method: "GET",
                url: 'http://127.0.0.1:5001/done_todo',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            }).then((response) => {
                setDoneTodos(response.data)
            })
        };
        fetchData();
    }, []);
    const delete_todo = (todo) => {
        axios({
            method: "DELETE",
            url: 'http://127.0.0.1:5001/todos',
            data: {
                id: todo.id,
            },
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        }).then(() => {
            setDoneTodos(doneTodos.filter(to => to.id !== todo.id));
        })
    };

    const undone_todo = (todo) => {
        axios({
            method: "POST",
            url: 'http://127.0.0.1:5001/done_todo',
            data: {
                id: todo.id,
                is_done: false,
            },
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        }).then(() => {
            setDoneTodos(doneTodos.filter(to => to.id !== todo.id));
        })
    }
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
            </tr>
            </thead>
            <tbody>
            {doneTodos.map((todo) =>
                <tr>
                    <td className={'w-4'}>
                        <DeleteButton onClick={() => delete_todo(todo)}/>
                        <UnDoneButton onClick={() => undone_todo(todo)}/>
                    </td>
                    <td>{todo.header}</td>
                    <td>{todo.place}</td>
                    <td>{todo.description}</td>
                    <td>{correctDataFormat(todo.date_begin_timestamp)}</td>
                    <td>{correctDataFormat(todo.date_end_timestamp)}</td>
                </tr>
            )}
            </tbody>
        </Table>
    );
};

export default DoneTasks;
import React, {useState} from 'react';
import {Accordion, Button, ButtonGroup, Card, Form} from 'react-bootstrap';
import OpenTodoButton from "../UI/OpenTodoButton";
import TodoModal from "../modals/TodoModal";
import axios from "axios";

const TodoItem = ({todo, delete_todo, done_todo, token, tags, setTodosWithEdit}) => {
    const dateBegin = new Date(todo.date_begin_timestamp);
    const formattedDateBegin = dateBegin.toLocaleString('ru-RU', {
        timeZone: 'UTC',
        hour12: false,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    });
    const dateEnd = new Date(todo.date_end_timestamp);
    const formattedDateEnd = dateEnd.toLocaleString('ru-RU', {
        timeZone: 'UTC',
        hour12: false,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    });
    const [modalEditShow, setModalEditShow] = useState(false);


    const showEditModal = (e) => {
        e.preventDefault();
        setModalEditShow(true);
    };
    const doEditTodo = (todo) => {
        axios({
            method: "PUT",
            url: 'http://127.0.0.1:5001/todos',
            data: {
                id: todo.id,
                header: todo.header,
                place: todo.place,
                tag_id: todo.tag_id,
                group_id: todo.group_id,
                date_begin_timestamp: todo.date_begin,
                date_end_timestamp: todo.date_end,
                description: todo.description,
                is_done: todo.is_done,
            },
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        })
            .then((response) => {
                setTodosWithEdit(response.data)
            })
    };


    return (
        <div>
            <div className={'flex justify-content-between px-2'}>
                <Form.Check
                    className={'py-2 text-lg pl-4'}
                    type={'checkbox'}
                    onChange={() => done_todo(todo)}
                    id={`default-checkbox`}
                    label={todo.header}
                />
                <OpenTodoButton eventKey={todo.id}/>
            </div>
            <Accordion.Item className={"h-25 rounded-md"}
                            eventKey={todo.id}
            >
                <Accordion.Body className={'visible'}>
                    <Card.Body>
                        {todo.tag_name &&
                            <div
                                className="w-full bg-secondary h-6 rounded text-center leading-8 font-medium text-white my-2 h-8 text-lg opacity-50">
                                {todo.tag_name}
                            </div>
                        }
                        {todo.date_begin_timestamp && <p><b> Дата начала: </b> {formattedDateBegin} </p>}
                        {todo.date_end_timestamp && <p><b>Дата окончания: </b> {formattedDateEnd}</p>}
                        {todo.place && <p><b>Место: </b>{todo.place}</p>}
                        {todo.description && <p><b>Описание: </b>{todo.description}</p>}

                        <ButtonGroup className={'w-full mt-2'}>
                            <Button variant="outline-secondary" onClick={(e) => showEditModal(e)}>Изменить</Button>
                            <Button variant="outline-danger" onClick={() => delete_todo(todo)}>Удалить</Button>
                        </ButtonGroup>
                    </Card.Body>
                </Accordion.Body>
            </Accordion.Item>
            <TodoModal
                show={modalEditShow}
                onHide={() => setModalEditShow(false)}
                newTodo={doEditTodo}
                tags={tags}
                isEdit={true}
                editTodo={todo}
            />
        </div>
    );
};

export default TodoItem;
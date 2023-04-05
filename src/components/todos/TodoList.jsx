import React from 'react';
import {Accordion} from "react-bootstrap";
import TodoItem from "./TodoItem";
import axios from "axios";

const TodoList = ({todos, token, tags, setTodosWithEdit, removeTodoFromList}) => {

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
            removeTodoFromList(todo);
        })
    };

    const done_todo = (todo) => {
        axios({
            method: "POST",
            url: 'http://127.0.0.1:5001/done_todo',
            data: {
                id: todo.id,
            },
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        }).then(() => {
            removeTodoFromList(todo);
        })
    };

    return (
        <Accordion className={'mt-4'}>
            {todos.map((todo) =>
                <TodoItem todo={todo}
                          delete_todo={delete_todo}
                          done_todo={done_todo}
                          token={token}
                          tags={tags}
                          setTodosWithEdit={setTodosWithEdit}
                />
            )}
        </Accordion>
    );
};

export default TodoList;
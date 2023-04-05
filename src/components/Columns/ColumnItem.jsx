import React, {useMemo, useState} from 'react';
import {Container, Dropdown, DropdownButton, Row} from "react-bootstrap";
import Select from "../Select";
import TodoList from "../todos/TodoList";
import AddTodoButton from "./AddTodoButton";
import TodoModal from "../modals/TodoModal";
import axios from "axios";

const ColumnItem = ({column, tags, todos, token, editColumn, removeColumn, setTodosWithChanges}) => {
    const [filter, setFilter] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    const [modalShow, setModalShow] = useState(false);
    const [tagsFilter, setTagsFilter] = useState(() => {
        return tags.reduce((checkboxes, tag) => {
            checkboxes[tag.id] = true;
            return checkboxes;
        }, {});
    });

    const sortTodos = (filter) => {
        setFilter(filter);
    };

    const sortedTodos = useMemo(() => {
        const items = {
            "Названию": 'header',
            "Описанию": 'description',
        }
        if (filter) {
            return [...todos].sort((a, b) => a[items[filter]].localeCompare(b[items[filter]]))
        }
        return todos
    }, [filter, todos]);

    const sortedAndSearchedTodos = useMemo(() => {
        if (Object.keys(tagsFilter).length !== 0) {
            const arr = sortedTodos.filter(todo => todo.header.includes(searchQuery));
            return arr.filter(todo => {
                if (tagsFilter[todo.tag_id]) {
                    return todo;
                }
                return false;
            });
        }
        return sortedTodos.filter(todo => todo.header.includes(searchQuery));
    }, [sortedTodos, searchQuery, tagsFilter]);

    const addNewTodo = (newTodo) => {
        axios({
            method: "POST",
            url: 'http://127.0.0.1:5001/todos',
            data: {
                header: newTodo.header,
                place: newTodo.place,
                tag_id: newTodo.tag_id,
                group_id: column.id,
                date_begin_timestamp: newTodo.date_begin,
                date_end_timestamp: newTodo.date_end,
                description: newTodo.description,
                is_done: newTodo.is_done,
            },
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        })
            .then((response) => {
                newTodo = response.data;
                setTodosWithChanges(newTodo, true, false);
            })
    };

    const showNewTodoModal = (e) => {
        e.preventDefault();
        setModalShow(true);
    };

    const setTodosWithEdit = (editTodo) => {
        setTodosWithChanges(editTodo, true, true);
    }

    const removeTodoFromList = (todo) => {
        setTodosWithChanges(todo, false, false);
    }


    return (
        <Row className={'m-2 w-[330px] rounded-md bg-light shadow h-full'}>
            <div className={'p-3'}>
                <Container className={'p-0'}>
                    <div className={'flex justify-between items-end'}>
                        <div className={'text-3xl truncate'}>
                            {column.name}
                        </div>
                        <DropdownButton id="dropdown-secondary-button"
                                        title=''
                                        variant={'outline-link'}
                        >

                            <Dropdown.Item onClick={() => editColumn(column)}>Изменить</Dropdown.Item>
                            <Dropdown.Item onClick={() => removeColumn(column)}>Удалить</Dropdown.Item>
                        </DropdownButton>
                    </div>
                    <Select
                        filter={filter}
                        setSearchQuery={setSearchQuery}
                        searchQuery={searchQuery}
                        sortPost={sortTodos}
                        setTagsFilter={setTagsFilter}
                        tags={tags}
                    />
                </Container>
                {
                    sortedAndSearchedTodos.length ? (
                        <TodoList
                            todos={sortedAndSearchedTodos}
                            token={token}
                            tags={tags}
                            setTodosWithEdit={setTodosWithEdit}
                            removeTodoFromList={removeTodoFromList}
                        />

                    ) : (
                        <div className={'my-3 leading-6 text-2xl'}>Нет задач</div>
                    )
                }
            </div>
            <hr/>
            <AddTodoButton onClick={(e) => showNewTodoModal(e)}/>
            <TodoModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                newTodo={addNewTodo}
                tags={tags}
                isEdit={false}
            />
        </Row>
    );
};

export default ColumnItem;
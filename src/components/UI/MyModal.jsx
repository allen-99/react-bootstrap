import React, {useEffect, useState} from 'react';
import {Modal} from 'react-bootstrap'
import {Button, InputGroup, FormControl, FloatingLabel, Form} from 'react-bootstrap';

const MyModal = (props) => {

    const [todo, setTodo] = useState(
        {name: '', place: '', text: '', date_begin: '', date_end: '', tag: ''})
    const [answer, setAnswer] = useState({message:''})

    const AddNewMessage = (e) => {
        e.preventDefault()
        props.newMessage(todo)
        console.log(todo)
        props.onHide()
        }
        return (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Добавить задачу
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Название задачи"
                        className="mb-3"
                    >
                        <Form.Control type="text"
                                      value={todo.name}
                                      onChange={e => setTodo({...todo, name: e.target.value})}
                                      placeholder="Купить молоко"/>
                    </FloatingLabel>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Место"
                        className="mb-3"
                    >
                        <Form.Control type="text"
                                      value={todo.place}
                                      onChange={e => setTodo({...todo, place: e.target.value})}
                                      placeholder="ДВФУ"/>
                    </FloatingLabel>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Описание задачи"
                        className="mb-3"
                    >
                        <Form.Control type="text"
                                      placeholder="Купить очень много молока в магазине"
                                      as="textarea"
                                      value={todo.text}
                                      onChange={e => setTodo({...todo, text: e.target.value})}
                                      style={{height: '100px'}}/>
                    </FloatingLabel>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Дата начала"
                        className="mb-3"
                    >
                        <Form.Control type="text"
                                      value={todo.date_begin}
                                      onChange={e => setTodo({...todo, date_begin: e.target.value})}
                                      placeholder="12.11.2020"/>
                    </FloatingLabel>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Дата окончания"
                        className="mb-3"
                    >
                        <Form.Control type="text"
                                      value={todo.date_end}
                                      onChange={e => setTodo({...todo, date_end: e.target.value})}
                                      placeholder="13.11.2021"/>
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingSelect"
                                   label="Выберете нужное">
                        <Form.Select aria-label="Выбрать тэг"
                                     value={todo.tag}
                                     onChange={e => setTodo({...todo, tag: e.target.value})}>
                            <option>Не выбрано</option>
                            <option value={todo.tag}>Срочно</option>
                            <option value={todo.tag}>Не очень</option>
                            <option value={todo.tag}>Подождет</option>
                        </Form.Select>
                    </FloatingLabel>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={AddNewMessage}>Добавить</Button>
                    <Button variant="secondary" onClick={props.onHide}>Закрыть</Button>
                </Modal.Footer>
            </Modal>
        );
    };

    export default MyModal;
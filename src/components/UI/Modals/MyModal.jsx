import React, {useEffect, useState} from 'react';
import {Modal} from 'react-bootstrap'
import {Button, InputGroup, FormControl, FloatingLabel, Form} from 'react-bootstrap';
import moment from 'moment'


const MyModal = (props) => {

    const [todo, setTodo] = useState(
        {header: '', place: '', text: '', date_begin: '', date_end: '', tag_id: ''})


    const AddNewMessage = (e) => {
        e.preventDefault()
        let a = document.getElementById('header')
        if (todo.header === '') {
            a.className += ' is-invalid'
        } else {
            a.className = 'form-control';

            let date_b = document.getElementById('date_begin')
            let date_e = document.getElementById('date_end')
            let equal = 0

            if (todo.date_begin !== '' && (!moment(todo.date_begin, "DD.MM.YYYY", true).isValid())) {
                date_b.className += ' is-invalid'
            } else {
                date_b.className = 'form-control';
                equal++
            }
            if (todo.date_end !== '' && (!moment(todo.date_end, "DD.MM.YYYY", true).isValid())) {
                date_e.className += ' is-invalid'

            } else {
                date_e.className = 'form-control';
                equal++
            }

            if (equal === 2 && todo.date_begin !== '' && todo.date_end !== '') {
                const [day_b, month_b, year_b] = todo.date_begin.split('.')
                const [day_e, month_e, year_e] = todo.date_end.split('.')

                const date_begin_correct_format = year_b + '-' + month_b + '-' + day_b
                const date_end_correct_format = year_e + '-' + month_e + '-' + day_e

                if (Date.parse(date_begin_correct_format) > Date.parse(date_end_correct_format)) {
                    date_e.className += ' is-invalid'
                    date_b.className += ' is-invalid'
                    equal = 3
                }
            }
            if ((todo.date_begin === '' || todo.date_end === '') && equal !== 3) {
                date_b.className = 'form-control';
                date_e.className = 'form-control';
                props.newMessage(todo)
                setTodo({header: '', place: '', text: '', date_begin: '', date_end: '', tag_id: ''})
                props.onHide()
            } else {
                if (!(date_b.classList.contains('is-invalid')) && !(date_e.classList.contains('is-invalid'))) {
                    props.newMessage(todo)
                    setTodo({header: '', place: '', text: '', date_begin: '', date_end: '', tag_id: ''})
                    props.onHide()
                }

            }

        }

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
                    label="Название задачи"
                    className="mb-3"
                >
                    <Form.Control type="text"
                                  id='header'
                                  value={todo.header}
                                  onChange={e => setTodo({...todo, header: e.target.value})}
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
                    className="mb-3"
                >
                    <InputGroup className="">
                        <Form.Control type="text"
                                      aria-label="12.11.2020"
                                      value={todo.date_begin}
                                      id='date_begin'
                                      onChange={e => setTodo({...todo, date_begin: e.target.value})}
                                      placeholder="Дата начала"/>
                    </InputGroup>
                </FloatingLabel>
                <FloatingLabel
                    className="mb-3"
                >
                    <InputGroup className="">
                        <Form.Control type="text"
                                      aria-label="12.11.2020"
                                      value={todo.date_end}
                                      id='date_end'
                                      onChange={e => setTodo({...todo, date_end: e.target.value})}
                                      placeholder="Дата окончания"/>
                    </InputGroup>
                </FloatingLabel>
                <FloatingLabel
                    controlId="floatingSelect"
                    label="Выберите тэг">
                    <Form.Select aria-label="Выбрать тег"
                                 value={todo.tag_id}
                                 type='text'
                                 onChange={e => setTodo({...todo, tag_id: e.target.value})}>
                        <option value='0'>Не выбрано</option>
                        {props.tags.map((tag) =>
                            <option value={tag.tag_id}>{tag.tag_name}</option>
                        )}
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
import React, {useState} from 'react';
import {FloatingLabel, FormControl, FormLabel, Modal} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import moment from 'moment';
import Form from "react-bootstrap/Form";


const TodoModal = (props) => {
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

    const [todo, setTodo] = useState(() => {
        if (props.isEdit && props.editTodo) {
            const formattedDateBegin = correctDataFormat(props.editTodo.date_begin_timestamp);
            const formattedDateEnd = correctDataFormat(props.editTodo.date_end_timestamp);

            return {
                header: props.editTodo.header,
                id: props.editTodo.id,
                place: props.editTodo.place,
                description: props.editTodo.description,
                date_begin: formattedDateBegin,
                date_end: formattedDateEnd,
                tag_id: props.editTodo.tag_id,
            };
        }
        return {header: '', place: '', description: '', date_begin: '', date_end: '', tag_id: 0};
    });


    const addNewTodo = (e) => {
        e.preventDefault();

        let a = document.getElementById('header');
        if (todo.header === '') {
            a.className += ' is-invalid';
            return;
        }

        a.className = 'form-control';

        let date_b = document.getElementById('date_begin')
        let date_e = document.getElementById('date_end')

        if (todo.date_begin !== '' && (!moment(todo.date_begin, "DD.MM.YYYY", true).isValid())) {
            date_b.className += ' is-invalid'
            return;
        }

        date_b.className = 'form-control';

        if (todo.date_end !== '' && (!moment(todo.date_end, "DD.MM.YYYY", true).isValid())) {
            date_e.className += ' is-invalid'
            return;
        }
        date_e.className = 'form-control';


        if (todo.date_begin !== '' && todo.date_end !== '') {
            const [day_b, month_b, year_b] = todo.date_begin.split('.')
            const [day_e, month_e, year_e] = todo.date_end.split('.')

            const date_begin_correct_format = year_b + '-' + month_b + '-' + day_b;
            const date_end_correct_format = year_e + '-' + month_e + '-' + day_e;

            if (Date.parse(date_begin_correct_format) > Date.parse(date_end_correct_format)) {
                date_e.className += ' is-invalid';
                date_b.className += ' is-invalid';
                return;
            }
            todo.date_begin = new Date(date_begin_correct_format).getTime();
            todo.date_end = new Date(date_end_correct_format).getTime();
        }
        if (todo.date_begin === '' || todo.date_end === '') {
            date_b.className = 'form-control';
            date_e.className = 'form-control';
            props.newTodo(todo);
            if (!props.isEdit) {
                setTodo({header: '', place: '', description: '', date_begin: '', date_end: '', tag_id: ''});
            }
            props.onHide();
        } else if (!(date_b.classList.contains('is-invalid')) && !(date_e.classList.contains('is-invalid'))) {
            props.newTodo(todo)
            if (!props.isEdit) {
                setTodo({header: '', place: '', description: '', date_begin: '', date_end: '', tag_id: ''});
            }
            todo.date_begin = correctDataFormat(todo.date_begin);
            todo.date_end = correctDataFormat(todo.date_end);
            props.onHide();
        }
    };

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                {props.isEdit ? (
                    <Modal.Title id="contained-modal-title-vcenter">
                        Изменить задачу
                    </Modal.Title>
                ) : (
                    <Modal.Title id="contained-modal-title-vcenter">
                        Добавить задачу
                    </Modal.Title>
                )}
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group hasValidation>
                        <FloatingLabel
                            label="Название задачи"
                            className="mb-3"
                        >
                            <FormControl type="text"
                                         id='header'
                                         value={todo.header}
                                         onChange={e => setTodo({...todo, header: e.target.value})}
                                         placeholder="Купить молоко"
                                         required
                            />
                        </FloatingLabel>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Место"
                            className="mb-3"
                        >
                            <FormControl type="text"
                                         value={todo.place}
                                         onChange={e => setTodo({...todo, place: e.target.value})}
                                         placeholder="ДВФУ"/>
                        </FloatingLabel>
                        <FloatingLabel
                            label="Описание задачи"
                            className="mb-2"
                        >
                            <FormControl type="text"
                                         placeholder="Купить очень много молока в магазине"
                                         as="textarea"
                                         value={todo.description}
                                         onChange={e => setTodo({...todo, description: e.target.value})}
                                         style={{height: '100px'}}/>
                        </FloatingLabel>
                        <FormLabel className="ml-1">Дата начала</FormLabel>
                        <FormControl type="text"
                                     aria-label="12.12.2020"
                                     value={todo.date_begin}
                                     id='date_begin'
                                     onChange={e => setTodo({...todo, date_begin: e.target.value})}
                                     placeholder="12.11.2020"
                                     className={'mb-2'}
                        />
                        <FormLabel className="ml-1">Дата окончания</FormLabel>
                        <FormControl type="text"
                                     aria-label="12.11.2020"
                                     value={todo.date_end}
                                     id='date_end'
                                     onChange={e => setTodo({...todo, date_end: e.target.value})}
                                     placeholder="12.11.2020"
                                     className={'mb-3'}
                        />
                        <FormLabel className="ml-1">Выберите тег</FormLabel>
                        <FormControl as='select'
                                     aria-label="Выбрать тег"
                                     value={todo.tag_id}
                                     id='tag'
                                     onChange={e => setTodo({...todo, tag_id: e.target.value})}
                        >
                            <option value='0' key={0}>Не выбрано</option>
                            {props.tags.map((tag) =>
                                tag.id ? (<option key={tag.id} value={tag.id}>{tag.name}</option>) : ''
                            )}
                        </FormControl>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                {props.isEdit ? (
                    <Button variant="outline-dark" onClick={addNewTodo}>Изменить</Button>
                ) : (
                    <Button variant="outline-dark" onClick={addNewTodo}>Добавить</Button>
                )}
                <Button variant="outline-secondary" onClick={props.onHide}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default TodoModal;
import React, {useEffect, useState} from 'react';
import {ButtonGroup, Button, Accordion, Form} from 'react-bootstrap'

const TaskInfo = ({task, delete_todo, edit_todo, done_todo}) => {


    return (
        <Accordion.Body>
            <div className="card card-body">
                {task.tag_name &&
                <Button variant="outline-dark" size="" disabled>
                    {task.tag_name}
                </Button>}
                <p>  </p>
                {task.date_begin && <p>Дата начала: {task.date_begin} </p>}
                {task.date_end && <p>Дата окончания: {task.date_end}</p>}
                {task.place && <p>Место: {task.place}</p>}
                {task.text && <p>Описание: {task.text}</p>}

                <ButtonGroup aria-label="Basic example">
                    <Button variant="outline-secondary" onClick={() => edit_todo(task)}>Изменить</Button>
                    <Button variant="outline-danger" onClick={() => delete_todo(task._id)}>Удалить</Button>
                </ButtonGroup>
                <Form.Check
                    className={'pt-2'}
                    type={'checkbox'}
                    onChange={() => done_todo(task._id)}
                    id={`default-checkbox`}
                    label={`Сделано`}
                />
            </div>

        </Accordion.Body>
    );
};

export default TaskInfo;
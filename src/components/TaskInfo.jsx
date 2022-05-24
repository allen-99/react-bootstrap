import React from 'react';
import {ButtonGroup, Button, Accordion} from 'react-bootstrap'

const TaskInfo = ({task, delete_todo, edit_todo}) => {

    return (
        <Accordion.Body>
            <div className="card card-body">
                {task.date_begin && <p>Дата начала: {task.date_begin} </p>}
                {task.date_end && <p>Дата окончания: {task.date_end}</p>}
                {task.place && <p>Место: {task.place}</p>}
                {task.text && <p>Описание: {task.text}</p>}
                <ButtonGroup aria-label="Basic example">
                    <Button variant="outline-secondary" onClick={() => edit_todo(task)}>Изменить</Button>
                    <Button variant="outline-danger" onClick={() => delete_todo(task._id)}>Удалить</Button>
                </ButtonGroup>
                <div className="form-check  pt-2">
                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                    <label className="form-check-label" htmlFor="flexCheckDefault">
                        Сделано
                    </label>
                </div>
            </div>

        </Accordion.Body>
    );
};

export default TaskInfo;
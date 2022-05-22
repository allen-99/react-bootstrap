import React from 'react';

const TaskInfo = ({task}) => {

    console.log(task.place)
    if (task.place !== undefined) {
        return (
        <div id={task.id}>
            <div className="card card-body">
               <p>Дата начала: {task.date_begin} </p>
                <p>Дата окончания: {task.date_end}</p>
                <p>Место: {task.place}</p>
                <p>Описание: {task.text}</p>
                <div className="form-check  pt-2">
                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                        <label className="form-check-label" htmlFor="flexCheckDefault">
                            Сделано
                        </label>
                </div>
            </div>

        </div>
    );
    }
    return (
        <div id={task.id}>
            <div className="card card-body">
               <p>Дата начала: {task.date_begin} </p>
                <p>Дата окончания: {task.date_end}</p>
                <p>Описание: {task.text}</p>
                <div className="form-check  pt-2">
                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                        <label className="form-check-label" htmlFor="flexCheckDefault">
                            Сделано
                        </label>
                </div>
            </div>

        </div>
    );
};

export default TaskInfo;
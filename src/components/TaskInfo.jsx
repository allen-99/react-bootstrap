import React from 'react';

const TaskInfo = ({task}) => {

    console.log(task.place)
        return (
        <div id={task.id}>
            <div className="card card-body">
                {task.date_begin && <p>Дата начала: {task.date_begin} </p>}
                {task.date_end &&  <p>Дата окончания: {task.date_end}</p>}
                {task.place && <p>Место: {task.place}</p>}
                {task.text && <p>Описание: {task.text}</p>}
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
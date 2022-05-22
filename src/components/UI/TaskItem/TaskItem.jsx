import React from 'react';
import TaskInfo from "../../TaskInfo";

const TaskItem = (props) => {

    return (
        <a  className={"list-group-item h-25 bg-info bg-opacity-50 btn btn-primary " }
                    onClick={props.onClick}>
            {props.task}
        </a>
    );
};

export default TaskItem;
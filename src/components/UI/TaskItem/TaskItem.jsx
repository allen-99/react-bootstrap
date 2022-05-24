import React from 'react';
import TaskInfo from "../../TaskInfo";
import {Accordion} from 'react-bootstrap'

const TaskItem = (props) => {

    return (
        <Accordion.Header>
            {props.task.header}
        </Accordion.Header>
    );
};

export default TaskItem;
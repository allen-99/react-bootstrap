import React, {useContext, useState} from 'react';
import TaskItem from "./UI/TaskItem/TaskItem";
import TaskInfo from "./TaskInfo";
import {Accordion} from 'react-bootstrap'

const Taska = ({task, delete_todo, edit_todo, done_todo}) => {

    return (
        <Accordion.Item className={"list-group-item h-25 bg-light"}
                        eventKey={task._id}
        >
            <TaskItem task={task}/>
            <TaskInfo task={task}
                      delete_todo={delete_todo}
                      edit_todo={edit_todo}
                      done_todo={done_todo}
            />
        </Accordion.Item>
    );
};

export default Taska;
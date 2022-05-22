import React, {useContext, useState} from 'react';
import TaskItem from "./UI/TaskItem/TaskItem";
import TaskInfo from "./TaskInfo";

const Taska = ({task}) => {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={"list-group-item h-25 bg-light" }>
            <TaskItem task={task.header} onClick={() => {
                setIsOpen(!isOpen)
            }}/>
            {isOpen && <TaskInfo task={task}/>}
        </div>
    );
};

export default Taska;
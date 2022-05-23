import React from 'react';
import {CSSTransition, TransitionGroup} from "react-transition-group";
import Taska from "./Taska";


const TaskList = ({messages, remove}) => {
    if (!messages.length) {
        return(
            <p className={"p-3 h5 bg-light"}>Добавте задачу </p>
        )}
    // messages.forEach(message => console.log(message))
    return (
        <div className={'bg-light'} >
            {messages.map((message) =>
                <Taska  task={message} />
            )}

        </div>
    );
};

export default TaskList;
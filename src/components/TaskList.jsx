import React from 'react';
import {CSSTransition, TransitionGroup} from "react-transition-group";
import Taska from "./Taska";
import {Accordion} from 'react-bootstrap'


const TaskList = ({messages, delete_todo, edit_todo, done_todo}) => {
    if (!messages.length) {
        return (
            <p className={"p-3 h5 bg-light"}>Нет задач </p>
        )
    }
    return (
        <Accordion className={'bg-light'}>
            <TransitionGroup>
                {messages.map((message) =>
                    <CSSTransition
                        key={message._id}
                        timeout={500}
                    >
                        <Taska task={message}
                               delete_todo={delete_todo}
                               edit_todo={edit_todo}
                               done_todo={done_todo}/>
                    </CSSTransition>
                )}
            </TransitionGroup>

        </Accordion>
    );
};

export default TaskList;
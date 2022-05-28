import React, {useState} from 'react';
import {Modal, Button, Form, FloatingLabel} from 'react-bootstrap'
import axios from "axios";


const NewTagModal = (props) => {

    const [tag, setTag] = useState('')

    const addTag = (e) => {
        console.log(tag)
        props.newMessage(tag)
        props.onHide()
        setTag('')
    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить тег
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FloatingLabel
                    label="Название тега"
                    className="mb-3"
                >
                    <Form.Control type="text"
                                  id='header'
                                  value={tag}
                                  onChange={e => setTag(e.target.value)}
                                  placeholder="Домашние дела"/>
                </FloatingLabel>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.onHide}>
                    Закрыть
                </Button>
                <Button variant="primary" onClick={addTag}>
                    Добавить
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default NewTagModal;
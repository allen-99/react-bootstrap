import React, {useState} from 'react';
import {Button, FloatingLabel, Form, Modal} from 'react-bootstrap'

const NewTagModal = (props) => {

    const [tag, setTag] = useState('')

    const addTag = (e) => {
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
                <Button variant="outline-dark" onClick={addTag}>
                    Добавить
                </Button>
                <Button variant="outline-secondary" onClick={props.onHide}>
                    Закрыть
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default NewTagModal;
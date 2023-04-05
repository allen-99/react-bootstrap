import React from 'react';
import {Button, FloatingLabel, Form, Modal} from "react-bootstrap";

const EditDeskModal = (props) => {

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Изменить название
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FloatingLabel
                    label="Название доски"
                    className="mb-3"
                >
                    <Form.Control type="text"
                                  id='name'
                                  value={props.old.name}
                                  onChange={e => props.setOld({...props.old, name: e.target.value})}
                                  placeholder="Важна доска"/>
                </FloatingLabel>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-dark" onClick={() => {
                    props.newDeskName(props.old)
                    document.getElementById('name').value = ''
                    props.onHide()
                }}>Изменить</Button>
                <Button variant="outline-secondary" onClick={props.onHide}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditDeskModal;
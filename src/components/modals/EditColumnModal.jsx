import React from 'react';
import {Button, FloatingLabel, Form, Modal} from "react-bootstrap";

const EditColumnModal = (props) => {

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
                    label="Название группы"
                    className="mb-3"
                >
                    <Form.Control type="text"
                                  id='name'
                                  value={props.oldColumnName.name}
                                  onChange={e => props.setOldColumnName({...props.oldColumnName, name: e.target.value})}
                                  placeholder="To Do"/>
                </FloatingLabel>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-dark" onClick={() => {
                    props.newColumnItemName(props.oldColumnName)
                    document.getElementById('name').value = ''
                    props.onHide()
                }}>Изменить</Button>
                <Button variant="outline-secondary" onClick={props.onHide}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditColumnModal;
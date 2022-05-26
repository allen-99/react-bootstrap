import React from 'react';
import {Button, FloatingLabel, Form, Modal} from "react-bootstrap";

const EditColumnModal = (props) => {

    const editColumn = () => {
        props.newColumnItemName(props.oldColumnName)
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
                    Добавить колонку
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FloatingLabel
                    label="Название группы"
                    className="mb-3"
                >
                    <Form.Control type="text"
                                  id='name'
                                  value={props.oldColumnName}
                                  onChange={e => props.setOldColumnName(e.target.value)}
                                  placeholder="To Do"/>
                </FloatingLabel>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={editColumn}>Изменить</Button>
                <Button variant="secondary" onClick={props.onHide}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditColumnModal;
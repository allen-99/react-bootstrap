import React, {useState} from 'react';
import {Button, Modal, Table} from 'react-bootstrap'
import axios from "axios";
import Taska from "../../Taska";
import {CSSTransition} from "react-transition-group";

const ShowTagsModal = (props) => {

    const delete_tag = (tag) => {
        props.setTags(props.tags.filter(m => m._id !== tag._id))
        axios.post('http://localhost:5001/delete_tag', {
            _id: tag._id
        })
            .then((response) => {
                console.log(response.data)
            })
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
                    Просмотр тегов
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Название тега</th>
                    </tr>
                    </thead>
                    <tbody>
                    {props.tags.map((tag) =>
                        <tr>
                            <td> <Button variant={'outline-dark'} onClick={() => delete_tag(tag)}>Удалить</Button></td>
                            <td>{tag.tag_name}</td>
                        </tr>
                    )}
                    </tbody>
                </Table>
            </Modal.Body>
        </Modal>

    );
};

export default ShowTagsModal;
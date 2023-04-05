import React, {useState} from 'react';
import {Button, Modal, Table} from 'react-bootstrap'
import axios from "axios";

const ShowTagsModal = (props) => {

    const [tag, setTag] = useState();

    const delete_tag = (id) => {
        axios({
            method: "DELETE",
            url:"http://127.0.0.1:5001/tags",
            data:{
                "id": id,
            },
            headers: {
                'Authorization': `Bearer ${props.token}`,
                'Content-Type': 'application/json',
            }
        }).then(() =>
            {
                const filtered = props.tags.filter(tag => tag.id !== id);
                props.setTags(filtered);
            }
        );
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
                            <td>
                                <Button
                                variant={'outline-dark'}
                                onClick={() => delete_tag(tag.id)}
                                disabled={tag.id === 0}
                                > Удалить
                                </Button>
                            </td>
                            <td>{tag.name}</td>
                        </tr>
                    )}
                    </tbody>
                </Table>
            </Modal.Body>
        </Modal>

    );
};

export default ShowTagsModal;
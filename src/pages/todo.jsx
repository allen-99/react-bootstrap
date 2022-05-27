import React, {useEffect, useState} from 'react';
import ColumnItem from "../components/ColumnItem/ColumnItem";
import AddColumnItem from "../components/UI/AddColumnItem/AddColumnItem";
import NewColumnModal from '../components/UI/Modals/NewColumnModal'
import axios from "axios";
import EditColumnModal from "../components/UI/Modals/EditColumnModal";
import {CSSTransition, TransitionGroup} from "react-transition-group";

const Todo = () => {

    const [columns, setColumns] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [answer, setAnswer] = useState({message: ''})
    const [newColumn, setNewColumn] = useState({group_name: '', group_id: 0, desk_id: 0})
    const [editColumn, setEditColumn] = useState({group_name: '', group_id: 0, desk_id: 0})

    useEffect(() => {
        fetch('http://localhost:5001/columns', {
            'methods': 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(response => {
                setColumns(response)
            })
            .catch(error => console.log(error))
    }, [])

    const addNewColumn = (name) => {
        newColumn.group_name = name
        axios.post('http://localhost:5001/add_column', {
            group_id: newColumn.group_id,
            group_name: newColumn.group_name,
            desk_id: newColumn.desk_id
        })
            .then((response) => {
                setAnswer(response.data) //_id, column_id
                setNewColumn({
                    group_id: response.data[1],
                    _id: response.data[0],
                    desk_id: newColumn.desk_id,
                    group_name: newColumn.group_name
                })
                newColumn.group_id = response.data[1]
                newColumn._id = response.data[0]
            })
        setColumns([...columns, newColumn])
    }

    const openModalWindow = (e) => {
        e.preventDefault()
        setShowModal(true)
    }

    const openEditModal = (column) => {
        setShowEditModal(true)
        setEditColumn(column)
        console.log(editColumn)
    }

    const editColumnName = (columnItem) => {

        axios.post('http://localhost:5001/edit_column', {
            group_id: columnItem.group_id,
            group_name: columnItem.group_name,
            desk_id: columnItem.desk_id,
            _id: columnItem._id
        })
            .then((response) => {
                setAnswer(response.data)
            })
        const a = columns.filter(d => d._id !== columnItem._id)
        setColumns(a)
        setColumns([...a, columnItem])
    }

    const removeColumn = (columnItem) => {
        const a = columns.filter(d => d._id !== columnItem._id)
        setColumns(a)
        axios.post('http://localhost:5001/delete_column', {
            _id: columnItem._id,
            group_id: columnItem.group_id
        })
            .then((response) => {
                setAnswer(response.data)
            })
    }

    return (
        <TransitionGroup>
        <div className={'row align-items-start'}>
                {columns.map((column) => (
                    <CSSTransition
                        key={column._id}
                        timeout={500}
                    >
                        <ColumnItem column={column}
                                    editColumn={openEditModal}
                                    removeColumn={removeColumn}/>
                    </CSSTransition>

                ))}


            <AddColumnItem onClick={(e) => openModalWindow(e)}
            />
            <NewColumnModal show={showModal}
                            onHide={() => setShowModal(false)}
                            newColumnAdd={addNewColumn}
            />
            <EditColumnModal show={showEditModal}
                             onHide={() => setShowEditModal(false)}
                             newColumnItemName={editColumnName}
                             oldColumnName={editColumn}
                             setOldColumnName={setEditColumn}
            >

            </EditColumnModal>
        </div>
        </TransitionGroup>
    );
};

export default Todo;
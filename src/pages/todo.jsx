import React, {useEffect, useState} from 'react';
import ColumnItem from "../components/ColumnItem/ColumnItem";
import AddColumnItem from "../components/UI/AddColumnItem/AddColumnItem";
import NewColumnModal from '../components/UI/Modals/NewColumnModal'
import axios from "axios";

const Todo = () => {

    const [columns, setColumns] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [answer, setAnswer] = useState({message: ''})
    const [newColumn, setNewColumn] = useState({group_name: '', group_id: 0, desk_id: 0})

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
        console.log(name)
        newColumn.group_name = name
        console.log(newColumn)
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
                // newColumn.group_id = response.data[1]
                // newColumn._id = response.data[0]
            })
        setColumns([...columns, newColumn])
    }

    const openModalWindow = (e) => {
        e.preventDefault()
        setShowModal(true)
    }


    return (
        <div className={'row align-items-start'}>
            {columns.map((column) => (
                <ColumnItem column={column}/>
            ))}
            <AddColumnItem onClick={(e) => openModalWindow(e)}
            />
            <NewColumnModal show={showModal}
                            onHide={() => setShowModal(false)}
                            newColumnAdd={addNewColumn}
            />
        </div>
    );
};

export default Todo;
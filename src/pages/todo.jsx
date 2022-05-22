import React, {useEffect, useState} from 'react';
import ColumnItem from "../components/ColumnItem/ColumnItem";
import AddColumnItem from "../components/UI/AddColumnItem/AddColumnItem";

const Todo = () => {

    const [columns, setColumns] = useState([])

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
                console.log(columns)
                console.log(response)
            })
            .catch(error => console.log(error))
    }, [])
    return (
        <div className={'row align-items-start'}>
            {columns.map((column) => (
                <ColumnItem column={column}/>
            ))}
            <AddColumnItem/>
        </div>
    );
};

export default Todo;
import React, {useEffect, useState} from 'react';
import axios from "axios";
import ColumnItem from "../components/Columns/ColumnItem";
import AddColumnItem from "../components/Columns/AddColumnItem";
import EditColumnModal from "../components/modals/EditColumnModal";
import NewColumnModal from "../components/modals/NewColumnModal";
import EditLinkButton from "../components/UI/EditLinkButton";
import EditDeskModal from "../components/modals/EditDeskModal";


const Desk = ({token, desk, setDesk}) => {
    const [todos, setTodos] = useState([]);
    const [columns, setColumns] = useState([]);
    const [tags, setTags] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeskEditModal, setShowDeskEditModal] = useState(false);

    const [newColumn, setNewColumn] = useState({name: '', id: 0, desk_id: 0});
    const [editColumn, setEditColumn] = useState({name: '', id: 0, desk_id: 0});

    const [editDesk, setEditDesk] = useState({name: desk.name, id: desk.id});


    useEffect(() => {
        const fetchData = async () => {
            const inst = axios.create({
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            });
            inst.get("http://127.0.0.1:5001/todos").then((response) => {
                setTodos(response.data);

            });
            inst.get("http://127.0.0.1:5001/columns").then((response) => {
                setColumns(response.data);
            });
            inst.get("http://127.0.0.1:5001/tags").then((response) => {
                setTags(response.data);
            });
        };
        fetchData();
    }, [setTodos, setColumns, setTags, token]);


    const doEditColumn = (columnItem) => {
        const colms = columns.filter(d => d.id !== columnItem.id);
        axios({
            method: "PUT",
            url: 'http://127.0.0.1:5001/columns',
            data: {
                name: columnItem.name,
                desk_id: columnItem.desk_id,
                id: columnItem.id,
            },
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        })
            .then((response) => {
                if (response) {
                    setColumns(colms);
                    setColumns([...colms, columnItem]);
                }
            })
    };

    const doEditDesk = (desk) => {
        axios({
            method: "PUT",
            url: 'http://127.0.0.1:5001/desks',
            data: {
                name: desk.name,
                id: desk.id,
            },
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        })
            .then((response) => {
                setDesk(response.data)
            })
    }

    const openEditDesk = (e) => {
        e.preventDefault()
        setShowDeskEditModal(true);
    }
    const removeColumn = (columnItem) => {
        const colms = columns.filter(d => d.id !== columnItem.id);
        axios({
            method: "DELETE",
            url: 'http://127.0.0.1:5001/columns',
            data: {
                name: columnItem.name,
                desk_id: desk.id,
                id: columnItem.id
            },
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        })
            .then((response) => {
                if (response) setColumns(colms);
            })
    };

    const addNewColumn = (name) => {
        newColumn.name = name;
        axios({
            method: "POST",
            url: 'http://127.0.0.1:5001/columns',
            data: {
                name: name,
                desk_id: desk.id,
            },
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        })
            .then((response) => {
                if (response) {
                    setNewColumn(response.data);
                    setColumns([...columns, newColumn]);
                }
            })
    };

    const openModalWindow = (e) => {
        e.preventDefault()
        setShowModal(true);
    };

    const openEditModal = (column) => {
        setShowEditModal(true)
        setEditColumn(column)
    }

    const getColumnsTodos = (columnId) => {
        return todos.filter(todo => todo.group_id === columnId);
    }

    const setTodosWithChanges = (todo, isAdd, isEdit) => {
        if (isAdd && isEdit) {
            const updatedItems = todos.map(item => {
                if (item.id === todo.id) {
                    return todo;
                } else {
                    return item;
                }
            });
            setTodos([...updatedItems, todo]);
        } else if (isAdd && !isEdit) {
            setTodos([...todos, todo])
        } else {
            setTodos(todos.filter(to => todo.id !== to.id))
        }

    }

    return (
        <div>
            <div className={'flex justify-between'}>
                <div>
                    <h1 className="display-6 p-3 flex">{desk.name}<EditLinkButton openModal={openEditDesk}/>
                    </h1>
                </div>

                <div className={'flex items-center'}>
                    <AddColumnItem onClick={(e) => openModalWindow(e)}/>
                </div>
            </div>
            <hr/>
            <div className={'flex flex-wrap'}>
                {columns.map((column) => (
                    <ColumnItem
                        todos={getColumnsTodos(column.id)}
                        tags={tags}
                        column={column}
                        token={token}
                        editColumn={openEditModal}
                        removeColumn={removeColumn}
                        setTodosWithChanges={setTodosWithChanges}
                        setTodos={setTodos}
                    />
                ))}
            </div>
            <NewColumnModal show={showModal}
                            onHide={() => setShowModal(false)}
                            newColumnAdd={addNewColumn}
            />
            <EditColumnModal show={showEditModal}
                             onHide={() => setShowEditModal(false)}
                             newColumnItemName={doEditColumn}
                             oldColumnName={editColumn}
                             setOldColumnName={setEditColumn}
            />
            <EditDeskModal show={showDeskEditModal}
                           onHide={() => setShowDeskEditModal(false)}
                           newDeskName={doEditDesk}
                           old={editDesk}
                           setOld={setEditDesk}
            />
        </div>
    );
};

export default Desk;
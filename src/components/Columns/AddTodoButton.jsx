import React from 'react';

const AddTodoButton = ({onClick}) => {
    return (
        <button type="submit"
                onClick={onClick}
                className={'border-0 p-2 add-todo-button text-gray-500 rounded-b-md hover:bg-gray-500 font-bold hover:text-white'}
        >
            Добавить задачу
        </button>
    );
};

export default AddTodoButton;
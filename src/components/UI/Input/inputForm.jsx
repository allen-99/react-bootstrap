import React, {useState} from 'react';

const InputForm = ({onClick}) => {



    return (
        <a  className={"list-group-item h-25  bg-secondary bg-opacity-25" }>
            <form className="d-grid gap-2 ">
                    <button type="submit"
                            className="btn btn-outline-secondary "
                            onClick={onClick}
                    >
                        Добавить задачу
                    </button>
            </form>
        </a>
    );
};

export default InputForm;
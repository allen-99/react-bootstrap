import React from 'react';
import Taska from "../../Taska";
import InputForm from "../Input/inputForm";

const AddColumnItem = ({onClick}) => {

    return (
        <div className={'col-3 list-group min-vw-30 m-2 bg-light'}>
           <a  className={"list-group-item h-25" }>
            <form className="d-grid gap-2 ">
                    <button type="submit" 
                            className="btn btn-outline-secondary"
                            onClick={onClick}>
                        Добавить группу
                    </button>
            </form>
        </a>
        </div>
    );
};

export default AddColumnItem;
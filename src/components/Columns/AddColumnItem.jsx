import React from 'react';
import Button from "react-bootstrap/Button";

const AddColumnItem = ({onClick}) => {

    return (
        <div className={'flex w-full mx-2'}>
            <form className="">
                <Button type="submit"
                        className="btn btn-outline-secondary flex items-center"
                        onClick={onClick}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor"
                         className="bi bi-plus-lg inline-block pb-0.5 pr-1" viewBox="0 0 16 16">
                        <path fillRule="evenodd"
                              d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
                    </svg>
                    Группа
                </Button>
            </form>
        </div>
    );
};

export default AddColumnItem;
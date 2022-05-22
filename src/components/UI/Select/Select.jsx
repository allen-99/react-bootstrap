import React from 'react';

const Select = ({filter, setFilter}) => {
    return (
        <div className="btn-group d-grid gap-2 m-3">
                <button type="button"
                        className="btn btn-outline-secondary dropdown-toggle"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        onClick={e => setFilter({...filter, query: e.target.value})}>
                    Сортировать по...
                </button>
                <ul className="dropdown-menu ">
                    <li><a className="dropdown-item" href="#">Действие</a></li>
                    <li><a className="dropdown-item" href="#">Другое действие</a></li>
                    <li><a className="dropdown-item" href="#">Что-то еще здесь</a></li>
                </ul>

        </div>
    );
};

export default Select;
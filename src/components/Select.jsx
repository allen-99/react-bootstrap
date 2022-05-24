import React from 'react';
import {Dropdown, DropdownButton} from 'react-bootstrap'


const Select = ({filter, setFilter}) => {

    const items = ["Названию", "Дате окончания", "Описанию", 'Сбросить']


    const set_filter = (filter) => {
        console.log(filter)
        setFilter(filter)
    }

    return (
        <div>
            <form className="d-flex m-3">
                <input className="form-control me-2 "
                       type="search"
                       placeholder="Поиск..."
                       aria-label="Search"
                       value={filter.query}
                       onChange={e => setFilter({...filter, query: e.target.value})}
                />
            </form>
            <DropdownButton
                id="dropdown-secondary-button"
                variant="secondary"
                className="d-grid gap-2 m-3"
                title="Сортировать по..."
                value={filter.sort}
            >
                {items.map((item) => (
                    <Dropdown.Item onClick={() => set_filter(item)}>
                        {item}
                    </Dropdown.Item>
                ))
                }
            </DropdownButton>
        </div>

    );
};

export default Select;
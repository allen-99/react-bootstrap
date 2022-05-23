import React from 'react';
import {Dropdown, DropdownButton} from 'react-bootstrap'

const Select = ({filter, setFilter}) => {
    return (
        <DropdownButton
            id="dropdown-secondary-button"
            variant="secondary"
            className="d-grid gap-2 m-3"
            title="Сортировать по...">
            <Dropdown.Item onSelect={}>Названию</Dropdown.Item>
            <Dropdown.Item onSelect={}>Дате окончания</Dropdown.Item>
            <Dropdown.Item onSelect={}>Описанию</Dropdown.Item>
            <Dropdown.Item onSelect={}>Сбросить</Dropdown.Item>
        </DropdownButton>
    );
};

export default Select;
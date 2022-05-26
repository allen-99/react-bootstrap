import React from 'react';
import {Dropdown, DropdownButton, InputGroup, FormControl, Container} from 'react-bootstrap'


const Select = ({filter, setFilter}) => {

    const items = ["Названию", "Дате окончания", "Описанию", 'Сбросить']


    const set_filter = (filter) => {
        console.log(filter)
        setFilter(filter)
    }

    return (
        <Container className={'p-1'}>
            <InputGroup className="mb-2">
                <FormControl className={''}
                    placeholder="Поиск..."
                    aria-label="search"
                    aria-describedby="basic-addon1"
                />
            </InputGroup>
            {/*<form className="d-flex m-3">*/}
            {/*    <input className="form-control me-2 "*/}
            {/*           type="search"*/}
            {/*           placeholder="Поиск..."*/}
            {/*           aria-label="Search"*/}
            {/*           value={filter.query}*/}
            {/*           onChange={e => setFilter({...filter, query: e.target.value})}*/}
            {/*    />*/}
            {/*</form>*/}
            <DropdownButton

                id="dropdown-secondary-button"
                variant="secondary"
                className="d-grid gap-2"
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
        </Container>

    );
};

export default Select;
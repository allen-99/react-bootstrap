import React, {useState} from 'react';
import {Container, Dropdown, DropdownButton, Form, FormControl, InputGroup} from 'react-bootstrap'
import TagFilterButton from "./UI/TagFilterButton";


const Select = ({filter, sortPost, setSearchQuery, searchQuery, tags, setTagsFilter}) => {

    const items = ["Названию", "Описанию"];
    const [isShowTags, setIsShowTags] = useState('hidden');

    const [checkboxesTags, setCheckboxesTags] = useState(() => {
        if (tags) {
            return tags.reduce((checkboxes, tag) => {
                checkboxes[tag.id] = true;
                return checkboxes;
            }, {});
        }
    });

    const set_filter = (filter) => {
        sortPost(filter)
    }

    const openTags = () => {
        if (isShowTags === 'hidden') setIsShowTags('block');
        if (isShowTags === 'block') setIsShowTags('hidden');
    }

    const handleCheckboxChange = (event) => {
        let {id, checked} = event.target;
        if (id === '') id = 0;
        setCheckboxesTags((prevCheckboxes) => {
            const newCheckboxes = {...prevCheckboxes, [id]: checked};
            setTagsFilter(newCheckboxes);
            return newCheckboxes;
        });
    }

    return (
        <Container className={'w-full p-0 mt-2'}>
            <InputGroup className="mb-2">
                <FormControl className={''}
                             placeholder="Поиск..."
                             aria-label="search"
                             aria-describedby="basic-addon1"
                             value={searchQuery}
                             onChange={e => setSearchQuery(e.target.value)}
                />
                <TagFilterButton onClick={() => openTags()}/>
                <div
                    className={`absolute min-h-2 top-10 rounded p-2 border left-0 w-full bg-gray-50 z-30 ${isShowTags}`}>
                    {tags && tags.map((tag) => (
                        <Form.Check
                            className={'py-2 text-lg pl-4'}
                            type={'checkbox'}
                            id={tag.id}
                            label={tag.name}
                            checked={checkboxesTags[tag.id]}
                            onChange={handleCheckboxChange}
                        />
                    ))}
                </div>
            </InputGroup>

            <DropdownButton
                id="dropdown-secondary-button"
                variant="outline-secondary"
                className="d-grid gap-2 text-black w-full"
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
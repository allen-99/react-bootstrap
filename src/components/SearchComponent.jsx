import React, {useState} from 'react';
import {Form, FormControl, InputGroup} from "react-bootstrap";
import TagFilterButton from "./UI/TagFilterButton";

const SearchComponent = ({searchQuery, setSearchQuery, tags, setTagsFilter}) => {

    const [isShowTags, setIsShowTags] = useState('hidden');
    const [checkboxesTags, setCheckboxesTags] = useState(() => {
        return tags.reduce((checkboxes, tag) => {
            checkboxes[tag.id] = true;
            return checkboxes;
        }, {});
    });
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
        <>
            <InputGroup className={'relative'}>
                <FormControl
                    placeholder="Поиск..."
                    aria-label="search"
                    aria-describedby="basic-addon1"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                />
                <TagFilterButton onClick={() => openTags()}/>
                <div
                    className={`absolute min-h-2 border top-10 rounded p-2 left-0 w-full bg-gray-50 opacity-80 z-20 ${isShowTags}`}>
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

        </>
    );
};

export default SearchComponent;
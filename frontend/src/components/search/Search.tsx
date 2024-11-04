// src/components/Search.tsx
import React from 'react';
import { useDispatch } from 'react-redux';
import { setSearch } from '../../redux/taskSlice';
import { TextField } from '@mui/material';

const Search: React.FC = () => {
    const dispatch = useDispatch();

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearch(e.target.value));
    };

    return (
        <TextField
            label="Search Tasks"
            variant="outlined"
            onChange={handleSearch}
            fullWidth
        />
    );
};

export default Search;

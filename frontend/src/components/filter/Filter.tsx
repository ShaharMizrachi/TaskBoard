// src/components/Filter.tsx
import React from 'react';
import { useDispatch } from 'react-redux';
import { setPriorityFilter } from '../../redux/taskSlice';
import { Select, MenuItem, InputLabel, FormControl, SelectChangeEvent } from '@mui/material';

const Filter: React.FC = () => {
    const dispatch = useDispatch();

    const handleFilterChange = (event: SelectChangeEvent<string>) => {
        dispatch(setPriorityFilter(event.target.value));
    };

    return (
        <FormControl fullWidth variant="outlined">
            <InputLabel>Priority Filter</InputLabel>
            <Select onChange={handleFilterChange} defaultValue="">
                <MenuItem value="">All</MenuItem>
                <MenuItem value="high">High</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="low">Low</MenuItem>
            </Select>
        </FormControl>
    );
};

export default Filter;

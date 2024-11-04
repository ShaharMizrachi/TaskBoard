// src/components/PaginationControls.tsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPage } from '../redux/taskSlice';
import { Pagination } from '@mui/material';
import { RootState } from '../redux/store';

const PaginationControls: React.FC = () => {
    const dispatch = useDispatch();
    const { page } = useSelector((state: RootState) => state.tasks);
    const totalPages = 10;

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        dispatch(setPage(value));
    };

    return (
        <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
        />
    );
};

export default PaginationControls;

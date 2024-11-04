// src/pages/HomePage.tsx
import React from 'react';
import TaskList from '../../components/taskList/TaskList';
import Search from '../../components/search/Search';
import Filter from '../../components/filter/Filter';
import PaginationControls from '../../components/PaginationControls';
import { Box, Container, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const HomePage: React.FC = () => {

    const navigate = useNavigate();

    const goToCreateTask = () => {
        navigate('/create-task');
    };

    return (
        <Container>
            <Box mb={2} display="flex" justifyContent="space-between" alignItems="center">
                <Search />
                <Button variant="contained" color="primary" onClick={goToCreateTask}>
                    Create New Task
                </Button>
            </Box>
            <Box mb={2}>
                <Filter />
            </Box>
            <TaskList />
            <Box mt={2}>
                <PaginationControls />
            </Box>
        </Container>
    );
};
export default HomePage;

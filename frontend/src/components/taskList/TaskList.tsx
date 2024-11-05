// src/components/TaskList.tsx
import React, { useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, CircularProgress, Box, Paper } from '@mui/material';
import useTasks from '../../hooks/useTasks';

const TaskList: React.FC = () => {
    const { data, isLoading, isError, error } = useTasks();

    useEffect(() => {
        console.log('Task Data:', data);
    }, [data]);

    if (isLoading) return <Box display="flex" justifyContent="center"><CircularProgress /></Box>;
    if (isError) return <Typography color="error">Error: {(error as Error).message}</Typography>;

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell><strong>Task ID</strong></TableCell>
                        <TableCell><strong>Title</strong></TableCell>
                        <TableCell><strong>Description</strong></TableCell>
                        <TableCell><strong>Priority</strong></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data?.tasks.map((task: any) => (
                        <TableRow key={task._id}>
                            <TableCell>{task._id}</TableCell>
                            <TableCell>{task.title}</TableCell>
                            <TableCell>{task.description}</TableCell>
                            <TableCell>{task.priority.toFixed(2)}</TableCell>
                        </TableRow>
                    ))}
                    {data?.tasks.length === 0 && (
                        <TableRow>
                            <TableCell colSpan={4} align="center">
                                No tasks found.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default TaskList;

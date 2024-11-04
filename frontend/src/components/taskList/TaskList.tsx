// src/components/TaskList.tsx
import React from 'react';
import { List, ListItem, Typography, CircularProgress, Box } from '@mui/material';
import useTasks from '../../hooks/useTasks';

const TaskList: React.FC = () => {
    const { data, isLoading, isError, error } = useTasks();

    if (isLoading) return <Box display="flex" justifyContent="center"><CircularProgress /></Box>;
    if (isError) return <Typography color="error">Error: {(error as Error).message}</Typography>;

    return (
        <List>
            {data?.tasks.map((task: any) => (
                <ListItem key={task.id}>
                    <Typography variant="h6">{task.title}</Typography>
                    <Typography variant="body2">{task.description}</Typography>
                    <Typography variant="caption">Priority: {task.priority}</Typography>
                </ListItem>
            ))}
            {data?.tasks.length === 0 && <Typography>No tasks found.</Typography>}
        </List>
    );
};

export default TaskList;

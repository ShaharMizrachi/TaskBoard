// src/pages/TaskDetailPage.tsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Box, Typography } from '@mui/material';
import axios from '../../services/api';

interface Task {
    id: string;
    title: string;
    description: string;
    priority: number;
}

const TaskDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [task, setTask] = useState<Task | null>(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const response = await axios.get(`/tasks/${id}`);
                const taskData = response.data;
                setTask(taskData);
                setTitle(taskData.title);
                setDescription(taskData.description);
                setPriority(taskData.priority);
            } catch (err) {
                setError('Failed to fetch task details.');
            }
        };

        fetchTask();
    }, [id]);

    const handleUpdate = async () => {
        try {
            const response = await axios.put(`/tasks/${id}`, { title, description });
            const updatedTask = response.data;
            setPriority(updatedTask.priority); // Set recalculated priority from response
            setError(null);
            alert("Task updated successfully!");
        } catch (err) {
            setError('Failed to update task.');
        }
    };

    if (!task) {
        return (
            <Container>
                <Typography>Loading...</Typography>
            </Container>
        );
    }

    return (
        <Container maxWidth="sm">
            <Box mt={4} mb={2}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Task Details
                </Typography>
            </Box>
            <Box mb={2}>
                <TextField
                    label="Title"
                    variant="outlined"
                    fullWidth
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </Box>
            <Box mb={2}>
                <TextField
                    label="Description"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={4}
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </Box>
            <Box mb={2}>
                <Typography>Priority: {priority !== null ? priority.toFixed(2) : 'Calculating...'}</Typography>
            </Box>
            {error && (
                <Typography color="error" mb={2}>
                    {error}
                </Typography>
            )}
            <Box display="flex" justifyContent="flex-end">
                <Button variant="contained" color="primary" onClick={handleUpdate}>
                    Update Task
                </Button>
            </Box>
        </Container>
    );
};

export default TaskDetailPage;

// src/pages/CreateTaskPage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Box, Typography, Dialog, DialogContent, DialogActions } from '@mui/material';
import axios from '../../services/api';

const CreateTaskPage: React.FC = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [successDialogOpen, setSuccessDialogOpen] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        try {
            await axios.post('/tasks', { title, description });
            setSuccessDialogOpen(true);
        } catch (err) {
            setError('Failed to create task. Please try again.');
        }
    };

    const handleDialogClose = () => {
        setSuccessDialogOpen(false);
        navigate('/');
    };

    return (
        <Container maxWidth="sm">
            <Box mt={4} mb={2}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Create New Task
                </Typography>
            </Box>
            <form onSubmit={handleSubmit}>
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
                {error && (
                    <Typography color="error" mb={2}>
                        {error}
                    </Typography>
                )}
                <Box display="flex" justifyContent="flex-end">
                    <Button type="submit" variant="contained" color="primary">
                        Create Task
                    </Button>
                </Box>
            </form>

            {/* Success Dialog */}
            <Dialog open={successDialogOpen} onClose={handleDialogClose}>
                <DialogContent>
                    <Typography>Task created successfully!</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} color="primary" autoFocus>
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default CreateTaskPage;

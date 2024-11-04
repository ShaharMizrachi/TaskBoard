// src/components/Layout.tsx
import React from 'react';
import { Container, Typography } from '@mui/material';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <Container>
            <Typography variant="h4" component="h1" gutterBottom>
                TaskBoard
            </Typography>
            {children}
        </Container>
    );
};

export default Layout;

// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/homepage/HomePage';
import CreateTaskPage from './pages/createTaskPage/CreateTaskPage';
import TaskDetailPage from './pages/taskDetailPage/TaskDetailPage';

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create-task" element={<CreateTaskPage />} />
          <Route path="/tasks/:id" element={<TaskDetailPage />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;

// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/homepage/HomePage';
import CreateTaskPage from './pages/createTaskPage/CreateTaskPage';

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create-task" element={<CreateTaskPage />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;

import React from 'react';

import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ChatPage from './pages/ChatPage';

import NotFoundPage from './pages/NotFoundPage';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="chat" element={<ChatPage />} />
    
        <Route path="*" element={<NotFoundPage />} />
      
      </Route>
    </Routes>
  );
}

export default App;
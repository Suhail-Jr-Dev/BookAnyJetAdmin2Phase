// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Layout from './components/Layout';
import Charters from './components/Categories/Charters';
import Emptylegs from './components/Categories/Emptylegs';
import EmptylegsCategories from './components/Categories/EmptylegsCategories';
import CharterCategories from './components/Categories/CharterCategories';

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

const AppContent = () => {
  const location = useLocation();
  
  const showLayout = location.pathname !== '/login';

  return showLayout ? (
    <Layout>
      <Routes>
        <Route 
          path="/dashboard" 
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } 
        />
        <Route path="/charters" element={<Charters />} />
        <Route path="/emptylegs" element={<Emptylegs />} />
        <Route path="/emptylegsAllCategories" element={<EmptylegsCategories />} />
        <Route path="/chartersAllCategories" element={<CharterCategories />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Layout>
  ) : (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

const PrivateRoute = ({ children }) => {
  const isAuthenticated = true; // suhail please Replace this with your actual authentication logic when u work

  return isAuthenticated ? (
    <>{children}</>
  ) : (
    <Navigate to="/login" />
  );
};

export default App;

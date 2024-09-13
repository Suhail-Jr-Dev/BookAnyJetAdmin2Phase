import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Layout from './components/Layout';
import Charters from './components/Categories/Charters';
import Emptylegs from './components/Categories/Emptylegs';
import EmptylegsCategories from './components/Categories/EmptylegsCategories';
import CharterCategories from './components/Categories/CharterCategories';
import Bookings from './pages/Bookings';
import EmptylegsBooking from './components/Categories/EmptylegsBooking';
import RegisterForm from './components/Categories/RegisterForm';
import { PrivateRoute } from './ProtectedRoute'
import ChCategory from './components/Categories/ChCategory';
import Category from './pages/Category';
import SubCategory from './pages/SubCategory';

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

const AppContent = () => {
  const location = useLocation();

  const showLayout = location.pathname !== '/login' && location.pathname !== '/register';

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
        <Route path="/charters" element={

          <PrivateRoute>
            <Charters />
          </PrivateRoute>
        }
        />
        <Route path="/emptylegs" element={<PrivateRoute><Emptylegs /></PrivateRoute>} />
        <Route path="/emptylegsAllCategories" element={<PrivateRoute><EmptylegsCategories /></PrivateRoute>} />
        <Route path="/chartersAllCategories" element={<PrivateRoute><CharterCategories /></PrivateRoute>} />
        <Route path="/chartersBookings" element={<PrivateRoute><Bookings /></PrivateRoute>} />
        <Route path="/emptylegbookings" element={<PrivateRoute><EmptylegsBooking /></PrivateRoute>} />
        <Route path="/explore/:section/:category" element={<SubCategory />} />
        <Route path="/chartersCategory" element={<PrivateRoute><ChCategory /></PrivateRoute>} />
        <Route path="/category/:section" element={ <Category/>} /> {/* New route */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Layout>
  ) : (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};



export default App;

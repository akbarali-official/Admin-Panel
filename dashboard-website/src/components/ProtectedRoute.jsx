import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import MainLayout from '../layout/MainLayout';
import Footer from './Footer';

// Login ke baghair koi page nahi khulega. Login ho to sidebar+header wala layout milta hai.
export default function ProtectedRoute() {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return (
    <MainLayout>
      <Outlet />
      <Footer />
    </MainLayout>
  );
}

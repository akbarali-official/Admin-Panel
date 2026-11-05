import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';

import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Customers from './pages/Customers';
import Invoices from './pages/Invoices';
import Products from './pages/Products';
import Orders from './pages/Orders';
import Blog from './pages/Blog';
import Stocks from './pages/Stocks';

import TypographyPage from './pages/Typography';
import Colors from './pages/Colors';
import FAQs from './pages/FAQs';
import PrivacyPolicy from './pages/PrivacyPolicy';
import SamplePage from './pages/SamplePage';
import ComingSoon from './pages/ComingSoon';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <Routes>
      {/* Bina login wale pages */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Login ke baad wale pages (sidebar + header ke saath) */}
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/users" element={<Users />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/invoices" element={<Invoices />} />
        <Route path="/products" element={<Products />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/stocks" element={<Stocks />} />

        <Route path="/typography" element={<TypographyPage />} />
        <Route path="/color" element={<Colors />} />
        <Route path="/faqs" element={<FAQs />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/sample-page" element={<SamplePage />} />

        <Route path="/coming-soon/:id" element={<ComingSoon />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

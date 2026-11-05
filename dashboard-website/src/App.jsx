import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';

import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Landing from './pages/Landing';

import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Customers from './pages/Customers';
import Invoices from './pages/Invoices';
import Products from './pages/Products';
import Orders from './pages/Orders';
import Blog from './pages/Blog';
import Stocks from './pages/Stocks';

import Kanban from './pages/Kanban';
import Calendar from './pages/Calendar';
import Chat from './pages/Chat';
import Mail from './pages/Mail';

import Analytics from './pages/Analytics';
import Statistics from './pages/Statistics';
import WidgetData from './pages/WidgetData';
import Charts from './pages/Charts';
import TablePage from './pages/Table';
import FormsValidation from './pages/FormsValidation';
import FormsWizard from './pages/FormsWizard';

import Pricing from './pages/Pricing';
import ContactUs from './pages/ContactUs';
import ContactMessages from './pages/ContactMessages';
import Maintenance from './pages/Maintenance';
import UiBasic from './pages/UiBasic';
import UiAdvance from './pages/UiAdvance';

import TypographyPage from './pages/Typography';
import Colors from './pages/Colors';
import Shadow from './pages/Shadow';
import Icons from './pages/Icons';
import Animation from './pages/Animation';
import GridDemo from './pages/GridDemo';
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
      <Route path="/landing" element={<Landing />} />

      {/* Login ke baad wale pages (sidebar + header ke saath) */}
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Dashboard />} />

        {/* Data pages */}
        <Route path="/users" element={<Users />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/invoices" element={<Invoices />} />
        <Route path="/products" element={<Products />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/stocks" element={<Stocks />} />
        <Route path="/contacts" element={<ContactMessages />} />

        {/* Apps */}
        <Route path="/kanban" element={<Kanban />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/mail" element={<Mail />} />

        {/* Analytics / widgets / forms */}
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/statistics" element={<Statistics />} />
        <Route path="/widget-data" element={<WidgetData />} />
        <Route path="/charts" element={<Charts />} />
        <Route path="/table" element={<TablePage />} />
        <Route path="/forms-validation" element={<FormsValidation />} />
        <Route path="/forms-wizard" element={<FormsWizard />} />

        {/* Prebuilt pages */}
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/maintenance" element={<Maintenance />} />
        <Route path="/faqs" element={<FAQs />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/sample-page" element={<SamplePage />} />

        {/* UI elements + utilities */}
        <Route path="/ui-basic" element={<UiBasic />} />
        <Route path="/ui-advance" element={<UiAdvance />} />
        <Route path="/typography" element={<TypographyPage />} />
        <Route path="/color" element={<Colors />} />
        <Route path="/shadow" element={<Shadow />} />
        <Route path="/icons" element={<Icons />} />
        <Route path="/animation" element={<Animation />} />
        <Route path="/grid" element={<GridDemo />} />

        <Route path="/coming-soon/:id" element={<ComingSoon />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

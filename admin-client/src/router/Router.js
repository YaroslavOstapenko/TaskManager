import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login'; 
import Register from '../pages/Register'; 
import Layout from '../components/Layout'; 
import Users from '../pages/Users';
import Tasks from '../pages/Tasks';
import Company from '../pages/Company';
import Private from '../components/Private';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Private><Layout /></Private>}>
          <Route index element={<Navigate to="/company" />} />
          <Route path="users" element={<Users />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="company" element={<Company />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
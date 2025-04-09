// src/routes/AppRoutes.jsx
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from '../pages/Login'
import Dashboard from '../pages/Dashboard'
import { useSelector } from 'react-redux'
import RoleList from '../pages/roles/RoleList'
import RoleForm from '../pages/roles/RolesForm'

const ProtectedRoute = ({ children }) => {
  const token = useSelector((state) => state.auth.token)
  return token ? children : <Navigate to="/login" replace />
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/roles" element={<ProtectedRoute><RoleList /></ProtectedRoute>} />
      <Route path="/roles/create" element={<ProtectedRoute><RoleForm /></ProtectedRoute>} />
      <Route path="/roles/:id/edit" element={<ProtectedRoute><RoleForm /></ProtectedRoute>} />
      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  )
}

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Generator from "./pages/Generator";
import AdminLayout from "./components/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import Users from "./pages/admin/Users";
import Settings from "./pages/admin/Settings";
import Login from "./pages/admin/Login";

// Auth Guard
const ProtectedRoute = ({ children }) => {
  const session = localStorage.getItem("admin_session");
  if (!session) return <Navigate to="/admin/login" replace />;
  return children;
};

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public Generator Route */}
        <Route path="/" element={<Generator />} />

        {/* User Auth Routes */}
        <Route path="/login" element={<Login isAdmin={false} />} />
        <Route path="/register" element={<Login isAdmin={false} defaultMode="register" />} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<Login isAdmin={true} />} />
        
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute>
              <AdminLayout><Dashboard /></AdminLayout>
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/admin/users" 
          element={
            <ProtectedRoute>
              <AdminLayout><Users /></AdminLayout>
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/admin/settings" 
          element={
            <ProtectedRoute>
              <AdminLayout><Settings /></AdminLayout>
            </ProtectedRoute>
          } 
        />

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Generator from "./pages/Generator";
import Profile from "./pages/Profile";
import AdminLayout from "./components/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import Users from "./pages/admin/Users";
import Settings from "./pages/admin/Settings";
import Login from "./pages/admin/Login";

// Admin Auth Guard
const AdminProtectedRoute = ({ children }) => {
  const session = localStorage.getItem("admin_session");
  if (!session) return <Navigate to="/admin/login" replace />;
  return children;
};

// User Auth Guard
const UserProtectedRoute = ({ children }) => {
  const session = localStorage.getItem("user_session");
  if (!session) return <Navigate to="/login" replace />;
  return children;
};

export default function App() {
  return (
    <Router>
      <Routes>
        {/* User Routes (Protected) */}
        <Route path="/" element={<UserProtectedRoute><Generator /></UserProtectedRoute>} />
        <Route path="/profile" element={<UserProtectedRoute><Profile /></UserProtectedRoute>} />

        {/* User Auth Routes */}
        <Route path="/login" element={<Login isAdmin={false} />} />
        <Route path="/register" element={<Login isAdmin={false} defaultMode="register" />} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<Login isAdmin={true} />} />
        
        <Route 
          path="/admin" 
          element={
            <AdminProtectedRoute>
              <AdminLayout><Dashboard /></AdminLayout>
            </AdminProtectedRoute>
          } 
        />
        
        <Route 
          path="/admin/users" 
          element={
            <AdminProtectedRoute>
              <AdminLayout><Users /></AdminLayout>
            </AdminProtectedRoute>
          } 
        />
        
        <Route 
          path="/admin/settings" 
          element={
            <AdminProtectedRoute>
              <AdminLayout><Settings /></AdminLayout>
            </AdminProtectedRoute>
          } 
        />

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

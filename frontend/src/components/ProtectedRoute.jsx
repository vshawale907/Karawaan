import { Navigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

/**
 * ProtectedRoute — wraps any route that requires login
 * 
 * Usage:
 *   <ProtectedRoute role="admin"><AdminLayout /></ProtectedRoute>
 *   <ProtectedRoute role="agent"><AgentLayout /></ProtectedRoute>
 *   <ProtectedRoute><ProfilePage /></ProtectedRoute>  // any logged-in user
 */
export default function ProtectedRoute({ role, children }) {
  const { currentUser } = useApp();

  // Not logged in → redirect to login
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // Wrong role → redirect to their correct home
  if (role && currentUser.role !== role) {
    if (currentUser.role === 'admin') return <Navigate to="/admin" replace />;
    return <Navigate to="/" replace />;
  }

  return children;
}

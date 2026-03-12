import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedRoute = ({ isAllowed, redirectTo = '/login' }) => {
  // Aquí iría tu lógica de auth (ej. un hook useAuth)
  if (!isAllowed) {
    return <Navigate to={redirectTo} replace />;
  }

  // Outlet renderiza los hijos (tus páginas del dashboard)
  return <Outlet />;
};

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { navConfig } from '@/config/navigation';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { DashboardLayout } from '@/components/layout/DashboardLayout';

function App() {
  const isAuthenticated = true; // Simulación de estado de sesión

  return (
    <BrowserRouter>
      <Routes>
        {/* --- RUTAS PÚBLICAS --- */}
        <Route path="/login" element={<div>Página de Login</div>} />

        {/* --- RUTAS PRIVADAS (Envueltas en el Guard y el Layout) --- */}
        <Route element={<ProtectedRoute isAllowed={isAuthenticated} />}>
          <Route element={<DashboardLayout />}>
            {navConfig.mainNav.map((route) => (
              <Route
                key={route.href}
                path={route.href}
                element={<route.component />}
              />
            ))}
          </Route>
        </Route>

        {/* --- 404 --- */}
        <Route path="*" element={<div>404 - Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

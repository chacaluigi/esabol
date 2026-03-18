import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { navConfig } from '@/config/navigation';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Toaster } from '@/components/ui/sonner';

function App() {
  const isAuthenticated = true; // simulación de estado de sesión

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* rutas publicas */}
          <Route path="/login" element={<div>Página de Login</div>} />

          {/* rutas privadas (Envueltas en el Guard y el Layout) */}
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

          {/* colocar página de error 404 */}
          <Route path="*" element={<div>404 - Not Found</div>} />
        </Routes>
      </BrowserRouter>

      <Toaster position="top-right" richColors />
    </>
  );
}

export default App;

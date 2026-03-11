import { Outlet, Link } from 'react-router-dom';

const Layout = () => {
  return (
    <div>
      <nav>
        <Link to="/">Inicio</Link>
        <Link to="/users">Usuarios</Link>
        <Link to="/settings">Configuración</Link>
      </nav>

      <hr />

      <main>
        <Outlet />
      </main>

      <footer>
        <p>© 2026 Sistema de Control de Tareas</p>
      </footer>
    </div>
  );
};

export default Layout;

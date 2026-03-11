import { createBrowserRouter } from 'react-router-dom';
import UserList from '../features/users/components/UserList';
import Layout from '../components/Layout';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <h2>Bienvenido al Sistema Institucional</h2>,
      },
      {
        path: 'users',
        element: <UserList />,
      },
      {
        path: 'settings',
        element: <div>Configuración del Sistema</div>,
      },
    ],
  },
]);

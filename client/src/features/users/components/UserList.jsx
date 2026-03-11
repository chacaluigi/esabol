import { useUsers } from '../hooks/useUsers';

const UserList = () => {
  const { users, loading, error, refresh } = useUsers();

  if (loading) return <p>Cargando usuarios de la institución...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Lista de Usuarios</h2>
      <button onClick={refresh}>Actualizar Lista</button>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;

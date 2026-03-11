import { useEffect } from 'react';
import { useUserStore } from '../store/useUserStore';
import { getAllUsers } from '../../../services/userService';

export const useUsers = () => {
  const { users, loading, error, setUsers, setLoading, setError } =
    useUserStore();

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await getAllUsers();
      setUsers(data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    if (users.length === 0) fetchUsers();
  }, []);

  return { users, loading, error, refresh: fetchUsers };
};

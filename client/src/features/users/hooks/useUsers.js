import { useEffect } from 'react';
import { useUserStore } from '@/features/users/store/useUserStore';
import * as userService from '@/services/userService';

export const useUsers = () => {
  const {
    users,
    loading,
    error,
    setUsers,
    setLoading,
    setError,
    addUser,
    updateUserInList,
    removeUserFromList,
  } = useUserStore();

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await userService.getAllUsers();
      setUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (userData) => {
    setLoading(true);
    try {
      const newUser = await userService.createUser(userData);
      addUser(newUser);
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (id, userData) => {
    setLoading(true);
    try {
      const updatedUser = await userService.updateUser(id, userData);
      updateUserInList(updatedUser);
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await userService.deleteUser(id);
      removeUserFromList(id);
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  // useEffect para que solo cargue si la lista está vacía
  useEffect(() => {
    if (users.length === 0) fetchUsers();
  }, []);

  return {
    users,
    loading,
    error,
    refresh: fetchUsers,
    addUser: handleAdd,
    updateUser: handleUpdate,
    deleteUser: handleDelete,
  };
};

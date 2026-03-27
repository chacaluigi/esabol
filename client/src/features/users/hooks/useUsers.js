import { useUserStore } from '@/features/users/store/useUserStore';
import * as userService from '@/services/userService';

export const useUsers = () => {
  const {
    users,
    loading,
    error,
    totalPages,
    setUsers,
    setLoading,
    setError,
    setTotalPages,
    addUser,
    updateUserInList,
    removeUserFromList,
  } = useUserStore();

  const fetchUsers = async (page = 1, limit = 10, debouncedSearch = '') => {
    setLoading(true);
    try {
      const response = await userService.getAllUsers(page, limit, debouncedSearch);
      //console.log(response);
      setUsers(response.users);
      setTotalPages(response.totalPages);
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
    setLoading(true);
    try {
      await userService.deleteUser(id);
      removeUserFromList(id);
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // useEffect para que solo cargue si la lista está vacía
  // useEffect(() => {
  //   if (users.length === 0) fetchUsers();
  // }, []);

  return {
    users,
    loading,
    error,
    refresh: fetchUsers,
    addUser: handleAdd,
    updateUser: handleUpdate,
    deleteUser: handleDelete,
    totalPages,
  };
};

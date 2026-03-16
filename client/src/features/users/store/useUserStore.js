import { create } from 'zustand';

export const useUserStore = create((set) => ({
  users: [],
  loading: false,
  error: null,

  // Acciones para modificar el estado
  setUsers: (data) => set({ users: data, loading: false }),
  setLoading: (status) => set({ loading: status }),
  setError: (msg) => set({ error: msg, loading: false }),

  addUser: (user) =>
    set((state) => ({
      users: [user, ...state.users],
    })),

  updateUserInList: (updatedUser) =>
    set((state) => ({
      users: state.users.map((u) =>
        u.id === updatedUser.id ? updatedUser : u,
      ),
    })),

  removeUserFromList: (id) =>
    set((state) => ({
      users: state.users.filter((u) => u.id !== id),
    })),
}));

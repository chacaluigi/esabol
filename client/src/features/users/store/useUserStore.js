import { create } from 'zustand';

export const useUserStore = create((set) => ({
  users: [],
  loading: false,
  error: null,

  // Acciones para modificar el estado
  setUsers: (data) => set({ users: data, loading: false }),
  setLoading: (status) => set({ loading: status }),
  setError: (msg) => set({ error: msg, loading: false }),
}));

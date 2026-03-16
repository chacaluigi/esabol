import { create } from 'zustand';
import { getAllRoles } from '@/services/roleService';

export const useRoleStore = create((set, get) => ({
  roles: [],
  loading: false,

  fetchRoles: async () => {
    // Si ya tenemos roles, no volvemos a llamar a la API
    if (get().roles.length > 0) return;

    set({ loading: true });
    try {
      const data = await getAllRoles();
      set({ roles: data, loading: false });
    } catch (error) {
      console.error('Error cargando roles:', error);
      set({ loading: false });
    }
  },
}));

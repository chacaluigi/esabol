import { useEffect } from 'react';
import { useRoleStore } from '../store/useRoleStore';

export const useRoles = () => {
  const roles = useRoleStore((state) => state.roles);
  const loading = useRoleStore((state) => state.loading);
  const fetchRoles = useRoleStore((state) => state.fetchRoles);

  useEffect(() => {
    fetchRoles();
  }, [fetchRoles]);

  return { roles, loading };
};
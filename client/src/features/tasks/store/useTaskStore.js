import { create } from 'zustand';

export const useTaskStore = create((set) => ({
  tasks: [],
  loading: false,
  error: null,

  setTasks: (data) => set({ tasks: data, loading: false }),
  setLoading: (status) => set({ loading: status }),
  setError: (msg) => set({ error: msg, loading: false }),

  addTask: (task) =>
    set((state) => ({
      tasks: [task, ...state.tasks],
    })),

  updateTaskInList: (updatedTask) =>
    set((state) => ({
      tasks: state.tasks.map((t) =>
        t.id === updatedTask.id ? updatedTask : t
      ),
    })),

  updateTaskStatus: (taskId, newStatus) =>
    set((state) => ({
      tasks: state.tasks.map((t) =>
        t.id === Number(taskId) ? { ...t, status: newStatus } : t
      ),
    })),

  removeTaskFromList: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((t) => t.id !== id),
    })),
}));
import { useEffect } from 'react';
import { useTaskStore } from '../store/useTaskStore';
import * as taskService from '@/services/taskService';
import { toast } from 'sonner';

export const useTasks = () => {
  const {
    tasks,
    loading,
    error,
    setTasks,
    setLoading,
    setError,
    addTask,
    updateTaskInList,
    updateTaskStatus,
    removeTaskFromList,
  } = useTaskStore();

  const fetchTasks = async (filters = {}) => {
    setLoading(true);
    try {
      const data = await taskService.getTasks(filters);
      setTasks(data);
    } catch (err) {
      setError(err.message);
      toast.error('Error al cargar las tareas');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (taskData) => {
    setLoading(true);
    try {
      const newTask = await taskService.createTask(taskData);
      addTask(newTask);
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (id, taskData) => {
    setLoading(true);
    try {
      const updatedTask = await taskService.updateTask(id, taskData);
      updateTaskInList(updatedTask);
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  //función para el drag and drop
  const moveTask = async (taskId, newStatus) => {
    const taskToMove = tasks.find((t) => t.id === Number(taskId));
    if (!taskToMove || taskToMove.status === newStatus) return;

    const previousStatus = taskToMove.status;
    updateTaskStatus(taskId, newStatus);

    try {
      await taskService.updateTask(taskId, { status: newStatus });
      //si se necesita colocar un toast silencioso o nada
    } catch (err) {
      updateTaskStatus(taskId, previousStatus);
      toast.error('No se pudo mover la tarea');
    }
  };

  useEffect(() => {
    if (tasks.length === 0) fetchTasks();
  }, []);

  return {
    tasks,
    loading,
    error,
    refresh: fetchTasks,
    addTask: handleAdd,
    updateTask: handleUpdate,
    moveTask,
  };
};
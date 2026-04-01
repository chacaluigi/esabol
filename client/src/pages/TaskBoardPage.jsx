import { useTasks } from '@/features/tasks/hooks/useTasks';
import { TaskColumn } from '@/features/tasks/components/TaskColumn';
import { Button } from '@/components/ui/button';
import { Plus, RefreshCw } from 'lucide-react';
import { Spinner } from '@/components/ui/spinner';
import { useState } from 'react';
import { TaskFormModal } from '@/features/tasks/components/TaskFormModal';
import { toast } from 'sonner';

const TaskBoardPage = () => {
  const { tasks, loading, addTask, updateTask, refresh, moveTask } = useTasks();

  const todoTasks = tasks.filter((t) => t.status === 'TO_DO');
  const doingTasks = tasks.filter((t) => t.status === 'DOING');
  const doneTasks = tasks.filter((t) => t.status === 'DONE');

  const [modalConfig, setModalConfig] = useState({
    open: false,
    task: null,
    mode: 'add',
  });

  const handleEditTask = (task) => {
    setModalConfig({ open: true, task, mode: 'edit' });
  };

  const handleOpenAddModal = (initialStatus = 'To do') => {
    setModalConfig({
      open: true,
      task: { status: initialStatus },
      mode: 'add',
    });
  };

  const onSave = async (data) => {
    let result;
    if (modalConfig.mode === 'add') {
      // Importante: Asegurarse de enviar creatorId
      result = await addTask({ ...data, creatorId: 36 });
    } else {
      result = await updateTask(modalConfig.task.id, data);
    }

    if (result.success) {
      toast.success(
        modalConfig.mode === 'add' ? 'Tarea creada' : 'Tarea actualizada',
      );
      setModalConfig((prev) => ({ ...prev, open: false }));
    } else {
      toast.error(result.error);
    }
  };

  return (
    <div className="space-y-6 h-full flex flex-col">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Tablero de Tareas
          </h1>
          <p className="text-sm text-slate-500">
            Gestiona el progreso del equipo arrastrando las tarjetas
          </p>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={refresh}
            disabled={loading}
          >
            {loading ? (
              <Spinner className="w-4 h-4" />
            ) : (
              <RefreshCw className="w-4 h-4" />
            )}
          </Button>
          <Button
            className="bg-blue-600 hover:bg-blue-700"
            onClick={handleOpenAddModal}
          >
            <Plus className="w-4 h-4 mr-2" /> Nueva Tarea
          </Button>
        </div>
      </div>

      {/* Columnas tipo Kanban */}
      <div className="flex flex-1 gap-6 overflow-x-auto pb-4">
        <TaskColumn
          title="Por Hacer"
          status="TO_DO"
          tasks={todoTasks}
          onMoveTask={moveTask}
          onEditTask={handleEditTask}
          onAddTask={handleOpenAddModal}
        />
        <TaskColumn
          title="En Progreso"
          status="DOING"
          tasks={doingTasks}
          onMoveTask={moveTask}
          onEditTask={handleEditTask}
          onAddTask={handleOpenAddModal}
        />
        <TaskColumn
          title="Completadas"
          status="DONE"
          tasks={doneTasks}
          onMoveTask={moveTask}
          onEditTask={handleEditTask}
          onAddTask={handleOpenAddModal}
        />
      </div>

      <TaskFormModal
        open={modalConfig.open}
        onOpenChange={(open) => setModalConfig((prev) => ({ ...prev, open }))}
        task={modalConfig.task}
        mode={modalConfig.mode}
        onSave={onSave}
        isLoading={loading}
      />
    </div>
  );
};

export default TaskBoardPage;

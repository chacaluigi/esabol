import { useTasks } from '@/features/tasks/hooks/useTasks';
import { TaskColumn } from '@/features/tasks/components/TaskColumn';
import { Button } from '@/components/ui/button';
import { Plus, RefreshCw } from 'lucide-react';
import { Spinner } from '@/components/ui/spinner';

const TaskBoardPage = () => {
  const { tasks, loading, refresh, moveTask } = useTasks();

  const todoTasks = tasks.filter((t) => t.status === 'TO_DO');
  const doingTasks = tasks.filter((t) => t.status === 'DOING');
  const doneTasks = tasks.filter((t) => t.status === 'DONE');

  const handleEditTask = (task) => {
    //para abrir TaskFormModal
    console.log('Editar tarea:', task);
  };

  const handleOpenAddModal = () => {
    //para abrir el modal en modo add
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
        />
        <TaskColumn
          title="En Progreso"
          status="DOING"
          tasks={doingTasks}
          onMoveTask={moveTask}
          onEditTask={handleEditTask}
        />
        <TaskColumn
          title="Completadas"
          status="DONE"
          tasks={doneTasks}
          onMoveTask={moveTask}
          onEditTask={handleEditTask}
        />
      </div>

      {/* TaskFormModal irá aquí */}
    </div>
  );
};

export default TaskBoardPage;

import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TaskCard } from './TaskCard';

export function TaskColumn({
  title,
  status,
  tasks,
  onMoveTask,
  onEditTask,
  onAddTask,
}) {
  const handleDragOver = (e) => {
    e.preventDefault();
    e.currentTarget.classList.add('bg-slate-200/50');
  };

  const handleDragLeave = (e) => {
    e.currentTarget.classList.remove('bg-slate-200/50');
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.currentTarget.classList.remove('bg-slate-200/50');

    const taskId = e.dataTransfer.getData('taskId');
    if (taskId) {
      onMoveTask(taskId, status);
    }
  };

  return (
    <div className="flex flex-col flex-1 min-w-[300px] bg-slate-100 rounded-xl p-3 h-[calc(100vh-180px)]">
      <div className="flex items-center justify-between px-2 pb-3">
        <h3 className="font-semibold text-slate-700">{title}</h3>
        <span className="bg-slate-200 text-slate-600 text-xs font-medium px-2 py-1 rounded-full">
          {tasks.length}
        </span>
      </div>

      <div
        className="flex-1 overflow-y-auto space-y-3 p-1 transition-colors rounded-lg"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} onEdit={onEditTask} />
        ))}

        {/* zona vacía que aparece cuando no hay tareas para facilitar el drop */}
        {tasks.length === 0 && (
          <div className="h-24 border-2 border-dashed border-slate-300 rounded-lg flex items-center justify-center text-sm text-slate-400">
            Suelta una tarea aquí
          </div>
        )}
      </div>

      <Button
        variant="ghost"
        className="mt-3 w-full justify-start text-slate-500 hover:text-slate-900 hover:bg-slate-200"
        onClick={() => onAddTask(status)}
      >
        <Plus className="w-4 h-4 mr-2" />
        Añadir tarea
      </Button>
    </div>
  );
}

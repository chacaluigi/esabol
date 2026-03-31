import { Badge } from '@/components/ui/badge';
import { Calendar, AlignLeft } from 'lucide-react';

export function TaskCard({ task, onEdit }) {
  const handleDragStart = (e) => {
    e.dataTransfer.setData('taskId', task.id.toString());
    e.currentTarget.classList.add('opacity-50');
  };

  const handleDragEnd = (e) => {
    e.currentTarget.classList.remove('opacity-50');
  };

  const priorityColors = {
    High: 'bg-red-100 text-red-700 border-red-200',
    Medium: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    Low: 'bg-green-100 text-green-700 border-green-200',
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onClick={() => onEdit(task)}
      className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 cursor-grab active:cursor-grabbing hover:ring-2 hover:ring-blue-400 hover:ring-offset-1 transition-all"
    >
      <div className="flex justify-between items-start mb-2">
        <Badge
          variant="outline"
          className={`${priorityColors[task.priority]} text-[10px]`}
        >
          {task.priority}
        </Badge>
        <span className="text-xs text-slate-400 font-medium">#{task.id}</span>
      </div>

      <h4 className="text-sm font-semibold text-slate-800 mb-1 leading-snug">
        {task.title}
      </h4>

      {task.description && (
        <AlignLeft className="w-4 h-4 text-slate-400 mb-3" />
      )}

      {task.dueDate && (
        <div className="flex items-center text-xs text-slate-500 mt-3 pt-3 border-t border-slate-50">
          <Calendar className="w-3 h-3 mr-1" />
          {new Date(task.dueDate).toLocaleDateString()}
        </div>
      )}
    </div>
  );
}

import { useState, useMemo, useEffect } from 'react';
import { useTasks } from '@/features/tasks/hooks/useTasks';
import { ProgressCalendar } from '@/features/calendar/components/ProgressCalendar';
import { UserSearchBox } from '@/features/tasks/components/UserSearchBox';
import { Badge } from '@/components/ui/badge';
import { Calendar as CalendarIcon, Check, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

const CalendarPage = () => {
  const { tasks, fetchTasks } = useTasks();
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  //filtrar tareas para el calendario y el panel basadas en el usuario seleccionado
  const filteredTasks = useMemo(() => {
    if (!selectedUser) return tasks;

    //buscamos en el array assignees
    return tasks.filter((task) =>
      task.assignees?.some((assignee) => assignee.id === selectedUser.id),
    );
  }, [tasks, selectedUser]);

  //extraer solo las tareas TO_DO y DOING
  const pendingTasks = useMemo(() => {
    return filteredTasks
      .filter((t) => t.status !== 'DONE')
      .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate)); // Ordenar por fecha más próxima
  }, [filteredTasks]);

  return (
    <div className="space-y-6 h-full flex flex-col">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">
          Progreso y Calendario
        </h1>
        <p className="text-sm text-slate-500">
          Visualiza las fechas de entrega y filtra el progreso por miembro del
          equipo.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        {/* PANEL PRINCIPAL: calendario */}
        <div className="lg:col-span-3 space-y-4">
          <ProgressCalendar tasks={filteredTasks} />
        </div>

        {/* PANEL LATERAL: tareas*/}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 h-[calc(100vh-140px)] flex flex-col">
          <div className="mb-4 space-y-2">
            <h3 className="font-semibold text-slate-700 text-sm">
              Filtrar por Usuario
            </h3>
            <UserSearchBox
              selectedUser={selectedUser}
              onSelectUser={setSelectedUser}
            />
          </div>

          <div className="border-t border-slate-100 pt-4 mb-2 flex items-center justify-between">
            <h3 className="font-semibold text-slate-700 text-sm flex items-center">
              <Clock className="w-4 h-4 mr-2 text-orange-500" />
              Pendientes
            </h3>
            <Badge
              variant="secondary"
              className="bg-orange-100 text-orange-700"
            >
              {pendingTasks.length}
            </Badge>
          </div>

          {/*listado scrolleable de tareas pendientes */}
          <div className="flex-1 overflow-y-auto space-y-3 pr-1 custom-scrollbar">
            {pendingTasks.length > 0 ? (
              pendingTasks.map((task) => (
                <div
                  key={task.id}
                  className="p-3 border border-slate-100 rounded-lg hover:border-blue-200 hover:bg-blue-50/50 transition-colors cursor-pointer"
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-[10px] font-bold text-slate-400">
                      #{task.id}
                    </span>
                    <Badge variant="outline" className="text-[9px] h-4 py-0">
                      {task.status}
                    </Badge>
                  </div>
                  <h4 className="text-sm font-medium text-slate-800 leading-tight mb-2">
                    {task.title}
                  </h4>
                  {task.dueDate && (
                    <div className="flex items-center text-[10px] text-slate-500">
                      <CalendarIcon className="w-3 h-3 mr-1" />
                      {format(new Date(task.dueDate), "d 'de' MMM", {
                        locale: es,
                      })}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="h-32 flex flex-col items-center justify-center text-center p-4">
                <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mb-2">
                  <Check className="w-6 h-6 text-green-500" />
                </div>
                <p className="text-sm font-medium text-slate-600">
                  Todo al día
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  No hay tareas pendientes para este contexto.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;

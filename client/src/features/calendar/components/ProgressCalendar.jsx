import { useState } from 'react';
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isToday,
  isSameDay,
} from 'date-fns';
import { es } from 'date-fns/locale';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

export function ProgressCalendar({ tasks }) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const weekDays = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      {/* header del calendario */}
      <div className="flex items-center justify-between p-4 border-b border-slate-100">
        <h2 className="text-lg font-bold text-slate-800 capitalize">
          {format(currentDate, 'MMMM yyyy', { locale: es })}
        </h2>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={prevMonth}>
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={nextMonth}>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* días de la semana */}
      <div className="grid grid-cols-7 bg-slate-50 border-b border-slate-100">
        {weekDays.map((day) => (
          <div
            key={day}
            className="py-2 text-center text-xs font-semibold text-slate-500"
          >
            {day}
          </div>
        ))}
      </div>

      {/* cuadrícula de días */}
      <div className="grid grid-cols-7 gap-px bg-slate-200">
        {/* espacios vacíos para alinear el primer día del mes */}
        {Array.from({ length: monthStart.getDay() }).map((_, index) => (
          <div key={`empty-${index}`} className="bg-white min-h-[100px]" />
        ))}

        {/* días del mes */}
        {daysInMonth.map((day) => {
          // filtrar tareas que vencen este día
          const dayTasks = tasks.filter(
            (t) => t.dueDate && isSameDay(new Date(t.dueDate), day),
          );
          const total = dayTasks.length;
          const done = dayTasks.filter((t) => t.status === 'DONE').length;
          const progressPercent =
            total === 0 ? 0 : Math.round((done / total) * 100);

          return (
            <div
              key={day.toString()}
              className={`bg-white min-h-[100px] p-2 flex flex-col ${!isSameMonth(day, monthStart) ? 'opacity-50' : ''}`}
            >
              <div className="flex justify-between items-start mb-2">
                <span
                  className={`text-sm font-medium w-6 h-6 flex items-center justify-center rounded-full ${isToday(day) ? 'bg-blue-600 text-white' : 'text-slate-700'}`}
                >
                  {format(day, 'd')}
                </span>
                {total > 0 && (
                  <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
                    {done}/{total}
                  </span>
                )}
              </div>

              {/* barra de progreso y listado de tareas */}
              {total > 0 && (
                <div className="mt-auto space-y-2">
                  <Progress value={progressPercent} className="h-1.5" />
                  <div className="space-y-1">
                    {dayTasks.slice(0, 2).map((task) => (
                      <div
                        key={task.id}
                        className="text-[10px] truncate text-slate-600 bg-slate-50 p-1 rounded"
                      >
                        <span
                          className={`inline-block w-1.5 h-1.5 rounded-full mr-1 ${task.status === 'Done' ? 'bg-green-500' : 'bg-orange-500'}`}
                        />
                        {task.title}
                      </div>
                    ))}
                    {total > 2 && (
                      <div className="text-[10px] text-slate-400 font-medium pl-1">
                        +{total - 2} más
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

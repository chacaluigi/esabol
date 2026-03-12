import { StatCard } from '@/components/dashboard/StatCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const barData = [
  { name: 'A', uv: 20 },
  { name: 'B', uv: 35 },
  { name: 'C', uv: 25 },
  { name: 'D', uv: 45 },
  { name: 'E', uv: 60 },
  { name: 'F', uv: 50 },
  { name: 'G', uv: 65 },
];

const areaData = [
  { name: '1', value: 30 },
  { name: '2', value: 45 },
  { name: '3', value: 35 },
  { name: '4', value: 60 },
  { name: '5', value: 40 },
  { name: '6', value: 70 },
];

const pieData = [
  { name: '100%', value: 100, color: '#3b82f6' },
  { name: '75%', value: 75, color: '#6366f1' },
  { name: '50%', value: 50, color: '#8b5cf6' },
  { name: '25%', value: 25, color: '#a855f7' },
];

export default function DashboardPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Fila 1: KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Monthly earning"
          value="126.45"
          valueColor="text-sky-400"
        />
        <StatCard
          title="Unpaid earning"
          value="3,256.67"
          valueColor="text-blue-500"
        />
        <StatCard title="Total download" value="5,152" highlight={true} />
      </div>

      {/* Fila 2: Mapa, Barras y Gráfico Radial */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-64">
        <Card className="border-none shadow-sm flex items-center justify-center bg-white">
          {/* Placeholder para mapa (puedes usar react-simple-maps) */}
          <span className="text-gray-300">World Map Component</span>
        </Card>

        <Card className="border-none shadow-sm bg-white p-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={barData}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <Bar
                dataKey="uv"
                fill="#3b82f6"
                radius={[2, 2, 0, 0]}
                barSize={12}
              />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="border-none shadow-sm bg-white flex items-center justify-center relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="40%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          {/* Leyenda manual a la derecha */}
          <div className="absolute right-6 flex flex-col gap-2 text-xs text-gray-400">
            {pieData.map((d, i) => (
              <div key={i} className="flex items-center gap-2">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: d.color }}
                ></span>
                {d.name}
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Fila 3: Progreso, Engagement, Calendario */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="border-none shadow-sm bg-white p-6 flex flex-col justify-center space-y-6">
          {[70, 45, 80, 90].map((val, i) => (
            <div key={i} className="w-full bg-gray-100 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full relative"
                style={{ width: `${val}%` }}
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-gray-300 rounded-full border-2 border-white translate-x-1/2 shadow"></div>
              </div>
            </div>
          ))}
          <p className="text-xs text-gray-400 mt-4 leading-relaxed">
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
            nonummy nibh.
          </p>
        </Card>

        <Card className="border-none shadow-sm bg-white pt-6">
          <CardHeader className="py-0 pb-2 px-6">
            <CardTitle className="text-sm font-medium text-gray-400">
              Engagement
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 h-40">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={areaData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorValue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-white p-6 flex items-center justify-center">
          {/* Placeholder para calendario. Puedes usar react-day-picker que viene con Shadcn UI */}
          <span className="text-gray-300 text-sm">Calendar Component</span>
        </Card>
      </div>

      {/* Fila 4: Footer banners */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border-none shadow-sm bg-white p-4 flex items-center">
          <p className="text-sm text-gray-400">
            <span className="text-sky-400 font-medium">Lorem ipsum</span> dolor
            sit amet consectetuer, adipiscing elit
          </p>
        </Card>
        <Card className="border-none shadow-sm bg-white p-4 flex items-center justify-between">
          <span className="text-gray-400 font-medium text-lg">
            Data: <span className="text-sky-500 font-bold">1,234</span>
          </span>
          {/* Icono de barras mini */}
          <div className="flex gap-1 items-end h-6">
            <div className="w-1.5 h-3 bg-blue-500"></div>
            <div className="w-1.5 h-6 bg-blue-500"></div>
            <div className="w-1.5 h-4 bg-blue-500"></div>
          </div>
        </Card>
      </div>
    </div>
  );
}

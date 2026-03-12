import { Card, CardContent } from '@/components/ui/card';

export function StatCard({
  title,
  value,
  highlight = false,
  valueColor = 'text-blue-500',
}) {
  return (
    <Card
      className={`border-none shadow-sm rounded-sm ${highlight ? 'bg-blue-500 text-white' : 'bg-white'}`}
    >
      <CardContent className="p-6 flex items-center justify-between h-full">
        <div
          className={`text-sm font-medium leading-tight max-w-[80px] ${highlight ? 'text-blue-100' : 'text-gray-400'}`}
        >
          {title}
        </div>
        <div
          className={`text-3xl font-bold ${highlight ? 'text-white' : valueColor}`}
        >
          {value}
        </div>
      </CardContent>
    </Card>
  );
}

import { Skeleton } from '@/components/ui/skeleton';
import { TableBody, TableCell, TableRow } from '@/components/ui/table';

export function UserTableSkeleton({ rows = 5 }) {
  //array para iterar las filas
  const skeletonRows = Array.from({ length: rows });

  return (
    <TableBody>
      {skeletonRows.map((_, index) => (
        <TableRow key={index} className="hover:bg-transparent">
          {/* Columna Usuario (Nombre) */}
          <TableCell className="w-[30%]">
            <Skeleton className="h-5 w-[80%] rounded" />
          </TableCell>

          {/* Columna Email */}
          <TableCell className="w-[30%]">
            <Skeleton className="h-5 w-[90%] rounded" />
          </TableCell>

          {/* Columna Rol */}
          <TableCell className="w-[15%]">
            <Skeleton className="h-5 w-[60%] rounded" />
          </TableCell>

          {/* Columna Estado */}
          <TableCell className="w-[15%]">
            <Skeleton className="h-6 w-20 rounded-full" />{' '}
            {/* Simula el Badge */}
          </TableCell>

          {/* Columna Acciones */}
          <TableCell className="text-right w-[10%]">
            <div className="flex justify-end">
              <Skeleton className="h-8 w-8 rounded-md" />{' '}
            </div>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}

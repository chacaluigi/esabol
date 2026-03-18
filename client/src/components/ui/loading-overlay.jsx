import { Spinner } from './spinner';

export function LoadingOverlay({ message = 'Procesando...' }) {
  return (
    <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-white/60 backdrop-blur-[1px] transition-all">
      <Spinner className="h-8 w-8 text-blue-600" />
      <p className="mt-2 text-sm font-medium text-slate-700">{message}</p>
    </div>
  );
}

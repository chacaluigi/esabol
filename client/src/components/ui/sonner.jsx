import { useTheme } from 'next-themes';
import { Toaster as Sonner } from 'sonner';
import {
  CircleCheckIcon,
  InfoIcon,
  TriangleAlertIcon,
  OctagonXIcon,
  Loader2Icon,
} from 'lucide-react';

const Toaster = ({ ...props }) => {
  const { theme = 'light' } = useTheme();

  return (
    <Sonner
      theme={theme}
      className="toaster group"
      icons={{
        success: <CircleCheckIcon className="size-4 text-green-500" />,
        info: <InfoIcon className="size-4 text-blue-500" />,
        warning: <TriangleAlertIcon className="size-4 text-amber-500" />,
        error: <OctagonXIcon className="size-4 text-red-500" />,
        loading: (
          <Loader2Icon className="size-4 animate-spin text-dash-primary" />
        ),
      }}
      //utilizar variables de global.css
      toastOptions={{
        classNames: {
          toast:
            'group toast font-sans border-border bg-card text-foreground shadow-lg rounded-[var(--radius)]',
          description: 'text-dash-text-muted text-xs',
          actionButton: 'bg-primary text-primary-foreground font-medium',
          cancelButton: 'bg-muted text-muted-foreground',
          success:
            'border-green-500/20 bg-green-50/50 text-green-900 dark:text-green-100',
          error:
            'border-red-500/20 bg-red-50/50 text-red-900 dark:text-red-100',
        },
      }}
      //estilos CSS inline para compatibilidad con Sonner
      style={{
        '--normal-bg': 'hsl(var(--card))',
        '--normal-text': 'hsl(var(--foreground))',
        '--normal-border': 'hsl(var(--border))',
        '--border-radius': 'var(--radius)',
      }}
      {...props}
    />
  );
};

export { Toaster };

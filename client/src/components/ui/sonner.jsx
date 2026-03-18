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

  const iconClass = 'size-4 animate-in fade-in duration-500 fill-none';
  const delayStyle = {
    animationDelay: '1000ms',
    animationFillMode: 'backwards',
  };

  return (
    <Sonner
      theme={theme}
      className="toaster group"
      icons={{
        success: (
          <CircleCheckIcon
            className={`${iconClass} text-green-500`}
            style={delayStyle}
          />
        ),
        info: (
          <InfoIcon
            className={`${iconClass} text-blue-500`}
            style={delayStyle}
          />
        ),
        warning: (
          <TriangleAlertIcon
            className={`${iconClass} text-amber-500`}
            style={delayStyle}
          />
        ),
        error: (
          <OctagonXIcon
            className={`${iconClass} text-red-500`}
            style={delayStyle}
          />
        ),
        loading: (
          <Loader2Icon className="size-4 animate-spin text-dash-primary" />
        ),
      }}
      toastOptions={{
        classNames: {
          toast:
            'group toast font-sans border-border bg-card text-foreground shadow-lg rounded-[var(--radius)]',
          description: 'text-dash-text-muted text-xs',
          content: 'transition-all duration-300',
        },
      }}
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

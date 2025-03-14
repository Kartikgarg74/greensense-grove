
import React from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  hoverEffect?: boolean;
  className?: string;
}

const GlassCard: React.FC<GlassCardProps> = ({
  children,
  hoverEffect = false,
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        hoverEffect ? 'glass-card-hover' : 'glass-card',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default GlassCard;

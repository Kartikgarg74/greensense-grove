
import React from 'react';
import { cn } from '@/lib/utils';

interface AnimatedIconProps {
  icon: React.ReactNode;
  animation?: 'pulse' | 'float' | 'bounce' | 'none';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const AnimatedIcon: React.FC<AnimatedIconProps> = ({
  icon,
  animation = 'none',
  size = 'md',
  className
}) => {
  const sizeClasses = {
    sm: 'w-5 h-5',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-10 h-10'
  };

  const animationClasses = {
    pulse: 'animate-pulse-slow',
    float: 'animate-float',
    bounce: 'animate-bounce',
    none: ''
  };

  return (
    <div className={cn(
      sizeClasses[size],
      animationClasses[animation],
      'text-greensense-600 flex items-center justify-center',
      className
    )}>
      {icon}
    </div>
  );
};

export default AnimatedIcon;

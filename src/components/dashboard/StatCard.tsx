
import React from 'react';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import GlassCard from '../ui-elements/GlassCard';
import AnimatedIcon from '../ui-elements/AnimatedIcon';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: {
    value: number;
    type: 'increase' | 'decrease' | 'neutral';
  };
  colorScheme?: 'green' | 'blue' | 'amber' | 'default';
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  change,
  colorScheme = 'default',
  className
}) => {
  const colorMap = {
    green: 'from-greensense-100 to-greensense-50 text-greensense-600',
    blue: 'from-sky-100 to-sky-50 text-sky-600',
    amber: 'from-earth-100 to-earth-50 text-earth-600',
    default: 'from-gray-100 to-gray-50 text-gray-600'
  };

  const iconContainerColorMap = {
    green: 'bg-greensense-100 text-greensense-600',
    blue: 'bg-sky-100 text-sky-600',
    amber: 'bg-earth-100 text-earth-600',
    default: 'bg-gray-100 text-gray-600'
  };

  const changeTextColorMap = {
    increase: 'text-green-600',
    decrease: 'text-red-500',
    neutral: 'text-gray-500'
  };

  return (
    <GlassCard className={cn('overflow-hidden', className)}>
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <h3 className="mt-1 text-2xl font-semibold text-gray-900">{value}</h3>
          </div>
          <div className={cn(
            'flex items-center justify-center w-10 h-10 rounded-full',
            iconContainerColorMap[colorScheme]
          )}>
            <AnimatedIcon icon={icon} animation="pulse" />
          </div>
        </div>
        
        {change && (
          <div className="mt-3 flex items-center">
            <span className={cn('text-sm font-medium flex items-center gap-1', changeTextColorMap[change.type])}>
              {change.type === 'increase' && <ArrowUp className="w-3.5 h-3.5" />}
              {change.type === 'decrease' && <ArrowDown className="w-3.5 h-3.5" />}
              {Math.abs(change.value)}%
            </span>
            <span className="ml-1.5 text-xs text-gray-500">from last month</span>
          </div>
        )}
      </div>
      
      {/* Bottom gradient */}
      <div className={cn(
        'h-1 w-full bg-gradient-to-r',
        colorMap[colorScheme]
      )} />
    </GlassCard>
  );
};

export default StatCard;


import React from 'react';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import GlassCard from '../ui-elements/GlassCard';
import AnimatedIcon from '../ui-elements/AnimatedIcon';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  linkTo: string;
  className?: string;
  colorScheme?: 'green' | 'blue' | 'amber' | 'default';
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon,
  linkTo,
  className,
  colorScheme = 'default'
}) => {
  const colorMap = {
    green: 'bg-greensense-50 border-greensense-100',
    blue: 'bg-sky-50 border-sky-100',
    amber: 'bg-earth-50 border-earth-100',
    default: 'bg-white border-gray-100'
  };

  const iconColorMap = {
    green: 'text-greensense-600',
    blue: 'text-sky-600',
    amber: 'text-earth-600',
    default: 'text-gray-600'
  };

  return (
    <GlassCard
      className={cn(
        'group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg',
        className
      )}
    >
      <a href={linkTo} className="block p-6">
        <div className="flex items-center justify-between mb-4">
          <div className={cn(
            'w-12 h-12 rounded-xl flex items-center justify-center',
            colorMap[colorScheme]
          )}>
            <AnimatedIcon 
              icon={icon}
              animation="float"
              size="lg"
              className={iconColorMap[colorScheme]}
            />
          </div>
          <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-greensense-500 transition-colors" />
        </div>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </a>
    </GlassCard>
  );
};

export default FeatureCard;

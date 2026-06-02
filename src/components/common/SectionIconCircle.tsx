import React from 'react';
import { LucideIcon } from 'lucide-react';

interface SectionIconCircleProps {
  icon: LucideIcon;
  circleClassName?: string;
  iconClassName?: string;
  className?: string;
}

const SectionIconCircle: React.FC<SectionIconCircleProps> = ({
  icon: Icon,
  circleClassName = 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400',
  iconClassName = '',
  className = '',
}) => (
  <div
    className={`w-14 h-14 rounded-full flex items-center justify-center shrink-0 ${circleClassName} ${className}`}
  >
    <Icon className={`h-6 w-6 ${iconClassName}`} />
  </div>
);

export default SectionIconCircle;


import { useState } from 'react';
import { Interest } from '@/data/interests';
import { cn } from '@/lib/utils';
import * as LucideIcons from 'lucide-react';
import { Icon } from 'lucide-react';

// Define a type that represents all available icons in Lucide
type LucideIconName = keyof typeof LucideIcons;

interface InterestCardProps {
  interest: Interest;
  selected: boolean;
  onToggle: (id: string) => void;
}

export const InterestCard = ({ interest, selected, onToggle }: InterestCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Safer way to render the icon
  const renderIcon = () => {
    // Check if the icon name exists in LucideIcons
    if (interest.icon in LucideIcons) {
      const IconComponent = LucideIcons[interest.icon as LucideIconName];
      return <IconComponent size={20} />;
    }
    // Fallback to a default icon if the name doesn't exist
    return <LucideIcons.Circle size={20} />;
  };
  
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-xl transition-all duration-300 cursor-pointer',
        'border border-gray-100 dark:border-gray-800',
        'hover:shadow-md hover:-translate-y-1',
        selected ? 
          'ring-2 ring-primary shadow-md' : 
          'bg-white dark:bg-gray-900',
          interest.color
      )}
      onClick={() => onToggle(interest.id)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="p-5">
        <div className="flex items-center justify-between mb-2">
          <div className={cn(
            'w-10 h-10 rounded-full flex items-center justify-center',
            'transition-transform duration-300',
            isHovered || selected ? 'scale-110' : ''
          )}>
            {renderIcon()}
          </div>
          
          <div className={cn(
            'w-5 h-5 rounded-full border transition-all duration-300',
            selected ? 
              'bg-primary border-primary' : 
              'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700'
          )}>
            {selected && (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            )}
          </div>
        </div>
        
        <h3 className="font-medium text-base mt-3">{interest.name}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{interest.description}</p>
      </div>
      
      {/* Animation indicator */}
      {(selected || isHovered) && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
          <div className={cn(
            'absolute -right-10 -bottom-10 w-24 h-24 rounded-full',
            'animate-pulse bg-primary/30'
          )}></div>
        </div>
      )}
    </div>
  );
};


import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Nonprofit } from '@/data/nonprofits';
import { interests } from '@/data/interests';
import { cn } from '@/lib/utils';
import { ChevronRight, MapPin } from 'lucide-react';

interface NonprofitCardProps {
  nonprofit: Nonprofit;
  selectedInterests: string[];
}

export const NonprofitCard = ({ nonprofit, selectedInterests }: NonprofitCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Calculate match score (percentage of selected interests that match)
  const calculateMatchScore = (): number => {
    if (selectedInterests.length === 0) return 0;
    
    const matchingInterests = nonprofit.interests.filter(interest => 
      selectedInterests.includes(interest)
    );
    
    return Math.round((matchingInterests.length / selectedInterests.length) * 100);
  };
  
  const matchScore = calculateMatchScore();
  
  // Get interest names for display
  const interestNames = nonprofit.interests.map(id => {
    const interest = interests.find(i => i.id === id);
    return interest?.name || '';
  });
  
  return (
    <div 
      className={cn(
        'relative rounded-xl overflow-hidden transition-all duration-300',
        'border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900',
        'hover:shadow-lg hover:-translate-y-1'
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="p-6">
        {matchScore > 0 && (
          <div className="absolute top-4 right-4 bg-primary/10 text-primary rounded-full px-3 py-1 text-xs font-medium">
            {matchScore}% match
          </div>
        )}
        
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
            <img src={nonprofit.logo} alt={nonprofit.name} className="w-full h-full object-cover" />
          </div>
          
          <div>
            <h3 className="font-medium text-lg">{nonprofit.name}</h3>
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mt-1">
              <MapPin size={14} className="mr-1" />
              {nonprofit.location}
            </div>
          </div>
        </div>
        
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
          {nonprofit.description}
        </p>
        
        <div className="mb-4">
          <p className="text-xs text-gray-500 dark:text-gray-500 mb-2">Focus Areas:</p>
          <div className="flex flex-wrap gap-2">
            {interestNames.map((name, index) => (
              <span 
                key={index} 
                className="inline-block bg-gray-100 dark:bg-gray-800 rounded-full px-3 py-1 text-xs"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
        
        <Link 
          to={`/nonprofit/${nonprofit.id}`} 
          className={cn(
            'inline-flex items-center text-sm font-medium text-primary mt-2',
            'transition-all duration-200',
            isHovered ? 'translate-x-1' : ''
          )}
        >
          View Details
          <ChevronRight size={16} className="ml-1" />
        </Link>
      </div>
      
      {/* Subtle gradient at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/50 to-primary opacity-60"></div>
    </div>
  );
};

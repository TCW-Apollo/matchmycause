
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CallToActionProps {
  title: string;
  description: string;
  primaryButtonText: string;
  primaryButtonLink: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  className?: string;
}

export const CallToAction = ({
  title,
  description,
  primaryButtonText,
  primaryButtonLink,
  secondaryButtonText,
  secondaryButtonLink,
  className
}: CallToActionProps) => {
  const [isPrimaryHovered, setPrimaryHovered] = useState(false);
  
  return (
    <div className={cn(
      'p-8 sm:p-10 rounded-2xl glass-effect text-center',
      className
    )}>
      <h2 className="text-2xl sm:text-3xl font-semibold mb-4">{title}</h2>
      <p className="text-muted-foreground max-w-2xl mx-auto text-balance mb-8">{description}</p>
      
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link
          to={primaryButtonLink}
          className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-primary text-white font-medium hover:bg-primary/90 transition-all duration-300 shadow-sm hover:shadow transform hover:-translate-y-0.5 w-full sm:w-auto"
          onMouseEnter={() => setPrimaryHovered(true)}
          onMouseLeave={() => setPrimaryHovered(false)}
        >
          {primaryButtonText}
          <ArrowRight className={cn(
            'ml-2 w-4 h-4 transition-transform duration-300',
            isPrimaryHovered ? 'translate-x-1' : ''
          )} />
        </Link>
        
        {secondaryButtonText && secondaryButtonLink && (
          <Link
            to={secondaryButtonLink}
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-secondary text-secondary-foreground font-medium hover:bg-secondary/80 transition-all duration-300 w-full sm:w-auto"
          >
            {secondaryButtonText}
          </Link>
        )}
      </div>
    </div>
  );
};

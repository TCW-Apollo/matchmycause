
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { InterestCard } from '@/components/InterestCard';
import { interests } from '@/data/interests';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/components/ui/use-toast';

const InterestSelection = () => {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);
  
  const handleToggleInterest = (id: string) => {
    setSelectedInterests(prev => {
      if (prev.includes(id)) {
        return prev.filter(item => item !== id);
      } else {
        // Limit to maximum 5 interests
        if (prev.length >= 5) {
          toast({
            title: "Maximum 5 interests",
            description: "Please unselect an interest before adding a new one.",
            variant: "destructive",
          });
          return prev;
        }
        return [...prev, id];
      }
    });
  };
  
  const handleContinue = () => {
    if (selectedInterests.length === 0) {
      toast({
        title: "No interests selected",
        description: "Please select at least one interest to continue.",
        variant: "destructive",
      });
      return;
    }
    
    // Store selected interests in session storage
    sessionStorage.setItem('selectedInterests', JSON.stringify(selectedInterests));
    
    // Navigate to nonprofits discovery page
    navigate('/nonprofits');
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-32 pb-20">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className={cn(
              'inline-block px-4 py-1.5 mb-6 text-sm font-medium rounded-full',
              'bg-primary/10 text-primary',
              'transform transition-all duration-700',
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            )}>
              Step 1 of 2
            </span>
            
            <h1 className={cn(
              'text-3xl md:text-4xl font-bold tracking-tight text-balance mb-6',
              'transform transition-all duration-700 delay-100',
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            )}>
              What causes are you passionate about?
            </h1>
            
            <p className={cn(
              'text-lg text-muted-foreground text-balance mb-8 max-w-2xl mx-auto',
              'transform transition-all duration-700 delay-200',
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            )}>
              Select up to 5 interests that resonate with you. We'll use these to find nonprofits that match your passions.
            </p>
          </div>
          
          <div className={cn(
            'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6',
            'transform transition-all duration-700 delay-300',
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          )}>
            {interests.map((interest, index) => (
              <InterestCard
                key={interest.id}
                interest={interest}
                selected={selectedInterests.includes(interest.id)}
                onToggle={handleToggleInterest}
              />
            ))}
          </div>
          
          <div className={cn(
            'mt-12 flex justify-center',
            'transform transition-all duration-700 delay-400',
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          )}>
            <button
              onClick={handleContinue}
              className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-primary text-white font-medium hover:bg-primary/90 transition-all duration-300 shadow-sm hover:shadow transform hover:-translate-y-0.5"
            >
              Continue to Matches
              <ArrowRight className="ml-2 w-4 h-4" />
            </button>
          </div>
          
          <div className={cn(
            'mt-4 text-center text-sm text-muted-foreground',
            'transform transition-all duration-700 delay-500',
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          )}>
            <p>Selected: {selectedInterests.length}/5 interests</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default InterestSelection;

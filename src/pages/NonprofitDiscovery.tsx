
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { NonprofitCard } from '@/components/NonprofitCard';
import { CallToAction } from '@/components/CallToAction';
import { Search, Filter, X } from 'lucide-react';
import { getMatchingNonprofits } from '@/data/nonprofits';
import { interests } from '@/data/interests';
import { cn } from '@/lib/utils';
import { useToast } from '@/components/ui/use-toast';

const NonprofitDiscovery = () => {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [nonprofits, setNonprofits] = useState(getMatchingNonprofits([]));
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    // Retrieve selected interests from session storage
    const stored = sessionStorage.getItem('selectedInterests');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setSelectedInterests(parsed);
        setNonprofits(getMatchingNonprofits(parsed));
      } catch (error) {
        console.error('Error parsing stored interests:', error);
      }
    } else {
      // If no interests stored, redirect to interest selection
      toast({
        title: "No interests selected",
        description: "Please select your interests first.",
        variant: "destructive",
      });
      navigate('/interests');
    }
    
    setIsLoaded(true);
  }, [navigate, toast]);
  
  // Filter nonprofits based on search term
  const filteredNonprofits = nonprofits.filter(nonprofit => 
    nonprofit.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    nonprofit.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    nonprofit.location.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Get interest name from id
  const getInterestName = (id: string) => {
    const interest = interests.find(i => i.id === id);
    return interest?.name || id;
  };
  
  // Remove an interest
  const handleRemoveInterest = (id: string) => {
    const updated = selectedInterests.filter(i => i !== id);
    setSelectedInterests(updated);
    setNonprofits(getMatchingNonprofits(updated));
    sessionStorage.setItem('selectedInterests', JSON.stringify(updated));
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
              Step 2 of 2
            </span>
            
            <h1 className={cn(
              'text-3xl md:text-4xl font-bold tracking-tight text-balance mb-6',
              'transform transition-all duration-700 delay-100',
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            )}>
              Your Nonprofit Matches
            </h1>
            
            <p className={cn(
              'text-lg text-muted-foreground text-balance mb-8 max-w-2xl mx-auto',
              'transform transition-all duration-700 delay-200',
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            )}>
              Based on your interests, we've found these nonprofits that align with your passions.
            </p>
          </div>
          
          {/* Selected interests display */}
          <div className={cn(
            'mb-8',
            'transform transition-all duration-700 delay-300',
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          )}>
            <div className="flex flex-wrap items-center gap-2 justify-center">
              <span className="text-sm text-muted-foreground mr-2">Selected interests:</span>
              {selectedInterests.map(id => (
                <div 
                  key={id}
                  className="inline-flex items-center bg-primary/10 text-primary rounded-full px-3 py-1 text-sm"
                >
                  {getInterestName(id)}
                  <button 
                    onClick={() => handleRemoveInterest(id)}
                    className="ml-2 hover:bg-primary/20 rounded-full p-0.5"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
              {selectedInterests.length === 0 && (
                <span className="text-sm italic text-muted-foreground">No interests selected</span>
              )}
            </div>
          </div>
          
          {/* Search and filter */}
          <div className={cn(
            'max-w-lg mx-auto mb-10',
            'transform transition-all duration-700 delay-400',
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          )}>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-3 border border-gray-200 dark:border-gray-700 rounded-full bg-white dark:bg-gray-900 focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                placeholder="Search nonprofits by name, description, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          {/* Results count */}
          <div className={cn(
            'text-center mb-6 text-sm text-muted-foreground',
            'transform transition-all duration-700 delay-500',
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          )}>
            Found {filteredNonprofits.length} nonprofits matching your criteria
          </div>
          
          {/* Nonprofits grid */}
          {filteredNonprofits.length > 0 ? (
            <div className={cn(
              'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6',
              'transform transition-all duration-700 delay-600',
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            )}>
              {filteredNonprofits.map((nonprofit) => (
                <NonprofitCard 
                  key={nonprofit.id} 
                  nonprofit={nonprofit} 
                  selectedInterests={selectedInterests}
                />
              ))}
            </div>
          ) : (
            <div className={cn(
              'text-center py-12',
              'transform transition-all duration-700 delay-600',
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            )}>
              <h3 className="text-xl font-medium mb-2">No matching nonprofits found</h3>
              <p className="text-muted-foreground mb-6">Try adjusting your search or selecting different interests.</p>
              <button
                onClick={() => navigate('/interests')}
                className="inline-flex items-center justify-center px-6 py-2 rounded-full bg-primary text-white font-medium hover:bg-primary/90 transition-all duration-300"
              >
                Update Interests
              </button>
            </div>
          )}
          
          {/* CTA Section */}
          {filteredNonprofits.length > 0 && (
            <div className={cn(
              'mt-16',
              'transform transition-all duration-700 delay-700',
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            )}>
              <CallToAction 
                title="Not finding what you're looking for?"
                description="Try updating your interests to discover more nonprofits that match your passions."
                primaryButtonText="Update Interests"
                primaryButtonLink="/interests"
                className="max-w-4xl mx-auto"
              />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default NonprofitDiscovery;

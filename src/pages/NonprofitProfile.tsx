
import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { CallToAction } from '@/components/CallToAction';
import { nonprofits } from '@/data/nonprofits';
import { interests } from '@/data/interests';
import { ChevronLeft, Globe, Calendar, Users, MapPin, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

const NonprofitProfile = () => {
  const { id } = useParams<{ id: string }>();
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();
  
  // Find the nonprofit by id
  const nonprofit = nonprofits.find(n => n.id === id);
  
  useEffect(() => {
    // If nonprofit doesn't exist, redirect to nonprofits page
    if (!nonprofit) {
      navigate('/nonprofits');
      return;
    }
    
    setIsLoaded(true);
    
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, [nonprofit, navigate]);
  
  if (!nonprofit) return null;
  
  // Get interest name from id
  const getInterestName = (id: string) => {
    const interest = interests.find(i => i.id === id);
    return interest?.name || id;
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-32 pb-20">
        <div className="container max-w-7xl mx-auto px-4">
          {/* Back button */}
          <div className={cn(
            'mb-8',
            'transform transition-all duration-500',
            isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
          )}>
            <Link 
              to="/nonprofits" 
              className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Back to results
            </Link>
          </div>
          
          {/* Organization header */}
          <div className={cn(
            'mb-10 flex flex-col md:flex-row items-center md:items-start gap-6',
            'transform transition-all duration-700',
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          )}>
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-xl overflow-hidden flex-shrink-0">
              <img src={nonprofit.logo} alt={nonprofit.name} className="w-full h-full object-cover" />
            </div>
            
            <div className="text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{nonprofit.name}</h1>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-4">
                <div className="flex items-center text-muted-foreground">
                  <MapPin size={16} className="mr-1" />
                  {nonprofit.location}
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Globe size={16} className="mr-1" />
                  <a 
                    href={nonprofit.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    Website
                  </a>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Calendar size={16} className="mr-1" />
                  Founded {nonprofit.yearFounded}
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Users size={16} className="mr-1" />
                  {nonprofit.size} organization
                </div>
              </div>
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                {nonprofit.interests.map(interestId => (
                  <span 
                    key={interestId} 
                    className="inline-block bg-primary/10 text-primary rounded-full px-3 py-1 text-sm"
                  >
                    {getInterestName(interestId)}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          {/* Main content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
            <div className={cn(
              'lg:col-span-2 space-y-8',
              'transform transition-all duration-700 delay-100',
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            )}>
              {/* Mission */}
              <div className="glass-card">
                <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
                <p className="text-muted-foreground leading-relaxed">{nonprofit.mission}</p>
              </div>
              
              {/* Impact */}
              <div className="glass-card">
                <h2 className="text-2xl font-semibold mb-4">Our Impact</h2>
                <ul className="space-y-3">
                  {nonprofit.impact.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <div className="mr-3 mt-1 h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            {/* Sidebar */}
            <div className={cn(
              'space-y-6',
              'transform transition-all duration-700 delay-200',
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            )}>
              {/* Get involved */}
              <div className="neo-card p-6">
                <h2 className="text-xl font-semibold mb-4">Get Involved</h2>
                <p className="text-muted-foreground mb-6">Ready to make a difference with {nonprofit.name}? Visit their website to learn more about volunteer opportunities, donation options, and ways to support their mission.</p>
                <a 
                  href={nonprofit.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full px-4 py-2 rounded-full bg-primary text-white font-medium hover:bg-primary/90 transition-all duration-300"
                >
                  Visit Website
                  <ExternalLink className="ml-2 w-4 h-4" />
                </a>
              </div>
              
              {/* Organization details */}
              <div className="glass-card">
                <h2 className="text-xl font-semibold mb-4">Organization Details</h2>
                <dl className="space-y-4">
                  <div>
                    <dt className="text-sm text-muted-foreground">Location</dt>
                    <dd className="mt-1">{nonprofit.location}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-muted-foreground">Founded</dt>
                    <dd className="mt-1">{nonprofit.yearFounded}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-muted-foreground">Organization Size</dt>
                    <dd className="mt-1">{nonprofit.size}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-muted-foreground">Focus Areas</dt>
                    <dd className="mt-1 flex flex-wrap gap-2">
                      {nonprofit.interests.map(id => (
                        <span key={id} className="inline-block bg-secondary text-secondary-foreground rounded-full px-2 py-1 text-xs">
                          {getInterestName(id)}
                        </span>
                      ))}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
          
          {/* CTA Section */}
          <div className={cn(
            'mt-16',
            'transform transition-all duration-700 delay-300',
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          )}>
            <CallToAction 
              title="Discover More Organizations"
              description="Continue exploring nonprofits that match your interests and values."
              primaryButtonText="Back to Results"
              primaryButtonLink="/nonprofits"
              secondaryButtonText="Update Interests"
              secondaryButtonLink="/interests"
              className="max-w-4xl mx-auto"
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default NonprofitProfile;


import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { CallToAction } from '@/components/CallToAction';
import { ArrowRight, Heart, Lightbulb, Handshake, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden hero-gradient">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <span className={cn(
              'inline-block px-4 py-1.5 mb-6 text-sm font-medium rounded-full',
              'bg-primary/10 text-primary',
              'transform transition-all duration-700',
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            )}>
              Find your perfect nonprofit match
            </span>
            
            <h1 className={cn(
              'text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance mb-6',
              'transform transition-all duration-700 delay-100',
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            )}>
              Connect with causes that matter to <span className="text-primary">you</span>
            </h1>
            
            <p className={cn(
              'text-lg text-muted-foreground text-balance mb-8 max-w-2xl mx-auto',
              'transform transition-all duration-700 delay-200',
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            )}>
              Discover nonprofits aligned with your passions and values. MatchCause helps you find meaningful connections with organizations making a difference in areas you care about.
            </p>
            
            <div className={cn(
              'flex flex-col sm:flex-row items-center justify-center gap-4',
              'transform transition-all duration-700 delay-300',
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            )}>
              <Link 
                to="/interests" 
                className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-primary text-white font-medium hover:bg-primary/90 transition-all duration-300 shadow-sm hover:shadow transform hover:-translate-y-0.5 w-full sm:w-auto"
              >
                Get Started
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
              
              <Link 
                to="/about" 
                className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-secondary text-secondary-foreground font-medium hover:bg-secondary/80 transition-all duration-300 w-full sm:w-auto"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full h-40 bg-gradient-to-t from-background to-transparent"></div>
        <div className="absolute -bottom-5 left-0 w-full h-5 bg-background"></div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-20 relative">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-balance">
              Find your perfect nonprofit match in three simple steps
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Heart className="w-10 h-10 text-primary" />,
                title: "Select Your Interests",
                description: "Choose from a variety of causes and issues that resonate with your values and passions."
              },
              {
                icon: <Lightbulb className="w-10 h-10 text-primary" />,
                title: "Discover Matching Nonprofits",
                description: "We'll match you with organizations doing impactful work in your chosen areas."
              },
              {
                icon: <Handshake className="w-10 h-10 text-primary" />,
                title: "Connect & Contribute",
                description: "Explore each organization's profile, get involved, and make a difference."
              }
            ].map((step, index) => (
              <div 
                key={index} 
                className={cn(
                  "glass-card flex flex-col items-center text-center",
                  "transform transition-all duration-500",
                  isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                )}
                style={{ transitionDelay: `${400 + index * 100}ms` }}
              >
                <div className="mb-4 p-4 rounded-full bg-primary/10">
                  {step.icon}
                </div>
                <h3 className="text-xl font-medium mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 bg-secondary/50">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why MatchCause?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-balance">
              We make it simple to discover nonprofits aligned with your values
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Personalized Matching",
                description: "Our intelligent algorithm finds the perfect organizations based on your unique interests and values."
              },
              {
                title: "Comprehensive Profiles",
                description: "Get detailed information about each nonprofit's mission, impact, and ways to get involved."
              },
              {
                title: "Diverse Causes",
                description: "Explore organizations working across various sectors from environmental conservation to education and healthcare."
              },
              {
                title: "Global Reach",
                description: "Connect with nonprofits making a difference locally and around the world."
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className={cn(
                  "neo-card p-6 sm:p-8",
                  "transform transition-all duration-500",
                  isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                )}
                style={{ transitionDelay: `${600 + index * 100}ms` }}
              >
                <h3 className="text-xl font-medium mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-24">
        <div className="container max-w-7xl mx-auto px-4">
          <CallToAction 
            title="Ready to find your match?"
            description="Discover nonprofits that align with your values and start making a difference today."
            primaryButtonText="Find Matches"
            primaryButtonLink="/interests"
            secondaryButtonText="Learn More"
            secondaryButtonLink="/about"
            className={cn(
              "max-w-4xl mx-auto",
              "transform transition-all duration-700",
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            )}
          />
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-12 border-t border-gray-100 dark:border-gray-800">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 font-semibold text-lg text-primary mb-4 md:mb-0">
              <span className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center">
                MC
              </span>
              <span>MatchCause</span>
            </div>
            
            <div className="text-center md:text-right text-sm text-muted-foreground">
              <p>&copy; {new Date().getFullYear()} MatchCause. All rights reserved.</p>
              <p className="mt-1">Finding connections that matter.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

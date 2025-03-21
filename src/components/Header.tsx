
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Find Matches', path: '/interests' },
    { name: 'About', path: '/about' }
  ];

  return (
    <header 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'
      )}
    >
      <div className="container max-w-7xl mx-auto px-4 flex items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center space-x-2 font-semibold text-lg text-primary"
        >
          <span className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center">
            MC
          </span>
          <span>MatchCause</span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                'text-sm font-medium transition-colors hover:text-primary',
                location.pathname === link.path ? 'text-primary' : 'text-foreground/70'
              )}
            >
              {link.name}
            </Link>
          ))}
        </nav>
        
        <div className="flex items-center space-x-4">
          <Link 
            to="/interests" 
            className={cn(
              'inline-flex h-9 items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors',
              'bg-primary text-white hover:bg-primary/90 shadow-sm hover:shadow'
            )}
          >
            Get Matched
          </Link>
        </div>
      </div>
    </header>
  );
};

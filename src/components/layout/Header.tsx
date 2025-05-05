
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, Menu, X } from 'lucide-react';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 border-b ${
      isScrolled 
        ? 'bg-[#0D0D0D]/90 backdrop-blur-lg border-[#1E1A3C]/70 shadow-md' 
        : 'bg-[#0D0D0D] border-[#1E1A3C]'
    }`}>
      <div className="container mx-auto h-16 flex items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 group">
          <Shield className="h-7 w-7 text-[#8B5CF6] group-hover:text-[#9F7AEA] transition-colors" />
          <span className="font-bold text-xl tracking-tight text-[#8B5CF6] group-hover:text-[#9F7AEA] transition-colors">
            VoteX
          </span>
        </Link>
        
        <div className="md:hidden">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-gray-400 hover:text-[#8B5CF6] transition-colors"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        <nav className="hidden md:flex items-center gap-1">
          <NavLink to="/" isActive={isActive('/')}>
            Home
          </NavLink>
          <NavLink to="/dashboard" isActive={isActive('/dashboard')}>
            Dashboard
          </NavLink>
          <NavLink to="/faq" isActive={isActive('/faq')}>
            FAQ
          </NavLink>
          <NavLink to="/how-to-vote" isActive={isActive('/how-to-vote')}>
            How to Vote
          </NavLink>
          <NavLink to="/support" isActive={isActive('/support')}>
            Support
          </NavLink>
          <NavLink to="/technical-support" isActive={isActive('/technical-support')}>
            Technical Support
          </NavLink>
        </nav>
      </div>
      
      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute w-full bg-[#0D0D0D] border-b border-[#1E1A3C] shadow-lg">
          <div className="container mx-auto py-4 px-4 flex flex-col gap-1">
            <MobileNavLink to="/" isActive={isActive('/')} onClick={() => setIsMobileMenuOpen(false)}>
              Home
            </MobileNavLink>
            <MobileNavLink to="/dashboard" isActive={isActive('/dashboard')} onClick={() => setIsMobileMenuOpen(false)}>
              Dashboard
            </MobileNavLink>
            <MobileNavLink to="/faq" isActive={isActive('/faq')} onClick={() => setIsMobileMenuOpen(false)}>
              FAQ
            </MobileNavLink>
            <MobileNavLink to="/how-to-vote" isActive={isActive('/how-to-vote')} onClick={() => setIsMobileMenuOpen(false)}>
              How to Vote
            </MobileNavLink>
            <MobileNavLink to="/support" isActive={isActive('/support')} onClick={() => setIsMobileMenuOpen(false)}>
              Support
            </MobileNavLink>
            <MobileNavLink to="/technical-support" isActive={isActive('/technical-support')} onClick={() => setIsMobileMenuOpen(false)}>
              Technical Support
            </MobileNavLink>
          </div>
        </div>
      )}
    </header>
  );
};

// Desktop Navigation Link Component
const NavLink = ({ to, children, isActive }: { to: string; children: React.ReactNode; isActive: boolean }) => (
  <Link 
    to={to}
    className={`px-3 py-2 rounded-md text-sm font-medium transition-all relative ${
      isActive 
        ? 'text-[#8B5CF6] bg-[#8B5CF6]/10' 
        : 'text-gray-300 hover:text-[#A78BFA] hover:bg-[#8B5CF6]/5'
    }`}
  >
    {children}
  </Link>
);

// Mobile Navigation Link Component
const MobileNavLink = ({ to, children, isActive, onClick }: 
  { to: string; children: React.ReactNode; isActive: boolean; onClick: () => void }) => (
  <Link 
    to={to}
    onClick={onClick}
    className={`py-3 px-4 rounded-md text-sm font-medium ${
      isActive 
        ? 'text-[#8B5CF6] bg-[#8B5CF6]/10' 
        : 'text-gray-300 hover:text-[#A78BFA] hover:bg-[#8B5CF6]/5'
    }`}
  >
    {children}
  </Link>
);

export default Header;

import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, Menu, X } from 'lucide-react';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="relative z-50 w-full border-b border-[#1E1A3C] bg-[#0D0D0D]">
      <div className="container mx-auto h-16 flex items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <Shield className="h-6 w-6 text-[#8B5CF6]" />
          <span className="font-bold text-xl tracking-tight text-[#8B5CF6]">VoteX</span>
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
        
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" 
            className={`text-sm font-medium transition-colors hover:text-[#A78BFA] ${isActive('/') ? 'text-[#8B5CF6]' : 'text-gray-300'}`}>
            Home
          </Link>
          <Link to="/dashboard" 
            className={`text-sm font-medium transition-colors hover:text-[#A78BFA] ${isActive('/dashboard') ? 'text-[#8B5CF6]' : 'text-gray-300'}`}>
            Dashboard
          </Link>
          <Link to="/faq" 
            className={`text-sm font-medium transition-colors hover:text-[#A78BFA] ${isActive('/faq') ? 'text-[#8B5CF6]' : 'text-gray-300'}`}>
            FAQ
          </Link>
          <Link to="/how-to-vote" 
            className={`text-sm font-medium transition-colors hover:text-[#A78BFA] ${isActive('/how-to-vote') ? 'text-[#8B5CF6]' : 'text-gray-300'}`}>
            How to Vote
          </Link>
          <Link to="/support" 
            className={`text-sm font-medium transition-colors hover:text-[#A78BFA] ${isActive('/support') ? 'text-[#8B5CF6]' : 'text-gray-300'}`}>
            Support
          </Link>
          <Link to="/technical-support" 
            className={`text-sm font-medium transition-colors hover:text-[#A78BFA] ${isActive('/technical-support') ? 'text-[#8B5CF6]' : 'text-gray-300'}`}>
            Technical Support
          </Link>
        </nav>
      </div>
      
      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute w-full bg-[#0D0D0D] border-b border-[#1E1A3C]">
          <div className="container mx-auto py-4 px-4 flex flex-col gap-4">
            <Link to="/" 
              onClick={() => setIsMobileMenuOpen(false)}
              className={`py-2 text-sm font-medium ${isActive('/') ? 'text-[#8B5CF6]' : 'text-gray-300'}`}>
              Home
            </Link>
            <Link to="/dashboard" 
              onClick={() => setIsMobileMenuOpen(false)}
              className={`py-2 text-sm font-medium ${isActive('/dashboard') ? 'text-[#8B5CF6]' : 'text-gray-300'}`}>
              Dashboard
            </Link>
            <Link to="/faq" 
              onClick={() => setIsMobileMenuOpen(false)}
              className={`py-2 text-sm font-medium ${isActive('/faq') ? 'text-[#8B5CF6]' : 'text-gray-300'}`}>
              FAQ
            </Link>
            <Link to="/how-to-vote" 
              onClick={() => setIsMobileMenuOpen(false)}
              className={`py-2 text-sm font-medium ${isActive('/how-to-vote') ? 'text-[#8B5CF6]' : 'text-gray-300'}`}>
              How to Vote
            </Link>
            <Link to="/support" 
              onClick={() => setIsMobileMenuOpen(false)}
              className={`py-2 text-sm font-medium ${isActive('/support') ? 'text-[#8B5CF6]' : 'text-gray-300'}`}>
              Support
            </Link>
            <Link to="/technical-support" 
              onClick={() => setIsMobileMenuOpen(false)}
              className={`py-2 text-sm font-medium ${isActive('/technical-support') ? 'text-[#8B5CF6]' : 'text-gray-300'}`}>
              Technical Support
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

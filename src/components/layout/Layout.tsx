
import React, { useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import useDemoMode from '@/hooks/useDemoMode';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { isDemoMode } = useDemoMode();
  
  // Set dark mode by default
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <div className="flex flex-col min-h-screen dark:bg-gradient-to-b from-[#0D0D0D] to-[#0D0D18] dark:text-gray-100">
      <div className="fixed inset-0 -z-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iMTQiIHZpZXdCb3g9IjAgMCAxNCAxNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMS41IiBjeT0iMS41IiByPSIxLjUiIGZpbGw9IiM2RDI4RDkiIGZpbGwtb3BhY2l0eT0iMC4wNCIvPgo8L3N2Zz4K')] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black_85%)]"></div>
      
      <Header />
      
      <main className="flex-grow relative z-10">
        {isDemoMode && (
          <div className="fixed top-20 right-5 bg-[#6D28D9]/10 backdrop-blur-sm py-1.5 px-3 rounded-lg border border-[#6D28D9]/30 text-xs font-medium text-[#9F7AEA] shadow-lg z-50">
            Demo Mode Active
          </div>
        )}
        {children}
      </main>
      
      <Footer />
    </div>
  );
};

export default Layout;

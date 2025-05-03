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
    <div className="flex flex-col min-h-screen dark:bg-[#0D0D0D] dark:text-gray-100 bg-[#0D0D0D]">
      <Header />
      <main className="flex-grow relative z-10">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;

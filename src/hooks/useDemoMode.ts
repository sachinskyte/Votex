import { useState, useEffect } from 'react';

// Demo mode state hook to manage the application's demo state
export const useDemoMode = () => {
  const [isDemoMode, setIsDemoMode] = useState<boolean>(false); // Default to false - non-demo mode

  // Initialize demo mode from localStorage if available
  useEffect(() => {
    const storedDemoMode = localStorage.getItem('votex-demo-mode');
    if (storedDemoMode) {
      setIsDemoMode(storedDemoMode === 'true');
    } else {
      // If not set, default to non-demo mode
      localStorage.setItem('votex-demo-mode', 'false');
    }
  }, []);

  // Toggle demo mode and save to localStorage
  const toggleDemoMode = () => {
    const newDemoMode = !isDemoMode;
    localStorage.setItem('votex-demo-mode', newDemoMode.toString());
    setIsDemoMode(newDemoMode);
  };

  return { isDemoMode, toggleDemoMode };
};

export default useDemoMode;

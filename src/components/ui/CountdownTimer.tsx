
import React, { useState, useEffect } from 'react';

interface CountdownTimerProps {
  initialTime: number; // in seconds
  onExpire: () => void;
}

const CountdownTimer = ({ initialTime, onExpire }: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  
  useEffect(() => {
    if (timeLeft <= 0) {
      onExpire();
      return;
    }
    
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    
    return () => clearInterval(timer);
  }, [timeLeft, onExpire]);
  
  // Format time as MM:SS
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  
  // Calculate percentage for progress bar
  const percentage = (timeLeft / initialTime) * 100;
  
  return (
    <div className="flex flex-col items-center space-y-2">
      <div className="text-sm text-gray-500">OTP expires in</div>
      <div className="text-xl font-semibold">{formattedTime}</div>
      <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className="h-full bg-vote-blue rounded-full transition-all duration-1000 ease-linear"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default CountdownTimer;

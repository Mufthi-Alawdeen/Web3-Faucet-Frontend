
import React, { useState, useEffect } from "react";

interface CountdownTimerProps {
  lastRequestTime: number;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ lastRequestTime }) => {
  const [timeLeft, setTimeLeft] = useState<{
    hours: number;
    minutes: number;
    seconds: number;
  }>({ hours: 24, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = Date.now();
      const nextAvailableTime = lastRequestTime + 24 * 60 * 60 * 1000; // 24 hours in milliseconds
      const difference = nextAvailableTime - now;
      
      if (difference <= 0) {
        // Time has passed
        return { hours: 0, minutes: 0, seconds: 0 };
      }
      
      // Calculate hours, minutes, seconds
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / (1000 * 60)) % 60);
      const seconds = Math.floor((difference / 1000) % 60);
      
      return { hours, minutes, seconds };
    };

    // Initial calculation
    setTimeLeft(calculateTimeLeft());
    
    // Set up interval to update countdown
    const timer = setInterval(() => {
      const updatedTime = calculateTimeLeft();
      setTimeLeft(updatedTime);
      
      // If countdown reaches zero, clear the interval
      if (updatedTime.hours === 0 && updatedTime.minutes === 0 && updatedTime.seconds === 0) {
        clearInterval(timer);
      }
    }, 1000);
    
    // Clean up interval on unmount
    return () => clearInterval(timer);
  }, [lastRequestTime]);

  // If countdown is at 0, don't display anything
  if (timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0) {
    return null;
  }

  return (
    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100 rounded-xl p-5 text-center shadow-sm">
      <h3 className="text-sm font-medium text-indigo-800 mb-3">Time until next request</h3>
      <div className="flex justify-center items-center space-x-2">
        <div className="bg-white p-3 rounded-lg shadow-inner">
          <span className="text-xl font-mono font-bold text-indigo-700">
            {timeLeft.hours.toString().padStart(2, "0")}
          </span>
        </div>
        <span className="text-lg font-bold text-indigo-700">:</span>
        <div className="bg-white p-3 rounded-lg shadow-inner">
          <span className="text-xl font-mono font-bold text-indigo-700">
            {timeLeft.minutes.toString().padStart(2, "0")}
          </span>
        </div>
        <span className="text-lg font-bold text-indigo-700">:</span>
        <div className="bg-white p-3 rounded-lg shadow-inner">
          <span className="text-xl font-mono font-bold text-indigo-700">
            {timeLeft.seconds.toString().padStart(2, "0")}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;

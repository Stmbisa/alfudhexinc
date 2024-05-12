import { useState, useEffect } from 'react';

const useCounter = (start, end, duration) => {
  const [count, setCount] = useState(start);
  useEffect(() => {
    if (start === end) return;

    const increment = (end - start) / (duration / 1000);
    const interval = setInterval(() => {
      setCount((prevCount) => {
        if (prevCount + increment >= end) {
          clearInterval(interval);
          return end;
        }
        return prevCount + increment;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [start, end, duration]);

  return Math.floor(count);
};

export default useCounter
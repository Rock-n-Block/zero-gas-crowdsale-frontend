import { useEffect } from 'react';

// Start an interval on component mount for ever
// Restart on callback or ms change
const useInterval = (callback: (args: void) => void, ms?: number) => {
  useEffect(() => {
    const intervalId = setInterval(callback, ms);
    return () => clearInterval(intervalId);
  }, [callback, ms]);
};

export default useInterval;

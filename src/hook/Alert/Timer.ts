import { useEffect, useRef } from 'react';
 
// Code From
// https://overreacted.io/making-setinterval-declarative-with-react-hooks/

export default function useInterval(callback: (...args: any[]) => any, delay: number) {
  const savedCallback = useRef<(...args: any[]) => any>();
 
  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);
 
  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current && savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
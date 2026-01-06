// overreacted.io/making-setinterval-declarative-with-react-hooks/
import { useEffect, useRef } from 'react';

export default function useInterval(callback: (...args: any[]) => any, delay: number) {
    const savedCallback = useRef<(...args: any[]) => any>(null);
 
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);
 
    useEffect(() => {
        const tick = () => savedCallback.current && savedCallback.current();
        if (delay === null) 
            return;
        let ID = setInterval(tick, delay);
        return () => clearInterval(ID);
    }, [delay]);
}
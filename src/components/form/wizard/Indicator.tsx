import clsx from "clsx";
import { useEffect, useState } from "react";

interface IndicatorProps {
    index: number;
    length: number;
}

export default function Indicator(props: IndicatorProps) {
    const [width, setWidth] = useState('0');

    useEffect(() => {
        setWidth((((props.index+1)/(props.length))*100).toFixed(2));
    }, [props.index, props.length]);

    return (
        <div className={clsx(
            'w-full h-[9px] shadow-sm',
            'border border-gray-300 rounded-[3px]'
        )}>
            <div 
                style={{
                    width: `calc(${width}% + 2px)`
                }} 
                className={clsx(
                    'relative top-[-1px] left-[-1px]',
                    'bg-black rounded-l-[3px] h-[9px]',
                    width === '100.00' && '!rounded-[3px]'
                )}
            />
        </div>
    )
}
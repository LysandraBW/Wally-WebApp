import clsx from "clsx";

interface IndicatorProps {
    partIndex: number;
    length: number;
}

export default function Indicator(props: IndicatorProps) {
    return (
        <div className='w-full h-[9px] border border-gray-300 rounded-[3px] shadow-sm'>
            <div 
                style={{
                    width: `calc(${(((props.partIndex+1)/(props.length))*100).toFixed(2)}% + 2px)`
                }} 
                className={clsx(
                    'bg-black rounded-l-[3px] h-full',
                    'relative top-[-1px] left-[-1px] !h-[9px]',
                    (props.partIndex+1)/props.length === 1 && '!rounded-[3px]'
                )}
            />
        </div>
    )
}
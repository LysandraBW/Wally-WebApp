interface IndicatorProps {
    part: number;
    parts: Array<string>;
}

export default function Indicator(props: IndicatorProps) {
    return (
        <div className='flex w-full gap-x-[4px]'>
            {props.parts.map((part, i) => (
                <div className='w-full flex flex-col gap-y-[2px]'>
                    <div 
                        className={[
                            'w-full h-[8px] bg-gray-100 rounded-[2px] border border-gray-900',
                            `${i <= props.part ? '!bg-black' : ''}`
                        ].join(' ')}
                    ></div>
                    <span className='text-xs font-medium'>{part}</span>
                </div>
            ))}
        </div>
    )
}
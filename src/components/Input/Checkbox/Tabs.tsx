import clsx from "clsx";

interface TabsProps {
    tab: string;
    tabs: Array<string>;
    setTab: (tab: string) => void;
}

export default function Tabs(props: TabsProps) {
    return (
        <div className={clsx(
            'flex gap-x-8 w-full h-[48px] px-8',
            'border-b border-b-gray-300'
        )}>
            {props.tabs.map((tab, i) => (
                <div
                    key={i}
                    className={clsx(
                        'relative p-1',
                        'flex justify-between items-center gap-x-1'
                    )}
                >
                    <div
                        onClick={() => props.setTab(tab)}
                        className={clsx(
                            'whitespace-nowrap',
                            tab === props.tab && 'font-medium',
                            tab === props.tab && 'after:block after:absolute after:rounded-[1px] after:bottom-0 after:h-[3px] after:w-[90%] after:bg-black',
                            tab !== props.tab && 'text-gray-400'
                        )}
                    >
                        {tab}
                    </div>
                </div>
            ))}
        </div>
    )
}
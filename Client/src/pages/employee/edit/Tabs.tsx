import clsx from "clsx";
import { Dispatch, SetStateAction } from "react";

interface TabsProps {
    tab: string;
    tabs: Array<string>;
    setTab: Dispatch<SetStateAction<string>>;
}

export default function Tabs(props: TabsProps) {
    return (
        <div
            className="flex gap-8 px-4 py-1 border-b justify-between w-full"
        >
            {props.tabs.map((tab, i) => (
                <button
                    key={i}
                    onClick={() => props.setTab(tab)}
                    className={clsx(
                        "px-4 py-1 hover:bg-gray-100",
                        "rounded-md border-none",
                        props.tab === tab && "!text-gray-950"
                    )}
                >
                    <p 
                        className={clsx(
                            "text-02",
                            props.tab === tab && `
                                !text-gray-950 !font-medium 
                                relative after:relative 
                                after:block after:w-full 
                                after:h-[1px] after:bg-gray-950 
                                after:bottom-[-8px] 
                                after:left-0
                            `
                        )}
                    >
                        {tab}
                    </p>
                </button>
            ))}
        </div>
    )
}
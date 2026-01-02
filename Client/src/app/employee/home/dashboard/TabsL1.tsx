import { Options } from "@/features/Form/DEF";
import useFilterManager from "./managers/useFilterManager";
import clsx from "clsx";

interface TabsL1Props {
    labels: Options;
    filterManager: ReturnType<typeof useFilterManager>;
    onClick: (labelID: string) => void;
}

export default function TabsL1(props: TabsL1Props) {
    return (
        <div className="flex flex-col gap-2 bg-gray-100 p-1 rounded-t-md border border-gray-300">
            {props.labels.map(([labelID, label], i) => (
                <div 
                    key={i}
                    className={clsx(
                        "w-full py-1 px-2 pr-2 flex justify-between items-center gap-1",
                        "border border-gray-300 rounded bg-white shadow-sm",
                        "group hover:bg-gray-50 cursor-pointer",
                        "relative",
                        props.filterManager.labelID === labelID && "after:block after:bg-blue-500 after:w-[3px] after:h-full after:relative after:right-[-0.25rem]"
                    )}
                    onClick={() => props.onClick(labelID)}
                >
                    <div className="flex gap-1 items-center">
                        <span 
                            className={clsx(
                                "tracking-wide text-xs",
                                "group-hover:text-black", 
                                props.filterManager.labelID === labelID && "font-medium !text-blue-500"
                            )}
                        >
                            {label}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    )
}
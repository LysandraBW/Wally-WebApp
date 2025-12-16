import { Options } from "@/features/Form/DEF";
import useFilterManager from "./managers/useFilterManager";
import clsx from "clsx";

interface LabelTabsProps {
    labels: Options;
    filterManager: ReturnType<typeof useFilterManager>;
    onClick: (labelID: string) => void;
}

export default function LabelTabs(props: LabelTabsProps) {
    return (
        <div className="flex flex-col gap-4">
            {props.labels.map(([labelID, label], i) => (
                <div 
                    key={i}
                    className={clsx(
                        "w-full py-1 px-2 pr-2 flex justify-between items-center gap-1",
                        "border border-gray-300 rounded bg-white shadow-sm",
                        "group hover:bg-gray-50 cursor-pointer",
                        props.filterManager.labelID === labelID && "!bg-blue-600 !border-blue-500"
                    )}
                    onClick={() => props.onClick(labelID)}
                >
                    <div className="flex gap-1 items-center">
                        <span 
                            className={clsx(
                                "tracking-wide text-xs",
                                "group-hover:text-black", 
                                props.filterManager.labelID === labelID && "font-medium !text-white"
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
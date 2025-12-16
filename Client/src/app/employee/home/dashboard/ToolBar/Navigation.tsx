"use client";
import ChevronRight from "@/component/Icon/ChevonRight";
import ChevronLeft from "@/component/Icon/ChevronLeft";
import { FilterManager } from "../managers/useFilterManager";
import { useEffect } from "react";
import clsx from "clsx";
import Dash from "@/component/IconV2/Dash";

interface NavigationProps {
    filterManager: FilterManager;
}

export default function Navigation(props: NavigationProps) {
    const onPageIndexChange = (name: string, value: string) => {
        props.filterManager.updateStringPageIndex(value);
    }

    useEffect(() => {
        // Update Width
        const input = document.getElementsByName("pageIndex")[0];
        if (!input)
            return;
        const inputLength = (input as any).value.length;
        input.style.width = inputLength + 'ch';
    }, [props.filterManager.stringPageIndex]);

    return (
        <div className="flex gap-2">
            {/* Current Page */}
            {/* The user can also insert the page they'd like to go to. */}
            <div className="flex items-center justify-center gap-1">
                <input
                    name="pageIndex"
                    type="text"
                    className={clsx(
                        "text-center h-[28px] p-0 min-w-[1ch] max-w-[5ch]",
                        "text-02 text-gray-400 font-medium tracking-wide",
                        "border-b border-b-gray-300",
                        "focus:outline-none focus:border-b focus:border-b-blue-400"
                    )}
                    value={props.filterManager.stringPageIndex}
                    onBlur={props.filterManager.fixStringPageIndex}
                    onChange={(event) => onPageIndexChange(event.target.name, event.target.value)}
                />
                <Dash
                    style="size-2 stroke-gray-400"
                />
                <span 
                    className={clsx(
                        "h-[28px] flex items-end pb-[3.5px]",
                        "relative top-[-0.1px]",
                        "font-medium text-02 tracking-wide whitespace-nowrap text-gray-400",
                        "border-b border-b-gray-300"
                    )}
                >
                    {`${props.filterManager.maxPageIndex+1}`} Pages
                </span>
            </div>
            {/* L and R Buttons */}
            <div className="flex gap-1 items-center">
                <button 
                    onClick={props.filterManager.goToPrevPage} 
                    className={clsx(
                        "relative flex justify-center items-center aspect-square w-[28px] pl-2", 
                        "border border-gray-300 shadow-sm icon !bg-white hover:!bg-gray-100 hover:stroke-black"
                    )}
                >
                    <ChevronLeft
                        width="12"
                        height="12"
                        left="-3px"
                        strokeWidth="0.5"
                        cursor="pointer"
                    />
                </button>
                <button 
                    onClick={props.filterManager.goToNextPage} 
                    className={clsx(
                        "relative flex justify-center items-center aspect-square w-[28px] pl-2", 
                        "border border-gray-300 shadow-sm icon !bg-white hover:!bg-gray-100 hover:stroke-black"
                    )}
                >
                    <ChevronRight
                        width="12"
                        height="12"
                        left="3px"
                        strokeWidth="0.5"
                        cursor="pointer"
                    />
                </button>
            </div>
        </div>
    )
}
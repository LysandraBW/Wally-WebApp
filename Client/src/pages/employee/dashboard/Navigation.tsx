"use client";
import InlineText from "@/component/Form/Text/InlineText";
import ChevronRight from "@/component/Icon/ChevonRight";
import ChevronLeft from "@/component/Icon/ChevronLeft";
import { FilterManager } from "./managers/useFilterManager";
import { useEffect } from "react";

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
        <div className="flex gap-1">
            <div className="flex items-center justify-center gap-1">
                <input
                    name="pageIndex"
                    type="text"
                    className="text-center h-[28px] p-0 min-w-[1ch] max-w-[5ch] text-02 text-gray-400 font-medium tracking-wide border-b border-b-gray-300 focus:outline-none focus:border-b focus:border-b-blue-400"
                    value={props.filterManager.stringPageIndex}
                    onBlur={props.filterManager.fixStringPageIndex}
                    onChange={(event) => onPageIndexChange(event.target.name, event.target.value)}
                />
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="4" stroke="currentColor" className="size-2 stroke-gray-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                </svg>
                <span className="h-[28px] relative top-[-0.1px] block font-medium text-02 tracking-wide whitespace-nowrap text-gray-400 border-b border-b-gray-300 flex items-end pb-[3.5px]">{`${props.filterManager.maxPageIndex+1}`}</span>
                <span className="relative top-[-0.1px] block font-medium text-02 tracking-wide whitespace-nowrap text-gray-400 border-b border-b-white">{`Pages`}</span>
            </div>
            <div className="flex gap-1 items-center">
                <button 
                    onClick={props.filterManager.goToPrevPage} 
                    className="relative flex justify-center items-center aspect-square w-[28px] border border-gray-300 shadow-sm icon !bg-white pl-2 hover:!bg-gray-100 hover:stroke-black"
                >
                    <ChevronLeft
                        width="12"
                        height="12"
                        left="-1px"
                        strokeWidth="0.5"
                        cursor="pointer"
                    />
                </button>
                <button 
                    onClick={props.filterManager.goToNextPage} 
                    className="relative flex justify-center items-center aspect-square w-[28px] border border-gray-300 shadow-sm icon !bg-white pr-2 hover:!bg-gray-100 hover:stroke-black"
                >
                    <ChevronRight
                        width="12"
                        height="12"
                        left="1px"
                        strokeWidth="0.5"
                        cursor="pointer"
                    />
                </button>
            </div>
        </div>
    )
}
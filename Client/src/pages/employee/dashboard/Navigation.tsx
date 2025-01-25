"use client";
import InlineText from "@/component/Form/Text/InlineText";
import ChevronRight from "@/component/Icon/ChevonRight";
import ChevronLeft from "@/component/Icon/ChevronLeft";
import { FilterManager } from "./managers/useFilterManager";

interface NavigationProps {
    filterManager: FilterManager;
}

export default function Navigation(props: NavigationProps) {
    const onPageIndexChange = (name: string, value: string) => {
        props.filterManager.updateStringPageIndex(value);
    }

    return (
        <div className="flex gap-1">
            {/* Removing this functionality until I can figure out how to make a square input */}
            {/* <div className="border border-gray-200 aspect-square flex items-center justify-center">
                <InlineText
                    name="" 
                    type="text"
                    style="!p-0 !w-min"
                    value={props.filterManager.stringPageIndex}
                    onBlur={props.filterManager.fixStringPageIndex}
                    onChange={onPageIndexChange}
                />
            </div> */}
            <div className="flex justify-center items-center p-1">
                <span className="block font-medium text-02 whitespace-nowrap">{props.filterManager.stringPageIndex} {`- ${props.filterManager.maxPageIndex+1} Pages`}</span>
            </div>
            <div className="flex gap-1 items-center">
                <button 
                    onClick={props.filterManager.goToPrevPage} 
                    className="icon !bg-transparent pl-2"
                >
                    <ChevronLeft
                        strokeWidth="0.5"
                        cursor="pointer"
                    />
                </button>
                <button 
                    onClick={props.filterManager.goToNextPage} 
                    className="icon !bg-transparent pr-2"
                >
                    <ChevronRight
                        strokeWidth="0.5"
                        cursor="pointer"
                    />
                </button>
            </div>
        </div>
    )
}
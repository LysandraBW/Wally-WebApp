"use client";
import { FilterManager } from "../managers/useFilterManager";
import { useEffect } from "react";
import clsx from "clsx";
import MinusIcon from "@/component/Icons/Icons/MinusIcon";
import IconButton from "@/component/Button/IconButton";
import ArrowLongLeftIcon from "@/component/Icons/Icons/ArrowLongLeftIcon";
import ArrowLongRightIcon from "@/component/Icons/Icons/ArrowLongRightIcon";


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

    
    useEffect(() => {
        // Update Width
        const input = document.getElementsByName("maxPageIndex")[0];
        if (!input)
            return;
        const inputLength = (input as any).value.length;
        input.style.width = inputLength + 'ch';
    }, [props.filterManager.maxPageIndex]);


    return (
        <div className="flex gap-2">
            {/* Current Page */}
            {/* The user can also enter the page they'd like to go to. */}
            <div className="flex items-center justify-center gap-1">
                <input
                    name="pageIndex"
                    type="text"
                    className={clsx(
                        "h-[28px] min-w-[1ch] max-w-[5ch] p-0",
                        "text-center text-xs text-base-500 dark:text-base-400 font-medium tracking-wide",
                        "bg-transparent border-b border-b-base-300 dark:border-b-base-200",
                        "hover:bg-base-100 focus:bg-base-100",
                        "focus:outline-none"
                    )}
                    value={props.filterManager.stringPageIndex}
                    onBlur={props.filterManager.fixStringPageIndex}
                    onChange={(event) => onPageIndexChange(event.target.name, event.target.value)}
                />
                <MinusIcon
                    className="size-2 stroke-[2px] stroke-base-500 dark:stroke-base-400"
                /> 
                <input
                    name="maxPageIndex"
                    type="text"
                    className={clsx(
                        "h-[28px] min-w-[1ch] max-w-[5ch] p-0",
                        "text-center text-xs text-base-500 dark:text-base-400 font-medium tracking-wide",
                        "bg-transparent border-b border-b-base-300 dark:border-b-base-200",
                        "focus:outline-none"
                    )}
                    readOnly={true}
                    value={`${props.filterManager.maxPageIndex+1}`}
                />               
            </div>
            {/* L and R Buttons */}
            <div className="flex gap-2 items-center stroke-base-500 dark:stroke-base-400">
                <IconButton
                    className="dark:!bg-base-50"
                    onClick={props.filterManager.goToPrevPage}
                >
                    <ArrowLongLeftIcon
                        className="size-4 stroke-inherit group-hover:stroke-base-700"
                    />
                </IconButton>
                <IconButton
                    className="dark:!bg-base-50"
                    onClick={props.filterManager.goToNextPage}
                >
                    <ArrowLongRightIcon
                        className="size-4 stroke-inherit group-hover:stroke-base-700"
                    />
                </IconButton>
            </div>
        </div>
    )
}
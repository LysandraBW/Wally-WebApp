import XMarkIcon from "@/component/Icons/Icons/XMarkIcon";
import useTabsManager, { Tab } from "@/features/TabManager/useTabsManager";
import { sameSemanticMap } from "@/lib";
import clsx from "clsx";
import { Fragment, useEffect, useState } from "react";

interface OpenedTabsProps {
    tabsManager: ReturnType<typeof useTabsManager>;
    filterTabs?: (tab: any) => boolean;
    outerClassName?: string;
    closeClassName?: string;
    roundedTR?: boolean;
}

export default function OpenedTabs(props: OpenedTabsProps) {
    const [tabs, setTabs] = useState<Array<Tab>>([]);


    useEffect(() => {
        if (props.filterTabs)
            setTabs(props.tabsManager.tabs.filter(props.filterTabs));
        else
            setTabs(props.tabsManager.tabs);
    }, [props.tabsManager.tabs]);

    
    return (
        <>
        {(!!tabs.length && props.tabsManager.currentTab) &&
            <div 
                className={clsx(
                    "[--containerHeight:32px] [--containerPadding:4px] [--dividerHeight:60%] [--dividerWidth:4px]",
                    "w-full min-h-0 h-[var(--containerHeight)]",
                    "relative sticky top-0",
                    "grid grid-cols-[1fr_auto] grid-rows-1",
                    "border-t border-l border-r border-base-300 dark:border-base-200",
                    "overflow-x-clip overflow-y-visible backdrop-blur-sm",
                    props.outerClassName
                )}
            >
                <div 
                    className={clsx(
                        "min-w-0 h-full py-[var(--containerPadding)]",
                        "flex gap-x-0 items-center",
                        "overflow-x-auto overflow-y-visible scroll-hide",
                        "bg-base-0 dark:bg-[#121214]",
                        "relative after:absolute after:top-0 after:left-0 after:w-[calc(100%+2*var(--containerPadding))] after:h-[calc(100%-var(--containerPadding))] after:bg-base-100 dark:after:bg-base-50",
                        props.roundedTR && "after:!rounded-tr-md"
                    )}
                >
                    <div
                        className={clsx(
                            "min-w-[8px] w-[8px] h-full",
                            "relative z-10",
                            "before:absolute before:z-10 before:top-0 before:left-0 before:w-[calc(8px)] before:h-[calc(100%+var(--containerPadding))] before:bg-base-100 dark:before:bg-base-50",
                            sameSemanticMap((tabs.at(0) as any).id, props.tabsManager.currentTab.id) && "before:rounded-br-md"
                        )}
                    />
                    {tabs.map((tab: any, i: number) => {
                        if (!props.tabsManager.currentTab)
                            return <Fragment key={i}></Fragment>
                        
                        const selected = sameSemanticMap((tab as any).id, props.tabsManager.currentTab.id);
                        
                        const nextTab = i >= props.tabsManager.tabs.length ? null : props.tabsManager.tabs[i+1];
                        let nextTabSelected = false;
                        if (nextTab)
                            nextTabSelected = sameSemanticMap((nextTab as any).id, props.tabsManager.currentTab.id);

                        const prevTab = i == 0 ? null : props.tabsManager.tabs[i-1];
                        let prevTabSelected = false;
                        if (prevTab)
                            prevTabSelected = sameSemanticMap((prevTab as any).id, props.tabsManager.currentTab.id);

                        return (
                            <Fragment key={i}>
                                <div 
                                    onClick={() => props.tabsManager.setCurrentTab(tab)}
                                    className={clsx(
                                        "h-full min-w-[48px] w-[200px]",
                                        "peer cursor-default",
                                        (!selected && !nextTabSelected && !prevTabSelected) && "relative before:absolute before:z-10 before:top-0 before:left-[-1*var(--dividerWidth)] before:w-[calc(100%+var(--dividerWidth)+var(--dividerWidth))] before:h-[calc(100%+var(--containerPadding))] before:bg-base-100 dark:before:bg-base-50",
                                        nextTabSelected && "relative before:absolute before:z-10 before:top-0 before:left-[calc(-1*var(--dividerWidth))] before:w-[calc(100%+2*var(--dividerWidth))] before:h-[calc(100%+var(--containerPadding))] before:rounded-br-[4px] before:bg-base-100 dark:before:bg-base-50",
                                        prevTabSelected && "relative before:absolute before:z-10 before:top-0 before:left-[calc(-1*var(--dividerWidth))] before:w-[calc(100%+2*var(--dividerWidth))] before:h-[calc(100%+var(--containerPadding))] before:rounded-bl-[4px] before:bg-base-100 dark:before:bg-base-50"
                                    )}
                                >
                                    <div 
                                        className={clsx(
                                            "w-full h-full p-1 px-2",
                                            "grid grid-cols-[1fr_auto] items-center",
                                            "relative z-10 overflow-x-clip",
                                            "stroke-base-500",
                                            selected && "rounded-t-md bg-base-0 dark:bg-[#121214]",
                                            !selected && "rounded-[4px] bg-base-100 dark:bg-base-50 group hover:bg-base-200 dark:hover:bg-[#121214] hover:shadow-xs"
                                        )}
                                    >
                                        <span 
                                            className={clsx(
                                                "block min-w-0 overflow-hidden",
                                                "relative z-10",
                                                "text-xs whitespace-nowrap tracking-wide",
                                                "[--shadingWidth:min(calc(100%-1px),max(20px,50%))]",
                                                "relative after:absolute after:top-0 after:left-[calc(100%-var(--shadingWidth))] after:w-[var(--shadingWidth)] after:h-full",
                                                "after:bg-gradient-to-l after:to-transparent after:from-40%",
                                                !selected && "after:from-base-100 dark:after:from-base-50 group-hover:after:from-base-200 dark:group-hover:after:from-[#121214] text-base-500",
                                                selected && "after:from-base-0 dark:after:from-[#121214] text-base-700"

                                            )}
                                        >
                                            {tab.header}
                                        </span>
                                        <div
                                            onClick={() => props.tabsManager.closeTab(tab.id)}
                                            className="hover:bg-base-50 rounded-md p-0.5"
                                        >
                                            <XMarkIcon
                                                className="relative z-10 size-2.5 stroke-inherit stroke-[2.5px]"
                                            />
                                        </div>
                                    </div>
                                </div>
                                {/* Divider */}
                                <div 
                                    className={clsx(
                                        "min-w-[var(--dividerWidth)] w-[var(--dividerWidth)] h-full",
                                        "flex justify-center items-center",
                                        "[&:has(+_.peer:hover)]:invisible [.peer:hover+&]:invisible",
                                        (selected || nextTabSelected) && "invisible"
                                    )}
                                >
                                    <div
                                        className={clsx(
                                            "min-w-[min(1.5px,var(--dividerWidth))] w-[min(1.5px,var(--dividerWidth))] h-[var(--dividerHeight)] bg-base-400 dark:bg-base-300 rounded-full relative z-20"
                                        )}
                                    />
                                </div>
                            </Fragment>
                        )
                    })}
                    <div
                        className={clsx(
                            "min-w-[48px] grow  h-full",
                            "bg-base-100",
                            "relative z-10 before:absolute before:z-10 before:top-0 before:left-[calc(-1*var(--dividerWidth))] before:w-[calc(100%+3*var(--dividerWidth))] before:h-[calc(100%+var(--containerPadding))] before:bg-base-100 dark:before:bg-base-50",
                            sameSemanticMap((tabs.at(-1) as any).id, props.tabsManager.currentTab.id) && "before:rounded-bl-md"
                        )}
                    />
                </div>
                <div 
                    onClick={props.tabsManager.closeAllTabs}
                    className={clsx(
                        "w-min aspect-square",
                        "relative z-300",
                        "flex justify-center items-center",
                        "stroke-base-500 bg-base-100 dark:bg-base-50 cursor-default",
                        "hover:!bg-red-500 hover:!border-red-500 hover:!stroke-white",
                        props.closeClassName
                    )}
                >
                    <XMarkIcon
                        className="size-3.5 stroke-inherit stroke-[2px]"
                    />
                </div>
            </div>
        }
        </>
    )
}
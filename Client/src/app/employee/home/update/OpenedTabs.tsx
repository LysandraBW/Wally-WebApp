import XMarkIcon from "@/component/Icons/Icons/XMarkIcon";
import clsx from "clsx";
import { Fragment } from "react";

interface OpenedTabsProps {
    tabsManager: any;
}

export default function OpenedTabs(props: OpenedTabsProps) {
    return (
        <div 
            className={clsx(
                "[--containerHeight:32px] [--containerPadding:4px] [--dividerHeight:50%] [--dividerWidth:4px]",
                "min-h-0 h-[var(--containerHeight)] relative",
                "grid grid-cols-[1fr_auto] grid-rows-1",
                "border-t border-l border-r border-base-300 dark:border-base-200",
                "overflow-x-clip overflow-y-visible backdrop-blur-sm"
            )}
        >
            <div 
                className={clsx(
                    "min-w-0 h-full py-[var(--containerPadding)]",
                    "flex gap-x-0 items-center",
                    "overflow-x-auto overflow-y-visible scroll-hide",
                    "bg-base-0 dark:bg-base-50",
                    "relative after:fixed after:top-0 after:left-0 after:w-[calc(100%+2*var(--containerPadding))] after:h-[calc(100%-var(--containerPadding))] after:bg-base-100 dark:after:bg-base-200"
                )}
            >
                <div
                    className={clsx(
                        "min-w-[8px] w-[8px] h-full",
                        "relative z-10",
                        "before:absolute before:z-10 before:top-0 before:left-0 before:w-[calc(8px)] before:h-[calc(100%+var(--containerPadding))] before:bg-base-100 dark:before:bg-base-200",
                        (props.tabsManager.tabs.filter((tab: any) => tab.form)[0].form.itemID === props.tabsManager.currentTab.form.itemID && props.tabsManager.tabs.filter((tab: any) => tab.form)[0].form.key == props.tabsManager.currentTab.form.key) && "before:rounded-br-md"
                    )}
                />
                {props.tabsManager.tabs.filter((tab: any) => tab.form).map((tab: any, i: number) => {
                    const selected = tab.form.itemID === props.tabsManager.currentTab.form.itemID && tab.form.key == props.tabsManager.currentTab.form.key;
                    
                    const nextTab = i >= props.tabsManager.tabs.length ? null : props.tabsManager.tabs[i+1];
                    let nextTabSelected = false;
                    if (nextTab)
                        nextTabSelected = nextTab.form.itemID === props.tabsManager.currentTab.form.itemID && nextTab.form.key == props.tabsManager.currentTab.form.key;

                    const prevTab = i == 0 ? null : props.tabsManager.tabs[i-1];
                    let prevTabSelected = false;
                    if (prevTab)
                        prevTabSelected = prevTab.form.itemID === props.tabsManager.currentTab.form.itemID && prevTab.form.key == props.tabsManager.currentTab.form.key;

                    return (
                        <Fragment key={i}>
                            <div 
                                onClick={() => props.tabsManager.setCurrentTab(tab)}
                                className={clsx(
                                    "h-full min-w-[48px] w-[200px]",
                                    "peer cursor-default",
                                    (!selected && !nextTabSelected && !prevTabSelected) && "relative before:absolute before:z-10 before:top-0 before:left-[-1*var(--dividerWidth)] before:w-[calc(100%+var(--dividerWidth)+var(--dividerWidth))] before:h-[calc(100%+var(--containerPadding))] before:bg-base-100 dark:before:bg-base-200",
                                    nextTabSelected && "relative before:absolute before:z-10 before:top-0 before:left-[calc(-1*var(--dividerWidth))] before:w-[calc(100%+2*var(--dividerWidth))] before:h-[calc(100%+var(--containerPadding))] before:rounded-br-[4px] before:bg-base-100 dark:before:bg-base-200",
                                    prevTabSelected && "relative before:absolute before:z-10 before:top-0 before:left-[calc(-1*var(--dividerWidth))] before:w-[calc(100%+2*var(--dividerWidth))] before:h-[calc(100%+var(--containerPadding))] before:rounded-bl-[4px] before:bg-base-100 dark:before:bg-base-200"
                                )}
                            >
                                <div 
                                    className={clsx(
                                        "w-full h-full p-1 px-2",
                                        "grid grid-cols-[1fr_auto] items-center",
                                        "relative z-10 overflow-x-clip",
                                        "stroke-base-500",
                                        selected && "rounded-t-md bg-base-0 dark:bg-base-50",
                                        !selected && "rounded-[4px] bg-base-100 dark:bg-base-200 group hover:bg-base-200 dark:hover:bg-base-50 hover:shadow-sm"
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
                                            !selected && "after:from-base-100 dark:after:from-base-200 group-hover:after:from-base-200 dark:group-hover:after:from-base-50 text-base-500",
                                            selected && "after:from-base-0 dark:after:from-base-50 text-base-700"

                                        )}
                                    >
                                        {tab.form.mutation} {tab.form.key} {parseInt(tab.form.itemID) < 0 ? "" : `#${tab.form.itemID}`}
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
                                        "min-w-[min(1.5px,var(--dividerWidth))] w-[min(1.5px,var(--dividerWidth))] h-[50%] bg-base-400 dark:bg-base-300 rounded-full relative z-20"
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
                        "relative z-10 before:absolute before:z-10 before:top-0 before:left-[calc(-1*var(--dividerWidth))] before:w-[calc(100%+3*var(--dividerWidth))] before:h-[calc(100%+var(--containerPadding))] before:bg-base-100",
                        (props.tabsManager.tabs.filter((tab: any) => tab.form).at(-1).form.itemID === props.tabsManager.currentTab.form.itemID && props.tabsManager.tabs.filter((tab: any) => tab.form).at(-1).form.key == props.tabsManager.currentTab.form.key) && "before:rounded-bl-md"
                    )}
                />
            </div>
            <div 
                onClick={props.tabsManager.closeAllTabs}
                className={clsx(
                    "w-min aspect-square",
                    "relative z-50",
                    "flex justify-center items-center",
                    "stroke-base-500 bg-base-100 cursor-default",
                    "hover:bg-red-500 hover:border-red-500 hover:stroke-white"
                )}
            >
                <XMarkIcon
                    className="size-3.5 stroke-inherit stroke-[2px]"
                />
            </div>
        </div>
    )
}
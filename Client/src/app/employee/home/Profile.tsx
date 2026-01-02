import SecondaryButton from "@/component/Button/SecondaryButton";
import Toggle from "@/component/Form/Toggle";
import ArrowLeftStartOnRectangleIcon from "@/component/Icons/Icons/ArrowLeftStartOnRectangleIcon";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { Tooltip as ToolTip } from "react-tooltip";
import { Employee } from "waltronics-types";

export default function Profile(props: {employee: Employee}) {
    const [open, setOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(true);

    useEffect(() => {
        const root = document.querySelector("html");
        if (!root)
            return;

        if (darkMode)
            root.classList.add("dark");
        else
            root.classList.remove("dark");
    }, [darkMode]);

    const openProfile = () => {
        setOpen(true);
    }

    const closeProfile = (event: any) => {
        if (event.currentTarget.contains(event.relatedTarget))
            return;
        setOpen(false);
    }

    return (
        <div 
            id="profile" 
            className={clsx(
                "size-10 aspect-square",
                "bg-blue-500 rounded-full shadow-sm",
                "overflow-hidden",
                "cursor-pointer",
            )}
            tabIndex={0}
            onClick={openProfile}
            onBlur={closeProfile}
        >
            <ToolTip
                anchorSelect="#profile" 
                isOpen={open}
                opacity={1}
                place="bottom-end"
                border="1px solid var(--base-0200)"
                style={{
                    width: "300px",
                    borderRadius: "6px",
                    padding: 0,
                    boxShadow: "0px 2px 2px 0px #00000010",
                    zIndex: 200,
                    pointerEvents: "auto"
                }}
                className="!bg-base-0 dark:!bg-base-50"
            >
                <div className="w-full cursor-auto">
                    {/* Description */}
                    <div className="flex flex-col items-center p-4 ">
                        <div 
                            className={clsx(
                                "aspect-square w-10 h-10 mb-2",
                                "bg-blue-500 rounded-full shadow-sm"
                            )}
                        />
                        <span className="text-base-900 text-sm font-medium tracking-wide">
                            {props.employee?.FName} {props.employee?.LName}
                        </span>
                        <span className="tracking-wide text-base-500 text-xs">
                            {props.employee?.Email}
                        </span>
                    </div>
                    {/* Dark Mode Toggle */}
                    <div 
                        className={clsx(
                            "p-2 flex justify-between items-center gap-4",
                            "border-t border-t-base-300 dark:border-t-base-200"
                        )}
                    >
                        <div className="flex flex-col gap-0.5">
                            <span className="block text-xs text-base-700 font-medium">
                                Dark Mode
                            </span>
                            <span className="block text-xs text-base-500 tracking-wide">
                                Switch between light and dark themes
                            </span>
                        </div>
                        <Toggle
                            name="darkMode"
                            value={darkMode}
                            onChange={(n, v) => setDarkMode(v)}
                        />
                    </div>
                    {/* Logout Button */}
                    <div 
                        className={clsx(
                            "p-2 flex flex-col items-end",
                            "border-t border-t-base-300 dark:border-t-base-200"
                        )}
                    >
                        <SecondaryButton
                            onClick={() => null}
                            className="w-min h-min flex items-center gap-2"
                        >
                            <ArrowLeftStartOnRectangleIcon
                                className="size-3.5 stroke-base-700 stroke-[1.5px]"
                            />
                            <span 
                                className="text-xs text-base-700 tracking-wide font-medium"
                            >
                                Logout
                            </span>
                        </SecondaryButton>
                    </div>
                </div>
            </ToolTip>
        </div>
    )
}
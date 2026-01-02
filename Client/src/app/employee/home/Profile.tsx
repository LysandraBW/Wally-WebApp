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
                "w-10 h-10 aspect-square",
                "!bg-blue-500 dark:bg-base-50 rounded-full shadow-sm",
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
                    <div className="flex flex-col items-center p-4 ">
                        <div className="aspect-square w-10 h-10 mb-2 rounded-full bg-blue-500 shadow-sm"></div>
                        <span className="tracking-wide font-medium text-base-900 text-sm">
                            {props.employee?.FName} {props.employee?.LName}
                        </span>
                        <span className="tracking-wide text-base-500 text-xs">
                            {props.employee?.Email}
                        </span>
                    </div>
                    <div className="p-2 border-t border-t-base-300 dark:border-t-base-200 flex justify-between items-center gap-4">
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
                    <div className="p-2 border-t border-t-base-300 dark:border-t-base-200 flex flex-col items-end">
                        <SecondaryButton
                            onClick={() => null}
                            className="flex items-center gap-2 h-min w-min"
                        >
                            <ArrowLeftStartOnRectangleIcon
                                className="size-3.5 stroke-base-700 stroke-[1.5px]"
                            />
                            <span className="text-xs text-base-700 tracking-wide base-0space-nowrap font-medium">
                                Logout
                            </span>
                        </SecondaryButton>
                    </div>
                </div>
            </ToolTip>
        </div>
    )
}
import clsx from "clsx";
import { useState } from "react";

function Button(props: {label: string; outerClassName?: string; innerClassName?: string}) {
    return (
        <button 
            className={clsx(
                "w-full px-2 py-1 flex justify-center items-center gap-1",
                "bg-base-100 border border-base-300",
                props.outerClassName
            )}
        >
            <label 
                className={clsx(
                    "block text-xs text-base-500 whitespace-nowrap",
                    props.innerClassName
                )}
            >
                {props.label}
            </label>
        </button>
    )
}

export default function ThemeButton() {
    const [dark, setDark] = useState(true);

    const setTheme = (mode: "L" | "D") => {
        return;
    }

    return (
        <div>
            <div className="h-min flex rounded-[7px] shadow-sm">
                <Button
                    outerClassName={clsx(
                        "!rounded-l-[5px] !rounded-r-none !border-r-0",
                        !dark && "!border-r-[1px] bg-white"
                    )}
                    innerClassName={clsx(
                        !dark && "text-base-700"
                    )}
                    label="Light Mode"
                />
                <Button
                    outerClassName={clsx(
                        "!rounded-r-[5px] !rounded-l-none !border-l-0",
                        dark && "!border-l-[1px] bg-white"
                    )}
                    innerClassName={clsx(
                        dark && "text-base-700"
                    )}
                    label="Dark Mode"
                />
            </div>
        </div>
    )
}
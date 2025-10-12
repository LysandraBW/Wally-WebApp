import { Instrumental } from "@/public/Font";
import clsx from "clsx";
import { Fragment } from "react";

interface CardDataProps {
    label: React.ReactNode;
    value: React.ReactNode;
    // We don't want a border for the last row,
    // but we don't know what is the last row.
    // At least, now in its current state. I may
    // change it later.
    lastRow?: boolean;
}

export default function CardData(props: CardDataProps) {
    return (
        <Fragment>
            {/* Key */}
            <div 
                className={clsx(
                    Instrumental.className,
                    "py-2 pl-4",
                    "align-top",
                    "border-b border-gray-200 border-r border-r-gray-200",
                )}
            >
                <p 
                    className={clsx(
                        "text-02",
                        "tracking-wide",
                        "whitespace-nowrap"
                    )}
                >
                    {props.label}
                </p>
            </div>
            {/* Value */}
            <div 
                className={clsx(
                    Instrumental.className,
                    "py-2 pl-4",
                    "align-top",
                    "border-b border-gray-200",
                )}
            >
                <p 
                    className={clsx(
                        "text-02 text-gray-600",
                        "font-medium",
                        "tracking-wide"
                    )}
                >
                    {props.value}
                </p>
            </div>
        </Fragment>
    )
}
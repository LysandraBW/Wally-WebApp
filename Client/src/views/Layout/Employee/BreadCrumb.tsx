import ChevronRight from "@/component/Icon/ChevonRight";
import HashIcon from "@/component/Icon/Hash";
import clsx from "clsx";
import { redirect } from "next/navigation";
import { Fragment, ReactNode } from "react";

interface BreadCrumbProps {
    path: Array<[string, ReactNode]>;
}

// Another component that could go into its own
// separate file, but I'm not really sure where
// it would go.
export function AppointmentTag({id}: {
    id: string
}) {
    return (
        <div className="flex items-center gap-0">
            <div 
                className={clsx(
                    "flex items-center",
                    "fill-gray-400 stroke-gray-400"
                )}
            >
                <HashIcon
                    width="10"
                    height="10"
                    fill="inherit"
                    stroke="inherit"
                    strokeWidth="0.5"
                />
                <span className="text-01 font-medium">
                    {id}
                </span>
            </div>
        </div>
    )
}

export default function BreadCrumb(props: BreadCrumbProps) {
    return (
        <div 
            className={clsx(
                "flex items-center gap-1 p-1",
                "border-b border-gray-200",
                "fill-gray-400 stroke-gray-400"
            )}
        >
            <ChevronRight
                width="8"
                height="8"
                fill="inherit"
                stroke="inherit"
                strokeWidth="1"
            />
            {props.path.map(([url, path], i) => (
                <Fragment 
                    key={i}
                >
                    <a 
                        href={url} 
                        className={clsx(
                            "block text-01 font-medium",
                            "hover:cursor-pointer hover:text-blue-500"
                        )}
                    >
                            {path}
                    </a>
                    {i !== props.path.length - 1 &&
                        <ChevronRight
                            width="8"
                            height="8"
                            fill="inherit"
                            stroke="inherit"
                            strokeWidth="1"
                        />
                    }
                </Fragment>
            ))}
        </div>
    )
}
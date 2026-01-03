import { Fragment, ReactNode } from "react";

export default function ScalarViewSection({data}: {
    data: Array<[ReactNode, ReactNode]>;
}) {
    return (
        <Fragment>
            {data.map(([key, value], i) => (
                <Fragment
                    key={i}
                >
                    <span className="block h-full p-2 text-xs text-base-700 tracking-wide whitespace-nowrap border-b border-r border-base-300 dark:border-base-200">
                        {key}
                    </span>
                    <span className="block h-full p-2 text-xs text-base-700 tracking-wide font-medium border-b border-base-300 dark:border-base-200">
                        {value || "None "}
                    </span>
                </Fragment>
            ))}
        </Fragment>
    )
}
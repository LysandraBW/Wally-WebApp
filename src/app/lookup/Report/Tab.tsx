import { Fragment, ReactNode } from "react";

interface TabProps {
    data: Array<[string, ReactNode]>;
}

export default function Tab(props: TabProps) {
    return (
        <div className="grid grid-cols-[min-content_auto] surface-border surface-border-radius">
            {props.data.map(([k, v], i) => (
                <Fragment 
                    key={i}
                >
                    <span className="block text-sm tracking-wide whitespace-nowrap text-base-900 border-r border-b [&:nth-last-child(2)]:border-b-0 border-base-300 dark:border-base-200 px-4 py-2">
                        {k}
                    </span>
                    <span className="block text-sm tracking-wide whitespace-nowrap text-base-900 font-medium  px-4 py-2">
                        {v}
                    </span>
                </Fragment>
            ))}
        </div>
    )
}
import { Fragment } from "react";

export default function DataGroup({head, data}: {
    head: string;
    data: Array<[React.ReactNode, React.ReactNode]>
}) {
    return (
        <div className="flex flex-col gap-x-2 gap-y-1 p-4 py-2 border-b border-base-300 dark:border-base-200 last:!border-b-0 hover:bg-base-50">
            <span className="font-medium text-base-700 text-sm tracking-wide">{head}</span>
            <div className="grid grid-cols-[30%_70%] gap-x-4 gap-y-1">
                {data.map(([key, value], i) => (
                    <Fragment key={i}>
                        <span className="text-base-500 tracking-wide text-sm">{key}</span>
                        <span className="text-base-700 tracking-wide text-sm">{value}</span>
                    </Fragment>
                ))}
            </div>
        </div>
    )
}
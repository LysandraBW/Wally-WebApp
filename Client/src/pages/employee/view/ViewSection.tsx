import clsx from "clsx";
import { Fragment, ReactNode } from "react";

// I also should put these components in separate files,
// but it's a lot of work... and I could change my mind
// and waste my time, so I'll see how it plays out!
export function ScalarViewSection({head, data}: {
    head: string;
    data: Array<[ReactNode, ReactNode]>;
}) {
    return (
        <div className="flex flex-col gap-2 p-4 border-b border-gray-200">
            {/* <h6 className="font-medium uppercase text-01 text-gray-300">{head}</h6>  */}
            <div className="grid grid-cols-[min-content_min-content] gap-x-4 gap-y-2">
                {data.map(([key, value], i) => (
                    <Fragment
                        key={i}
                    >
                        <span className="whitespace-nowrap">{key}</span>
                        <span 
                            className={clsx(
                                "whitespace-nowrap",
                                "font-medium text-gray-950"
                            )}
                        >
                            {value
                        }</span>
                    </Fragment>
                ))}
            </div>
        </div>
    )
}

export function NonScalarViewSection({head, data}: {
    head: string;
    data: Array<ReactNode>;
}) {
    return (
        <div className="flex flex-col gap-2 p-4 border-b border-gray-200">
            {/* <h6 className="font-medium uppercase text-01 text-gray-300">{head}</h6> */}
            <div className="flex flex-col flex-wrap gap-4 max-h-[400px] w-min">
                {data.map((item, i) => (
                    <div 
                        key={i}
                        className="w-[300px] rounded-md"
                    >
                        {item}
                    </div>
                ))}
            </div>
        </div>
    )
}
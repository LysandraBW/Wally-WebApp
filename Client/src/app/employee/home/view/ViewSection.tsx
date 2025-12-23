import ArchiveBoxIcon from "@/component/Icons/Icons/ArchiveBoxIcon";
import clsx from "clsx";
import { Fragment, ReactNode } from "react";

// I also should put these components in separate files,
// but it's a lot of work... and I could change my mind
// and waste my time, so I'll see how it plays out!
// What was I thinking when I made this comment?
// This is like the 3rd comment I've made about this thing.

export function ScalarViewSection({head, data}: {
    head: string;
    data: Array<[ReactNode, ReactNode]>;
}) {
    return (
        <Fragment>
            {data.map(([key, value], i) => (
                <tr
                    key={i}
                    className="h-[32px] max-h-[32px] bg-white"
                >
                    <td className="border border-gray-300 whitespace-nowrap w-0 px-4 text-03 tracking-wide text-black">
                        {key}
                    </td>
                    <td className="whitespace-nowrap border border-gray-300 px-4 text-03 tracking-wide font-medium text-black">
                        {value}
                    </td>
                </tr>
            ))}
        </Fragment>
    )
}

export function NonScalarViewSection({head, data}: {
    head: string;
    data: Array<ReactNode>;
}) {
    return (
        <Fragment>
            <tr className="h-[32px] max-h-[32px]">
                <td className="border border-gray-300 whitespace-nowrap w-0 px-4 text-03 tracking-wide text-black align-top pt-2">
                    {head}
                </td>
                <td className="whitespace-nowrap border border-gray-300 py-0 px-4 text-03 tracking-wide font-medium text-black">
                    <div className="flex flex-wrap gap-4 py-4">
                        {data.length !== 0 &&
                            data.map((item, i) => (
                                <div 
                                    key={i}
                                    className="w-[300px] rounded-md"
                                >
                                    {item}
                                </div>
                            ))
                        }
                        {data.length === 0 &&
                            <div className="w-full bg-gray-5-0 rounded-md h-[100px] flex flex-col justify-center gap-1 items-center justify-center">
                                <ArchiveBoxIcon
                                    class="size-6 stroke-gray-400"
                                />
                                <span className="text-gray-400 tracking-wide font-medium text-04">
                                    No {head} Found
                                </span>
                            </div>
                        }
                    </div>
                </td>
            </tr>
        </Fragment>
    )
}
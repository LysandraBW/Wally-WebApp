import ArchiveBoxIcon from "@/component/Icons/Icons/ArchiveBoxIcon";
import { Fragment, ReactNode } from "react";

export function NonScalarViewSection({head, data}: {
    head: string;
    data: Array<ReactNode>;
}) {

    const arrN = (n: number) => {
        const arr = [];
        for (let i = 0; i < n; i++)
            arr.push(i);
        return arr;
    }


    return (
        <Fragment>
            <span className="block p-2 text-xs text-base-700 tracking-wide whitespace-nowrap border-b border-r border-base-300 dark:border-base-200">
                {head}
            </span>
            {/* data.length !== 0 */}
            {true &&
                <div className="grid grid-cols-5 border-b border-base-300 dark:border-base-200">
                    {
                        data.map((item, i) => (
                            <div 
                                key={i}
                                className="w-full h-[100px] overflow-y-auto border-b border-l border-base-300 dark:border-base-200 [&:nth-child(5n+1)]:border-l-0 [&:nth-last-child(-n+5)]:border-b-0"
                            >
                                {item}
                            </div>
                        ))
                    }
                    {
                        arrN(10 - (data.length % 5)).map((item, i) => (
                            <div
                                key={i}
                                className="w-full h-[100px] border-b border-l border-base-300 dark:border-base-200 [&:nth-child(5n+1)]:border-l-0 [&:nth-last-child(-n+5)]:border-b-0"
                            >

                            </div>
                        ))
                    }
                </div>
            }
            {/* data.length === 0 */}
            {false &&
                <div className="w-full h-full p-2 flex flex-col gap-1 justify-center items-center border-b border-base-300 dark:border-base-200">
                    <ArchiveBoxIcon
                        className="size-5 stroke-base-500"
                    />
                    <span className="text-base-500 tracking-wide font-medium text-xs">
                        No {head} Found
                    </span>
                </div>
            }
        </Fragment>
    )
}
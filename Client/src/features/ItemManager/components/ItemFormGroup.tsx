import clsx from "clsx";
import { ReactNode } from "react";

export default function ItemFormGroup({children, head}: {
    head?: string;
    children: ReactNode
}) {
    return (
        <div className="flex flex-col gap-2 p-2 pt-3 pb-4 border-b border-b-gray-300 bg-white last:border-b-0">
            {head &&
                <p className="text-xs text-base-700 tracking-wide font-medium leading-[14px]">
                    {head}
                </p>
            }
            <div className="flex flex-col gap-4">
                {children}
            </div>
        </div>
    )
}
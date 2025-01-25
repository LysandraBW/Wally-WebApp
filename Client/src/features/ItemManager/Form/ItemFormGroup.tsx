import clsx from "clsx";
import { ReactNode } from "react";

export default function ItemFormGroup({children, head}: {
    head: string;
    children: ReactNode
}) {
    return (
        <div 
            className={clsx(
                "flex flex-col gap-2",
                "p-4 border-b bg-white"
            )}
        >
            <p className="text-00 uppercase font-medium">{head}</p>
            <div 
                className={clsx(
                    "flex flex-col gap-4"
                )}
            >
                {children}
            </div>
        </div>
    )
}
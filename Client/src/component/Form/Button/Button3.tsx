import clsx from "clsx";
import { ButtonTwoProps } from "./Button2";

export default function ButtonThree(props: ButtonTwoProps) {
    return (
        <button 
            id={props.id || ""}
            onClick={props.onClick}
            className={clsx(
                "w-full px-4 py-2 mt-1",
                "bg-white rounded-lg",
                "font-medium text-md text-gray-500",
                "tracking-wide",
                "border border-gray-300",
                "shadow-[0px_1px_2px_0px_#0206170D,inset_0px_2px_0_0_#00000006]",
                "transition-all hover:bg-slate-50 hover:shadow-[0px_2px_3px_0px_#00000020,inset_0px_1px_0_0_#00000008]",
                props.style
            )}
        >
            {props.label}
        </button>
    )
}
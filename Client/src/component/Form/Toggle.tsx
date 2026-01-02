import { ReadWriteBooleanInputProps } from "@/features/Form/DEF";
import clsx from "clsx";


export default function Toggle(props: ReadWriteBooleanInputProps) {
    const toggleValue = () => {
        props.onChange(props.name, !props.value);
    }

    return (
        <button 
            onClick={toggleValue}
            className={clsx(
                "h-[16px] w-[32px] p-[1px] flex",
                "border rounded-full shadow-xs",
                !props.value && "bg-base-100 border-base-200 hover:bg-base-200/50 justify-start",
                props.value && "bg-blue-500 border-blue-500 hover:bg-blue-600 justify-end"
            )}
        >
            <div 
                className="h-full aspect-square bg-white shadow-sm rounded-full"
            />
        </button>
    )
}
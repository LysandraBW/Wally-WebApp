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
                "h-[20px] w-[32px] p-[2px] flex",
                "border rounded-full shadow-xs",
                !props.value && "bg-base-100 border-base-200 hover:bg-base-200/50 justify-start",
                props.value && "bg-blue-500 border-blue-500 justify-end"
            )}
        >
            <div 
                className="h-full aspect-square bg-white shadow-sm rounded-full"
            />
        </button>
    )
}
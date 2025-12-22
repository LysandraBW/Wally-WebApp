import { OptionsWithNode, ReadWriteArrayInputProps } from "@/features/Form/DEF";
import { Field } from "../Field";
import clsx from "clsx";

interface SegmentProps extends Omit<ReadWriteArrayInputProps, "options"> {
    options: OptionsWithNode;
}

export default function Segment(props: SegmentProps) {
    return (
        <Field
            state={props.state}
            label={props.label}
            input={
                <div 
                    className="rounded-md shadow-sm flex justify-between"
                >
                    {props.options.map((option, i) => (
                        <button 
                            key={i}
                            type="button"
                            onClick={() => props.onChange(props.name, [option[0]])}
                            className={clsx(
                                "w-full field-padding",
                                "first:border-l first:border-l-base-300 first:rounded-l-[5px] last:rounded-r-[5px]",
                                "border-t border-t-base-300 border-b border-b-base-300 border-r border-r-base-300 rounded-none",
                                "flex items-center justify-center gap-2",
                                props.values.includes(option[0]) && "bg-blue-500 !border-blue-500",
                                !props.values.includes(option[0]) && "hover:bg-base-50 dark:hover:bg-base-100",
                                (props.state && props.state[0] === false) && "!border-red-500"
                            )}
                        >
                            {option[2] && option[2]}
                            <span
                                className={clsx(
                                    "field-text",
                                    props.values.includes(option[0]) && "!text-white"
                                )}
                            >
                                {option[1]}
                            </span>
                        </button>
                    ))}
                </div>
            }
        />
    )
}
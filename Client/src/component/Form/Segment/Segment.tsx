import { ReadWriteArrayInputProps } from "@/features/Form/DEF";
import { Field } from "../Field";
import clsx from "clsx";

export default function Segment(props: ReadWriteArrayInputProps) {
    return (
        <Field
            state={props.state}
            label={props.label}
            input={
                <div 
                    className={clsx(
                        "flex gap-4 rounded-md",
                        "border border-gray-200",
                        "bg-gray-50 w-full",
                        "shadow-[inset_0px_0px_2px_0px_rgb(0,0,0,0.02)]"
                    )}>
                    {props.options.map((option, i) => (
                        <button 
                            key={i}
                            type="button"
                            onClick={() => {
                                props.onChange(props.name, [option[0]]);
                            }}
                            className={clsx(
                                "py-2 px-3 w-full rounded-md",
                                props.values[0].includes(option[0])  && `
                                    bg-white 
                                    shadow-[0px_0px_0px_1px_#000] 
                                    shadow-gray-300
                                `,
                            )}
                        >
                            <span
                                className={clsx(
                                    "relative",
                                    "font-medium whitespace-nowrap",
                                    props.values[0].includes(option[0]) && `
                                        text-gray-950
                                    `
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
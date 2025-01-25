import { ReadWriteArrayInputProps } from "@/features/Form/DEF";
import { OptionsWithNode } from "@/features/Form/DEF";
import clsx from "clsx";
import { Field } from "../Field";

interface RadioProps extends Omit<ReadWriteArrayInputProps, "options"> {
    options: OptionsWithNode;
}

export default function Radio(props: RadioProps) {
    return (
        <Field
            label={props.label}
            state={props.state}
            input={(
                <div className="flex gap-4">
                    {props.options.map((option, i) => (
                        <button
                            key={i}
                            className={clsx(
                                "flex items-start gap-3 px-3 py-3",
                                "rounded-md border border-gray-200",
                                "shadow-sm",
                                props.values.includes(option[0]) && `
                                    !border-blue-600 
                                    !shadow-[0px_0px_0px_2px_black] 
                                    !shadow-blue-200
                                `
                            )}
                            onClick={() => {
                                props.onChange(props.name, [option[0]]);
                            }}
                        >
                            <div 
                                className={clsx(
                                    "flex items-center justify-center",
                                    "border border-gray-200",
                                    "shadow rounded-full",
                                    "aspect-square w-4 h-4 p-0.5",
                                    props.values.includes(option[0]) && `
                                        !bg-blue-500 
                                        !border-blue-700
                                    `,
                                )}
                            >
                                {props.values.includes(option[0]) &&
                                    <div 
                                        className={clsx(
                                            "w-2 h-2",
                                            "aspect-square bg-white",
                                            "shadow rounded-full",
                                            "border-blue-700"
                                        )}
                                    />
                                }
                            </div>
                            {/* Custom Input */}
                            {option[2] && option[2]}
                            {/* 
                            Default Label
                            Thinking of how the buttons are
                            currently styled, I'm not sure if
                            this would ever be a thing.
                            */}
                            {!option[2] && 
                                <span>{option[1]}</span>
                            }
                        </button>
                    ))}
                </div>
            )}
        />
    )
}
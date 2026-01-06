import { ReadWriteArrayInputProps } from "@/features/Form/DEF";
import { OptionsWithNode } from "@/features/Form/DEF";
import clsx from "clsx";
import { Field } from "../Field";
import RadioButton from "./RadioButton";

interface RadioProps extends Omit<ReadWriteArrayInputProps, "options"> {
    options: OptionsWithNode;
    smaller?: boolean;
}

export default function Radio(props: RadioProps) {
    return (
        <Field
            label={props.label}
            state={props.state}
            smaller={props.smaller}
            input={(
                <div className="flex gap-2 h-full">
                    {props.options.map((option, i) => (
                        <button
                            key={i}
                            className={clsx(
                                "w-full flex items-center gap-2 px-2 py-1",
                                "field-hover surface-border field-focus"
                            )}
                            onClick={() => props.onChange(props.name, [option[0]])}
                        >
                            <RadioButton
                                checked={props.values.includes(option[0])}
                            />
                            {/* Custom Input */}
                            {option[2] ?
                                option[2]
                                :
                                <span className="field-text leading-[14px]">
                                    {option[1]}
                                </span>
                            }
                        </button>
                    ))}
                </div>
            )}
        />
    )
}
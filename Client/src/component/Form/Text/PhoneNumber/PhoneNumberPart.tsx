import { ReadWriteInputProps } from "@/features/Form/DEF";

export type Part = 0|1|2;
export interface PhoneNumberPartProps extends Omit<ReadWriteInputProps, "onChange"> {
    part: Part;
    onChange: (part: Part, value: string) => void;
}

export default function PhoneNumberPart(props: PhoneNumberPartProps) {
    const onChange = (event: any) => {
        const {value} = event.target;
        props.onChange(props.part, value);
    }

    return (
        <input
            type="text"
            name={props.name + props.part.toString()}
            value={props.value}
            onBlur={props.onBlur}
            onChange={onChange}
            onKeyDown={(event) => {
                const key = event.key;
                if (key == "Backspace" && props.value == "")
                    props.onChange(props.part, "");
            }}
            className="field-bg-shadow field-border field-focus field-padding field-text grow"
        />
    )
}
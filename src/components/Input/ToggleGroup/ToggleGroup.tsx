import { toggleValue } from "@/lib/Input/Toggle";
import { Input, WriteInputProps } from "../Input";

interface ToggleGroupProps<T> extends WriteInputProps {
    value: Array<T>;
    values: Array<[T, string]>;
}

export default function ToggleGroup(props: ToggleGroupProps<any>) {
    const changeHandler = (value: any) => {
        if (props.onChange)
            props.onChange(props.name, toggleValue(props.value, value));
    }

    return (
        <Input
            label={props.label}
            state={props.state || {state: true, message: ''}}
            input={(
                <div>
                    {props.values.map(([value, label], i) => (
                        <div key={i}>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={props.value.includes(value)}
                                    onChange={() => changeHandler(value)}
                                />
                                <span>
                                    {label}
                                </span>
                            </label>
                        </div>
                    ))}
                </div>
            )}
        />
    )
}
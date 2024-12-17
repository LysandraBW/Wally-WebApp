import { toggleValue } from "@/lib/input/Toggle";
import { Input } from "../Input";
import { WriteInputProps } from '../../mutate_input';

interface ToggleGroupProps<T> extends WriteInputProps {
    selectedValues: Array<T>;
    values: Array<[T, string]>;
}

export default function ToggleGroup(props: ToggleGroupProps<any>) {
    const changeHandler = (value: any) => {
        if (props.onChange)
            props.onChange(props.name, toggleValue(props.selectedValues, value));
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
                                    checked={props.selectedValues.includes(value)}
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
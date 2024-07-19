import { Input, WriteInputProps } from "../Input";
import { useState } from "react";

interface CheckboxProps<T> extends WriteInputProps {
    value: Array<T>;
    values: {[k: string]: Array<[T, string]>};
}

export default function Checkbox(props: CheckboxProps<any>) {
    const tabs = Object.keys(props.values);
    const [tab, setTab] = useState(tabs[0]);
    
    const getTabs = (): React.ReactNode => {
        if (!tabs.length) {
            return <></>;
        }

        return (
            <div>
                {tabs.map((t, i) => (
                    <div key={i}>
                        {getTab(t)}
                    </div>
                ))}
            </div>
        )
    }

    const getTab = (t: string): React.ReactNode => {
        return (
            <div onClick={() => setTab(t)}>
                {t === tab ? t.toUpperCase() : t}
            </div>
        )
    }

    const changeHandler = (value: any) => {
        let updatedValue: Array<any> = [...props.value];
        const index = updatedValue.indexOf(value);

        // Value Found => Remove
        if (index > -1) 
            updatedValue.splice(index, 1);
        // Value Not Found => Add
        else 
            updatedValue.push(value);

        props.onChange && props.onChange(props.name, updatedValue);
    }

    const getCheckboxes = (): React.ReactNode => {
        return (
            <div>
                {props.values[tab] && props.values[tab].map(([value, label], i) => (
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
                {/* Hard-Coding the 'Unknown' Option */}
                <label>
                    <input
                        type="checkbox"
                        checked={props.value.includes(1)}
                        onChange={() => changeHandler(1)}
                    />
                    <span>Other or I Don't Know</span>
                </label>
            </div>
        )
    }

    return (
        <Input
            label={props.label}
            input={
                <>
                    {getTabs()}
                    {getCheckboxes()}
                </>
            }
        />
    )
}
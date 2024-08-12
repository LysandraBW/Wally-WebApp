import { toggleValue } from "@/lib/Input/Toggle";
import { Input } from "../Input";
import { WriteInputProps } from '../MutateInput';
import { useEffect, useState } from "react";
import Tabs from "./Tabs";
import Checkboxes from "./Checkboxes";
import Record from "./Record";

interface CheckboxProps<T> extends WriteInputProps {
    value: Array<T>;
    values: {[k: string]: Array<[T, string]>};
}

export default function Checkbox(props: CheckboxProps<any>) {
    const tabs = Object.keys(props.values);
    const [tab, setTab] = useState(tabs[0]);

    useEffect(() => {
        setTab(Object.keys(props.values)[0]);
    }, [props.values]);

    const changeHandler = (value: any) => {
        if (props.onChange)
            props.onChange(props.name, toggleValue(props.value, value));
    }

    return (
        <Input
            input={
                <div className='flex flex-col gap-y-2'>
                    <div className='border rounded-t-[0.375rem] border-gray-300'>                        
                        <Tabs
                            tab={tab}
                            tabs={tabs}
                            setTab={tab => setTab(tab)}
                        />
                        <Checkboxes
                            value={props.value}
                            values={props.values[tab]}
                            onChange={changeHandler}
                        />
                    </div>
                    <Record
                        value={props.value}
                        values={props.values}
                    />
                </div>
            }
            state={props.state}
            label={props.label}
        />
    )
}
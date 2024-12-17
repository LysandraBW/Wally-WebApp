import { toggleValue } from "@/lib/input/toggle";
import { Input } from "../../input/Input";
import { WriteInputProps } from '../../mutate_input';
import { useEffect, useState } from "react";
import Tabs from "./Tabs";
import Values from "./Values";
import SelectedValues from "./SelectedValues";

interface CheckboxesProps<T> extends WriteInputProps {
    // The values of a checkbox are organized in an object:
    // The keys represent the tab names.
    // The values represent the checkboxes for that key (tab).
    values: {[k: string]: Array<[T, string]>};
    selectedValues: Array<T>;
}

export default function Checkboxes(props: CheckboxesProps<any>) {
    const tabs = Object.keys(props.values);
    const [tab, setTab] = useState(tabs[0]);

    useEffect(() => {
        setTab(Object.keys(props.values)[0]);
    }, [props.values]);

    const changeHandler = (value: any) => {
        if (props.onChange)
            props.onChange(props.name, toggleValue(props.selectedValues, value));
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
                        <Values
                            onChange={changeHandler}
                            values={props.values[tab]}
                            selectedValues={props.selectedValues}
                        />
                    </div>
                    <SelectedValues
                        values={props.values}
                        selectedValues={props.selectedValues}
                    />
                </div>
            }
            state={props.state}
            label={props.label}
        />
    )
}
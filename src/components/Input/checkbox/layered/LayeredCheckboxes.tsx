import { toggleValue } from "@/lib/input/toggle";
import { Input } from "../../input/Input";
import { WriteInputProps } from '../../mutate_input';
import { useState } from "react";

interface LayeredCheckboxesProps<T> extends WriteInputProps {
    selectedValues: Array<T>;
    values: {[k: string]: {[k: string]: Array<[T, string]>}};
}

/*
    !!! NEEDS REWORKING !!!
    
    LayeredCheckboxes:
    The user will need to select two values instead of one
    to view a set of checkboxes. In this case, the 2nd value relies on the 1st.
*/

export default function LayeredCheckboxes(props: LayeredCheckboxesProps<any>) {
    const tabs = Object.keys(props.values);
    const [tab, setTab] = useState(tabs[0]);
    const [innerTab, setInnerTab] = useState(tabs && Object.keys(props.values[tabs[0]])[0] || '');
    
    const changeHandler = (value: any) => {
        if (props.onChange)
            props.onChange(props.name, toggleValue(props.selectedValues, value));
    }

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

    const getInnerTabs = (): React.ReactNode => {
        return (
            <div>
                {Object.keys(props.values[tab]).map((t, i) => (
                    <div key={i}>
                        {getInnerTab(t)}
                    </div>
                ))}
            </div>
        )
    }

    const getTab = (t: string): React.ReactNode => {
        return (
            <div onClick={() => {
                setTab(t);
                setInnerTab(Object.keys(props.values[t])[0]);
            }}>
                {t === tab ? t.toUpperCase() : t}
            </div>
        )
    }

    const getInnerTab = (t: string): React.ReactNode => {
        return (
            <div onClick={() => setInnerTab(t)}>
                {t === innerTab ? t.toUpperCase() : t}
            </div>
        )
    }


    const getCheckboxes = (): React.ReactNode => {
        return (
            <div>
                {props.values[tab] && props.values[tab][innerTab].map(([value, label], i) => (
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
                {/* Hard-Coding the 'Unknown' Option */}
                <label>
                    <input
                        type="checkbox"
                        checked={props.selectedValues.includes(1)}
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
                /* Use <Fragment> instead of <> */
                <>
                    {/* Create React elements, instead of repeatedly calling these functions. */}
                    {getTabs()}
                    {getInnerTabs()}
                    {getCheckboxes()}
                </>
            }
            state={props.state || {state: false, message: ''}}
        />
    )
}
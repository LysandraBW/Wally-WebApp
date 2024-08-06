import { toggleValue } from "@/lib/Input/Toggle";
import { Input, WriteInputProps } from "../Input";
import { useEffect, useState } from "react";
import Bucket from "@/components/Icon/Bucket/Bucket";
import Nut from "@/components/Icon/Nut/Nut";
import Clipboard from "@/components/Icon/Clipboard/Clipboard";
import Check from "@/components/Icon/Check/Check";

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
    
    const getTabs = (): React.ReactNode => {
        if (!tabs.length) {
            return <></>;
        }

        return (
            <div className='flex justify-around items-center w-max'>
                {tabs.map((t, i) => (
                    <div 
                        className={[
                            'relative flex justify-between items-center gap-x-[4px] p-[4px]',
                            `${tab === t ? 'after:block after:absolute after:rounded-[1px] after:bottom-0 after:h-[3px] after:w-[90%] after:bg-black' : ''}`
                        ].join(' ')} 
                        key={i}
                    >
                        {/* {icons[i]} */}
                        {getTab(t)}
                    </div>
                ))}
            </div>
        )
    }

    const getTab = (t: string): React.ReactNode => {
        return (
            <div 
                className={[
                    'whitespace-nowrap',
                    `${tab === t ? 'font-semibold' : ''}`
                ].join(' ')}
                onClick={() => {
                    setTab(t);
                }}
            >
                {t}
            </div>
        )
    }

    const changeHandler = (value: any) => {
        if (props.onChange)
            props.onChange(props.name, toggleValue(props.value, value));
    }

    const getCheckboxes = (): React.ReactNode => {
        return (
            <div className='grid grid-cols-5 gap-x-[8px] gap-y-[4px] w-max'>
                {props.values[tab] && props.values[tab].map(([value, label], i) => (
                    <div key={i}>
                        <label className='whitespace-nowrap flex gap-x-[4px] items-center'>
                            <span
                                className='w-[12px] h-[12px] border border-black rounded-[2px] flex justify-center items-center'
                                onClick={() => changeHandler(value)}
                            >
                                {props.value.includes(value) && <Check/>}
                            </span>
                            <span
                                className='whitespace-nowrap'
                            >
                                {label}
                            </span>
                        </label>
                    </div>
                ))}
                {/* Hard-Coding the 'Unknown' Option */}
                <label className='whitespace-nowrap flex gap-x-[4px] items-center'>
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
                <div className=''>
                    <div className='border-b border-b-black'>
                        {getTabs()}
                    </div>
                    <div className='px-[8px] py-[4px] overflow-x-scroll'>
                        {getCheckboxes()}
                    </div>
                </div>
            }
            state={props.state || {state: true, message: ''}}
        />
    )
}
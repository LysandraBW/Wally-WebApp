"use client";
import Check from "@/components/Icon/Check/Check";
import { Input, WriteInputProps } from "../Input";
import clsx from "clsx";

export interface DropdownFrameProps<T> extends WriteInputProps {
    open: boolean;
    setOpen: (b: boolean) => any;
    value: Array<T>;
    values: Array<[T, string]>;
    multiple?: boolean;
    disabled?: boolean;
    defaultLabel: string;
    getToggle: () => React.ReactNode;
    lenient?: boolean;
}

export function DropdownFrame(props: DropdownFrameProps<any>) {
    const getList = (): React.ReactNode => {
        if (!props.open) 
            return <></>
            
        return (
            <div className='border border-gray-300 border-t-0 rounded-b'> 
                {props.values.map(([value, label], i) => (
                    <div 
                        key={i}
                        className='border-b border-b-gray-300 last:border-b-0 hover:bg-blue-100'    
                    >
                        {getOption(value, label)}
                    </div>
                ))}
            </div>
        )
    }    

    const getOption = (value: any, label: string): React.ReactNode => {
        return (
            <div 
                className={clsx(
                    'inputPadding flex justify-between items-center',
                    props.value.includes(value) && 'bg-gray-100'
                )}
                onClick={() => {
                    changeHandler(value);
                    !props.multiple && props.setOpen(false);
                }}
            >
                <label
                    className={clsx(
                        'text-gray-500',
                        props.value.includes(value) && 'text-blue-400'
                    )}
                >
                    {label}
                </label>
                {props.value.includes(value) &&
                    <Check
                        color='#273B9B'
                        width='16'
                        height='16'
                        strokeWidth="1px"
                    />
                }
            </div>
        )
    }

    const changeHandler = (value: any): void => {
        let updatedValue: any = [...props.value];
        
        if (!props.multiple) {
            updatedValue = [value];
        }
        else {
            const index = props.value.indexOf(value);
            if (index > -1) 
                updatedValue.splice(index, 1);
            else 
                updatedValue.push(value);
        }
    
        props.onChange && props.onChange(props.name, updatedValue);
    }

    return (
        <Input
            label={props.label}
            input={
                <div
                    tabIndex={0}
                    onBlur={(event) => {
                        if (event.currentTarget.contains(event.relatedTarget))
                            return;
                        props.setOpen(false);        
                        props.onBlur && props.onBlur();
                    }}
                >
                    {props.getToggle()}
                    {getList()}
                </div>
            }
            state={props.state || {state: true, message: ''}}
        />
    )
}
"use client";
import Check from "@/components/Icon/Check/Check";
import { Input, WriteInputProps } from "../Input";

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
            <div className='border border-black border-t-0 rounded-b'> 
                {props.values.map(([value, label], i) => (
                    <div 
                        key={i}
                        className='px-[8px] py-[4px] border-b border-b-black last:border-b-0 hover:bg-blue-100'    
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
                className='flex justify-between items-center'
                onClick={() => {
                    changeHandler(value);
                    !props.multiple && props.setOpen(false);
                }}
            >
                <label>{label}</label>
                {props.value.includes(value) &&
                    <Check/>
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
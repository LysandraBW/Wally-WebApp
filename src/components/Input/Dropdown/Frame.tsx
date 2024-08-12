"use client";
import { Input } from "../Input";
import { WriteInputProps } from '../MutateInput';
import List from "./List";

export interface DropdownFrameProps<T> extends WriteInputProps {
    open: boolean;
    toggleDropdown: (b: boolean) => any;
    value: Array<T>;
    values: Array<[T, string]>;
    defaultLabel: string;
    children: React.ReactNode;
    multiple?: boolean;
    disabled?: boolean;
}

export function DropdownFrame<T>(props: DropdownFrameProps<T>) {
    const changeHandler = (value: T): void => {
        let updatedValue = [...props.value];
        
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

    const blurHandler = (event: any): void => {
        if (event.currentTarget.contains(event.relatedTarget))
            return;
        props.toggleDropdown(false);        
        props.onBlur && props.onBlur();
    }

    const clickHandler = (value: T): void => {
        changeHandler(value);
        !props.multiple && props.toggleDropdown(false);
    }

    return (
        <Input
            label={props.label}
            input={
                <div
                    tabIndex={0}
                    className={'relative'}
                    onBlur={(event) => blurHandler(event)}
                >
                    {props.children}
                    {props.open &&
                        <List
                            value={props.value}
                            values={props.values}
                            onClick={(value) => clickHandler(value)}
                        />
                    }
                </div>
            }
            state={props.state}
        />
    )
}
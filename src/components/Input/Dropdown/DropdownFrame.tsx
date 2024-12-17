"use client";
import { Input } from "../input/Input";
import { WriteInputProps } from '../mutate_input';
import ValueList from "./ValueList";

/*
    DropdownFrame:
    This component abstracts common functionality (i.e. onBlur, onClick, onChange)
    from the Dropdown and Search components.
*/

export interface DropdownFrameProps<T> extends WriteInputProps {
    open: boolean;
    toggleDropdown: (open: boolean) => any;
    selectedValues: Array<T>;
    values: Array<[T, string]>;
    defaultLabel: string;
    children: React.ReactNode;
    multiple?: boolean;
    disabled?: boolean;
}

export function DropdownFrame<T>(props: DropdownFrameProps<T>) {
    const changeHandler = (value: T): void => {
        let updatedValue = [...props.selectedValues];
        
        // Single Value
        if (!props.multiple) {
            updatedValue = [value];
        }
        // Multiple Values
        else {
            const indexOfValue = props.selectedValues.indexOf(value);
            // The value is already selected,
            // so we now remove it.
            if (indexOfValue > -1) 
                updatedValue.splice(indexOfValue, 1);
            // The value has not been selected,
            // so we now add it.
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
        // You can only click a value if the
        // value list is already open,
        // which is why false is directly passed in.
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
                        <ValueList
                            value={props.selectedValues}
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
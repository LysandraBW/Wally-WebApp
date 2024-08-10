'use client';
import { useState, useEffect } from 'react';
import { WriteInputProps } from '../../Input';
import { DropdownFrame } from '../../Dropdown/Frame';
import CloseToggle from './CloseToggle';
import OpenToggle from './OpenToggle';
import { getFilteredValues } from '@/lib/Input/Filter';

export interface SearchProps<T> extends WriteInputProps {
    value: Array<T>;
    values: Array<[T, string]>;
    defaultLabel: string;
    multiple?: boolean;
    disabled?: boolean;
    size?: number;
}

export default function Search(props: SearchProps<any>) {
    const [open, setOpen] = useState(false);
    const [filtered, setFiltered] = useState<Array<[any, string]>>([]);

    useEffect(() => {
        setFiltered(getFilteredValues({
            filter: '',
            size: props.size,
            value: props.value,
            values: props.values
        }));
    }, [open]);

    const changeHandler = (name: string, value: any) => {
        if (value === null)
            return;
        props.onChange && props.onChange(name, value);
    }

    return (
        <DropdownFrame
            name={props.name}
            label={props.label}
            defaultLabel={props.defaultLabel}
            state={props.state}
            value={props.value}
            values={filtered}
            open={open}
            toggleDropdown={setOpen}
            multiple={props.multiple}
            disabled={props.disabled}
            onBlur={props.onBlur}
            onChange={changeHandler}
        >
            {open &&
                <OpenToggle
                    open={open}
                    closeToggle={() => setOpen(false)}
                    size={props.size}  
                    value={props.value}
                    values={props.values}
                    setFilteredList={(value) => setFiltered(value)}
                />
            }
            {!open &&
                <CloseToggle
                    open={open}
                    openToggle={() => setOpen(true)}
                    value={props.value}
                    values={props.values}
                    defaultLabel={props.defaultLabel}
                    disabled={props.disabled}
                    multiple={props.multiple}
                />
            }
        </DropdownFrame>
    )
}
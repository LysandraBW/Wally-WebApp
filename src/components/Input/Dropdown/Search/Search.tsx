'use client';
import { useState, useEffect } from 'react';
import { WriteInputProps } from '../../Input';
import { DropdownFrame } from '../../Dropdown/Frame';
import ChevronDown from '@/components/Icon/Chevron/Down';
import clsx from 'clsx';

export interface SearchProps<T> extends WriteInputProps {
    value: Array<T>;
    values: Array<[T, string]>;
    multiple?: boolean;
    disabled?: boolean;
    defaultLabel: string;
    size?: number;
}

export default function Search(props: SearchProps<any>) {
    const [open, setOpen] = useState(false);
    const [filtered, setFiltered] = useState<Array<[any, string]>>([]);

    const toggleLabel = () => {
        if (props.multiple)
            return props.defaultLabel;
        
        for (const [value, label] of props.values) {
            if (props.value.includes(value)) {
                return label;
            }
        }
    
        return props.defaultLabel;
    }

    useEffect(() => {
        setFiltered(filteredValues());
    }, [open]);

    const filteredValues = (filter: string = ''): Array<[any, string]> => {
        const filtered: Array<[any, string]> = [];
        for (let i = 0; i < props.values.length; i++) {
            const [value, label] = props.values[i];
            if (label.toUpperCase().includes(filter.toUpperCase()))
                filtered.push([value, label]);

            if (props.size && filtered.length >= props.size)
                break;
        }
        filtered.sort((a, b) => a[1].localeCompare(b[1]));

        const remainingLength = props.values.length - filtered.length;
        if (remainingLength > 0 && filtered.length !== 0)
            filtered.push([null, `+${remainingLength} More`]);
        else if (filtered.length === 0)
            filtered.push([null, 'No Matches']);

        return filtered;
    }

    const changeHandler = (name: string, value: any) => {
        if (value === null)
            return;
        props.onChange && props.onChange(name, value);
    }
   
    const getSearchToggle = (): React.ReactNode => {
        if (open)
            return getSearch();
        else
            return getToggle();
    }

    const getToggle = (): React.ReactNode => {
        return (
            <div 
                className={clsx(
                    'inputBox w-full flex justify-between items-center',
                    !open && 'text-gray-500'
                )}
                onClick={() => !props.disabled && setOpen(!open)}
            >
                {toggleLabel()}
                <ChevronDown
                    color={'#3F4151'}
                />
            </div>
        )
    }

    const getSearch = (): React.ReactNode => {
        return (
            <div 
                className={clsx(
                    'inputBox flex justify-between items-center',
                    open && 'rounded-none rounded-t'
                )}
            >
                <input 
                    type='text'
                    className='border-none p-0'
                    placeholder='Search'
                    onChange={(event) => {
                        const filter = event.target.value.toUpperCase();
                        setFiltered(filteredValues(filter));
                    }}
                />
                <ChevronDown
                    color={'#3F4151'}
                />
            </div>
        )
    }

    return (
        <DropdownFrame
            open={open}
            setOpen={setOpen}
            name={props.name}
            label={props.label}
            value={props.value}
            values={filtered}
            defaultLabel={props.defaultLabel}
            multiple={props.multiple}
            disabled={props.disabled}
            onBlur={props.onBlur}
            onChange={changeHandler}
            getToggle={getSearchToggle}
            state={props.state}
        />
    )
}
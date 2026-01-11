import { Fragment, ReactNode, useEffect, useState } from "react";
import toggleValue from "@/features/Form/helpers/toggleValue";
import Toggle from "./Toggle";
import Wrapper from "./Wrapper";
import Element from "./Element";
import { Field } from "../Field";
import searchLabels from "@/features/Form/helpers/searchLabels";
import SearchBar from "./SearchBar";
import { SelectProps } from "./SelectProps";
import { OptionMap } from "@/features/Form/DEF";
import getValuesToLabels from "@/features/Form/helpers/getValuesToLabels";


export interface SearchProps extends SelectProps {
    searchPlaceholder?: string;
    sortNums?: boolean;
    toggleClassName?: string;
}


export default function Search(props: SearchProps) {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [matched, setMatched] = useState(props.options.slice(0, 10));
    const [optionMap, setOptionMap] = useState<OptionMap>();
    const [toggleLabel, setToggleLabel] = useState<ReactNode>(props.toggleLabel);
    
    useEffect(() => {
        setOptionMap(getValuesToLabels(props.options.map((option) => [option[0], option.at(-1) as any])));
    }, [props.options]);

    useEffect(() => {
        if (props.multiple || !props.values.length || !optionMap) {
            setToggleLabel(props.toggleLabel);
            return;
        }
        setToggleLabel(optionMap[props.values[0]]);
    }, [props.values, optionMap]);

    useEffect(() => {
        const matched = searchLabels(search, props.options, props.sortNums);
        setMatched(matched);
    }, [open, search]);

    const openList = () => {
        if (props.disabled)
            return;
        setOpen(!open);
    }

    const closeList = (event: any): void => {
        if (event.currentTarget.contains(event.relatedTarget))
            return;
        setOpen(false);
    }

    const selectValue = (value: string) => {
        const updatedValue = toggleValue(props.values, value); 
        props.onChange(props.name, updatedValue);
    }
    
    return (
        <Field
            label={props.label}
            state={props.state}
            input={
                <div 
                    className="relative h-full"
                    tabIndex={0}
                    onBlur={closeList}
                    onClick={openList}
                >
                    <Toggle
                        onClick={openList}
                        icon={props.ToggleIcon}
                        label={toggleLabel}
                        smaller={props.smaller}
                        disabled={props.disabled}
                        className={props.toggleClassName}
                    />
                    {open &&
                        <Wrapper>
                            {props.ListHeader ?
                                <props.ListHeader>
                                    <SearchBar
                                        search={search}
                                        setSearch={setSearch}
                                        searchPlaceholder={props.searchPlaceholder}
                                    />
                                </props.ListHeader>
                                :
                                <SearchBar
                                    search={search}
                                    setSearch={setSearch}
                                    searchPlaceholder={props.searchPlaceholder}
                                />
                            }
                            {matched.length === 0 &&
                                <ul className="px-2 py-1 bg-base-0 dark:bg-base-50">
                                    <li className="text-center text-base-500 dark:text-base-400 text-sm">
                                        No Results
                                    </li>
                                </ul>
                            }
                            {matched.length > 0 && matched.map((option, i) => (
                                <Fragment key={i}>
                                    <Element
                                        label={option.at(-1)}
                                        selectValue={() => selectValue(option[0])}
                                        checked={props.values.includes(option[0])}
                                        CheckedIcon={props.CheckedIcon}
                                        NotCheckedIcon={props.NotCheckedIcon}
                                    />
                                </Fragment>
                            ))}
                        </Wrapper>
                    }
                </div>
            }
        />
    )
}
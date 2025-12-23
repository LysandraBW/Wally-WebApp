import { Fragment, useEffect, useState } from "react";
import toggleValue from "@/features/Form/helpers/toggleValue";
import Toggle from "./Toggle";
import Wrapper from "./Wrapper";
import Element from "./Element";
import { Field } from "../Field";
import searchLabels from "@/features/Form/helpers/searchLabels";
import SearchBar from "./SearchInput";
import { SelectProps } from "./SelectProps";


export interface SearchProps extends SelectProps {
    searchPlaceholder?: string;
}


export default function Search(props: SearchProps) {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [matched, setMatched] = useState(props.options.slice(0, 10));
    
    useEffect(() => {
        const matched = searchLabels(search, props.options);
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
                    className="relative"
                    tabIndex={0}
                    onBlur={closeList}
                    onClick={openList}
                >
                    <Toggle
                        onClick={() => setOpen(true)}
                        icon={props.ToggleIcon}
                        label={props.toggleLabel}
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
                                <ul className="px-2 py-1">
                                    <li className="text-center text-base-500 text-sm">
                                        No Results
                                    </li>
                                </ul>
                            }
                            {matched.length > 0 && matched.map(([value, label], i) => (
                                <Fragment key={i}>
                                    <Element
                                        label={label}
                                        selectValue={() => selectValue(value)}
                                        checked={props.values.includes(value)}
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
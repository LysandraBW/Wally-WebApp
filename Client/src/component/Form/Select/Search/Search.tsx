"use client";
import { Fragment, useEffect, useState } from "react";
import { SelectProps } from "../DEF";
import { OptionMap, Value } from "@/features/Form/DEF";
import getValuesToLabels from "@/features/Form/helpers/getValuesToLabels";
import searchLabels from "@/features/Form/helpers/searchLabels";
import Toggle from "../Toggle";
import TextField from "../../Text/TextField";
import List from "../List";
import { Field } from "../../Field";

export default function Search(props: SelectProps) {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [matched, setMatched] = useState(props.options.slice(0, 10));
    const [valueToLabel, setValueToLabel] = useState<OptionMap>({});

    useEffect(() => {
        setValueToLabel(getValuesToLabels(props.options));
    }, [props.options]);

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
        setSearch("");
    }

    const selectValue = (value: Value) => {
        props.onChange(props.name, [value]);
        setOpen(false);
    }
    
    return (
        <Field
            label={props.label}
            state={props.state}
            input={
                <div
                    tabIndex={0}
                    onBlur={closeList}
                    className="flex flex-col gap-y-1 w-full relative"
                >
                    {!open &&
                        <div onClick={openList}>
                            <Toggle
                                open={open}
                                multiple={false}
                                label={<p className="px-2 py-1">{valueToLabel[props.values[0]] || props.toggleLabel}</p>}
                            />
                        </div>
                    }
                    {open &&
                        <Fragment>
                            <TextField
                                type="text"
                                name="search"
                                value={search}
                                placeholder="Search"
                                onChange={(name: string, value: Value) => setSearch(value)}
                            />
                            <List
                                values={props.values}
                                options={matched}
                                multiple={false}
                                selectValue={selectValue}
                            />
                        </Fragment>
                    }
                </div>
            }
        />
    )
}
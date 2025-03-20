"use client";
import { Fragment, useEffect, useState } from "react";
import { SelectProps } from "../DEF";
import { OptionMap, Value } from "@/features/Form/DEF";
import getValuesToLabels from "@/features/Form/helpers/getValuesToLabels";
import searchLabels from "@/features/Form/helpers/searchLabels";
import toggleValue from "@/features/Form/helpers/toggleValue";
import { Field } from "../../Field";
import Log from "../Log";
import Toggle from "../Toggle";
import TextField from "../../Text/TextField";
import List from "../List";

export default function MultipleSearch(props: SelectProps) {
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
        setOpen(true);
    }

    const closeList = (event: any): void => {
        if (event.currentTarget.contains(event.relatedTarget))
            return;
        setOpen(false);
        setSearch("");
    }

    const selectValue = (value: Value) => {
        props.onChange(props.name, toggleValue(props.values, value))
    }
    
    return (
        <Field
            label={props.label}
            state={props.state}
            input={
                <div
                    tabIndex={0}
                    onBlur={closeList}
                    onClick={openList}
                    className="flex flex-col gap-y-1 w-full relative"
                >
                    {!open &&
                        <Toggle
                            open={open}
                            style={props.values.length ? "pl-1" : ""}
                            multiple={true}
                            label={(  
                                <Log
                                    values={props.values}
                                    valueToLabel={valueToLabel}
                                    deleteValue={selectValue}
                                    defaultLabel={props.toggleLabel}
                                />
                            )}
                        />
                    }
                    {open &&
                        <Fragment>  
                            <TextField
                                name="search"
                                value={search}
                                placeholder="Search"
                                onChange={(name: string, value: Value) => setSearch(value)}
                            />
                            <List
                                values={props.values}
                                options={matched}
                                multiple={true}
                                selectValue={selectValue}
                            />
                        </Fragment>
                    }
                </div>
            }
        />
    )
}
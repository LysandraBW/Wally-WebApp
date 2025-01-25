import List from "@/component/Form/Select/List";
import Log from "@/component/Form/Select/Log";
import Toggle from "@/component/Form/Select/Toggle";
import { useEffect, useState } from "react";
import Back from "./Back";
import InlineText from "@/component/Form/Text/InlineText";
import ListWrapper from "@/component/Form/Select/List/ListWrapper";
import ListElement from "@/component/Form/Select/List/ListElement";
import clsx from "clsx";
import Checkbox from "@/component/Form/Checkbox/Checkbox";
import { ReadWriteArrayInputProps } from "@/features/Form/DEF";
import { OptionMap, Options, Value } from "@/features/Form/DEF";
import getValuesToLabels from "@/features/Form/helpers/getValuesToLabels";
import searchLabels from "@/features/Form/helpers/searchLabels";
import toggleValue from "@/features/Form/helpers/toggleValue";
import { Field } from "@/component/Form/Field";

interface SearchSortedProps extends Omit<ReadWriteArrayInputProps, "options"> {
    options: {[serviceClass: string]: Options};
}

export default function SearchServices(props: SearchSortedProps) {
    const [tab, setTab] = useState("");
    const [tabs, setTabs] = useState(Object.keys(props.options));
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [matched, setMatched] = useState<Options>([]);
    const [valueToLabel, setValueToLabel] = useState<OptionMap>({});

    useEffect(() => {
        setTabs(Object.keys(props.options));
        setValueToLabel(getValuesToLabels(Object.values(props.options).flat()));
    }, [props.options]);

    useEffect(() => {
        if (!tab)
            return;
        const matched = searchLabels(search, props.options[tab]);
        setMatched(matched);
    }, [tab, search]);

    const selectValue = (value: Value) => {
        props.onChange(props.name, toggleValue(props.values, value));
    }

    const openList = () => {
        setOpen(true);
    }

    const closeList = (event: any): void => {
        if (event.currentTarget.contains(event.relatedTarget))
            return;
        setTab("");
        setSearch("");
        setOpen(false);
    }
    
    return (
        <Field
            label={"Select Services"}
            state={props.state}
            input={
                <div
                    tabIndex={0}
                    onBlur={closeList}
                    onClick={openList}
                >
                    <Toggle
                        open={open}
                        multiple={true}
                        style={props.values.length ? "pl-1" : ""}
                        label={(
                            <Log
                                values={props.values}
                                valueToLabel={valueToLabel}
                                deleteValue={selectValue}
                                defaultLabel={"Select Services"}
                            />
                        )}
                    />
                    {open && !tab &&
                        <div className="relative">
                            <List
                                values={[tab]}
                                multiple={false}
                                options={tabs.map(t => [t, t])}
                                selectValue={(value: Value) => setTab(value)}
                            />
                        </div>
                    }
                    {open && tab &&
                        <div className="relative">
                            <ListWrapper>
                                <li><Back goBack={() => setTab("")}/></li>
                                <li className="border-b">
                                    <InlineText
                                        name=""
                                        value={search}
                                        onChange={(name: string, value: Value) => setSearch(value)}
                                        placeholder={`Search ${tab}`}
                                    />
                                </li>
                                {matched.map(([value, label], i) => (
                                    <li
                                        key={i}
                                        onClick={() => selectValue(value)}
                                    >
                                        <ListElement
                                            multiple={true}
                                        >
                                            <Checkbox
                                                name=""
                                                value={value}
                                                checked={props.values.includes(value)}
                                                onChange={() => selectValue(value)}
                                            />
                                            <p className={clsx(props.values.includes(value) && "font-medium text-gray-950")}>{label}</p>
                                        </ListElement>
                                    </li>
                                ))}
                            </ListWrapper>
                        </div>
                    }
                </div>
            }
        />
    )
}
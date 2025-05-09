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
import ExpandIcon from "@/component/Icon/Expand";

interface SearchSortedProps extends Omit<ReadWriteArrayInputProps, "options"> {
    options: {[serviceClass: string]: Options};
}

export default function SearchServicesSimple(props: SearchSortedProps) {
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
    
    return (
        <Field
            label={"Select Services"}
            state={props.state}
            input={
                <div
                    tabIndex={0}
                    onBlur={(e) => {
                        if (e.currentTarget.contains(e.relatedTarget))
                            return;
                        setOpen(false);
                        setTab("");
                        setSearch("");
                    }}
                    className="h-10 overflow-x-clip"
                >
                    <div 
                        className={clsx(
                            "field grid grid-cols-[95%_5%] min-h-10 w-full",
                            "gap-1 justify-between items-center p-1 pr-2",
                            props.values.length ? "pl-1" : ""
                        )}
                        onClick={() => setOpen(true)}
                    >
                        <Log
                            values={props.values}
                            valueToLabel={valueToLabel}
                            deleteValue={selectValue}
                            defaultLabel={"Select Services"}
                        />
                        <div className="flex justify-center items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="black" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                            </svg>
                        </div>
                    </div>
                    {open && tab === "" &&
                        <div
                            className="px-0 relative top-[calc(0.25rem)] field bg-white max-h-[200px] overflow-y-scroll w-full scroll-hide"
                        >
                            {tabs.map((t, i) => (
                                <div 
                                    key={i} 
                                    onClick={() => setTab(t)}
                                    className={clsx(
                                        "px-3 py-1.5 flex justify-between items-center gap-2",
                                        "!justify-normal",
                                        "hover:bg-gray-100 hover:cursor-pointer",
                                    )}
                                >
                                        {t}
                                </div>
                            ))}
                        </div>
                    }
                    {open && tab !== "" &&
                        <div
                            className="px-0 relative top-[calc(0.25rem)] field bg-white max-h-[200px] overflow-y-scroll w-full"
                        >
                            <div onClick={() => setTab("")}>
                                <Back/>
                            </div>
                            <div className="border-b">
                                <input
                                    name={props.name}
                                    value={search}
                                    onChange={(e: any) => setSearch(e.target.value)}
                                    placeholder={`Search ${tab}`}
                                    className={clsx(
                                        "field !shadow-none !rounded-none",
                                        "!border-none !outline-none"
                                    )}
                                />
                            </div>
                            {matched.map((m, i) => (
                                <div 
                                    key={i} 
                                    onClick={() => selectValue(m[0])}
                                    className={clsx(
                                        "px-3 py-1.5 flex justify-between items-center gap-2",
                                        "!justify-normal",
                                        "hover:bg-gray-100 hover:cursor-pointer",
                                    )}
                                >
                                    <Checkbox
                                        name=""
                                        value={m[0]}
                                        checked={props.values.includes(m[0])}
                                        onChange={() => selectValue(m[0])}
                                    />
                                    {m[1]}
                                </div>
                            ))}
                        </div>
                    }
                </div>
            }
        />
    )
}
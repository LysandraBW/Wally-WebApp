import { useEffect, useState } from "react";
import clsx from "clsx";
import Checkbox from "@/component/Form/Checkbox/Checkbox";
import { ReadWriteArrayInputProps } from "@/features/Form/DEF";
import { OptionMap, Options, Value } from "@/features/Form/DEF";
import getValuesToLabels from "@/features/Form/helpers/getValuesToLabels";
import searchLabels from "@/features/Form/helpers/searchLabels";
import toggleValue from "@/features/Form/helpers/toggleValue";
import { Field } from "@/component/Form/Field";
import CrossIcon from "@/component/Icon/Icons/XMarkIcon";
import ArrowLeft from "@/component/Icon/Icons/ArrowRightIcon";
import ChevronDownIcon from "@/component/Icon/Icons/ChevronDownIcon";

interface SearchServicesProps extends Omit<ReadWriteArrayInputProps, "options"> {
    options: {[serviceClass: string]: Options};
}

export default function SearchServices(props: SearchServicesProps) {
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
                <div className="flex flex-col gap-2">
                    <div
                        tabIndex={0}
                        onBlur={(e) => {
                            if (e.currentTarget.contains(e.relatedTarget))
                                return;
                            setTab("");
                            setSearch("");
                            setOpen(false);
                        }}
                        className="h-10 overflow-x-clip"
                    >
                        {/* Dropdown Box */}
                        <div 
                            onClick={() => setOpen(true)}
                            className="field grid grid-cols-[95%_5%] w-full h-full gap-1 justify-between items-center"
                        >
                            <label className="text-[0.85rem]">Click to View Services</label>
                            <div className="flex justify-center items-center cursor-pointer rounded hover:bg-gray-50">
                                <ChevronDownIcon/>
                            </div>
                        </div>
                        {/* Service Type */}
                        {open && tab === "" &&
                            <div
                                className="px-0 relative z-10 top-[calc(0.25rem)] field h-auto bg-white overflow-auto w-full shadow-lg"
                            >
                                {tabs.map((t, i) => (
                                    <div 
                                        key={i} 
                                        onClick={() => setTab(t)}
                                        className={clsx(
                                            "px-3 py-1.5 flex justify-normal items-center gap-2",
                                            "hover:bg-gray-100 hover:cursor-pointer text-[0.85rem]",
                                        )}
                                    >
                                        {t}
                                    </div>
                                ))}
                            </div>
                        }
                        {/* Services for Type */}
                        {open && tab !== "" &&
                            <div className="pb-4 relative z-10">
                                <div className="px-0 relative top-[calc(0.25rem)] field bg-white !h-auto w-full">
                                    {/* Back Button */}
                                    <div 
                                        className="mx-2 mb-2 icon"
                                        onClick={() => setTab("")}
                                    >
                                        <ArrowLeft
                                            width="12"
                                            height="12"
                                            strokeWidth="1"
                                            cursor="pointer"
                                        />
                                    </div>
                                    {/* Search */}
                                    <div className="border-y border-y-gray-200">
                                        <input
                                            name={props.name}
                                            value={search}
                                            onChange={(e: any) => setSearch(e.target.value)}
                                            placeholder={`Search ${tab}`}
                                            className={clsx(
                                                "field !shadow-none !rounded-none",
                                                "!border-none !ring-0 !outline-none"
                                            )}
                                        />
                                    </div>
                                    {/* List */}
                                    <div className="overflow-auto max-h-[200px]">
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
                                </div>
                            </div>
                        }
                    </div>
                    {/* Show User Selection */}
                    {props.values.length !== 0 &&
                        <div className="rounded-md bg-gray-100 p-2 w-full">
                            {props.values.length !== 0 &&
                                <ul className="w-full flex flex-wrap gap-1">
                                    {props.values.map((value, i) => (
                                        <li
                                            key={i}
                                            onClick={(e) => selectValue(value)}
                                            className="field h-min flex justify-between items-center gap-1 py-1.5 pr-1 pl-2 bg-white shadow-sm whitespace-nowrap hover:bg-gray-100 cursor-pointer w-min"
                                        >
                                            <span className="block leading-[0.5rem] text-xs text-gray-600 tracking-wider">{valueToLabel[value]}</span>
                                            <CrossIcon
                                                top="0.05px"
                                                width="13"
                                                height="13"
                                                fill="#9CA3AF"
                                                color="#9CA3AF"
                                                stroke="#9CA3AF"
                                                strokeWidth="0.5"
                                                cursor="pointer"
                                            />
                                        </li>
                                    ))}
                                </ul>
                            }
                        </div>
                    }
                </div>
            }
        />
    )
}
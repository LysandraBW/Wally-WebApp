import { Fragment, useEffect, useState } from "react";
import clsx from "clsx";
import { ReadWriteArrayInputProps } from "@/features/Form/DEF";
import { OptionMap, Options, Value } from "@/features/Form/DEF";
import getValuesToLabels from "@/features/Form/helpers/getValuesToLabels";
import searchLabels from "@/features/Form/helpers/searchLabels";
import toggleValue from "@/features/Form/helpers/toggleValue";
import { Field } from "@/component/Form/Field";
import Toggle from "@/component/Form/Select/Toggle";
import Wrapper from "@/component/Form/Select/Wrapper";
import Element from "@/component/Form/Select/Element";
import ArrowLongLeftIcon from "@/component/Icons/Icons/ArrowLongLeftIcon";
import IconButton from "@/component/Button/IconButton";
import XMarkIcon from "@/component/Icons/Icons/XMarkIcon";


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
        if (!tab) {
            return;
        }
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
                        className="relative"
                    >
                        <Toggle
                            onClick={() => setOpen(true)}
                            label="Click to View Services"
                        />
                        {open &&
                            <>
                                {tab === "" &&
                                     <Wrapper>
                                        {tabs.map((t, i) => (
                                            <Fragment key={i}>
                                                <Element
                                                    label={t}
                                                    selectValue={() => setTab(t)}
                                                    checked={props.values.includes(t)}
                                                />
                                            </Fragment>
                                        ))}
                                    </Wrapper>
                                }
                                {tab !== "" &&
                                    <Wrapper>
                                        <div className="m-1">
                                            <IconButton
                                                size={16}
                                                roundedLess={true}
                                                className="rounded-[2px]"
                                                onClick={() => setTab("")}
                                            >
                                                <ArrowLongLeftIcon
                                                    className="w-[14px] h-[14px] stroke-inherit stroke-[1.5px] cursor-pointer"
                                                />
                                            </IconButton>
                                        </div>
                                        <div className="border-y border-y-base-300 dark:border-y-base-200">
                                            <input
                                                name={props.name}
                                                value={search}
                                                onChange={(e: any) => setSearch(e.target.value)}
                                                placeholder={`Search ${tab}`}
                                                className="w-full !py-2 field-background field-hover field-text field-padding outline-none"
                                            />
                                        </div>
                                        {matched.map((m, i) => (
                                            <Fragment key={m[0]}>
                                                <Element
                                                    label={m[1]}
                                                    selectValue={() => selectValue(m[0])}
                                                    checked={props.values.includes(m[0])}
                                                    obvious={true}
                                                />
                                            </Fragment>
                                        ))}
                                    </Wrapper>
                                }
                            </>
                        }
                    </div>
                    {/* Show User Selection */}
                    {props.values.length !== 0 &&
                        <div 
                            className={clsx(
                                "w-full p-1",
                                "bg-base-0 border border-base-300",
                                "dark:bg-base-50 dark:border-base-200",
                                "rounded-md"
                            )}
                        >
                            {props.values.length !== 0 &&
                                <ul className="w-full flex flex-wrap gap-1">
                                    {props.values.map((value, i) => (
                                        <li
                                            key={i}
                                            onClick={(e) => selectValue(value)}
                                            className={clsx(
                                                "px-2 py-1",
                                                "flex items-center gap-1",
                                                "surface-background field-border surface-background-hover rounded-full shadow-sm",
                                                "cursor-pointer"
                                            )}
                                        >
                                            <span className="block text-xs text-base-700 tracking-wide">
                                                {valueToLabel[value]}
                                            </span>
                                            <XMarkIcon
                                                className="size-2 stroke-[3px] stroke-base-500 dark:stroke-base-400"
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
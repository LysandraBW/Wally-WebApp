import { useEffect, useState } from "react"
import useServiceManager from "./useServiceManager";
import searchLabels from "@/features/Form/helpers/searchLabels";
import { Options, Value } from "@/features/Form/DEF";
import Toggle from "@/component/Form/Select/Toggle";
import List from "@/component/Form/Select/List";
import Back from "@/pages/customer/schedule/Back";
import ListWrapper from "@/component/Form/Select/List/ListWrapper";
import ListElement from "@/component/Form/Select/List/ListElement";
import InlineText from "@/component/Form/Text/InlineText";
import { Field } from "@/component/Form/Field";
import Button from "@/component/Form/Button/Button";
import ChevronRight from "@/component/Icon/ChevonRight";
import clsx from "clsx";
import CheckIcon from "@/component/Icon/Check";
import PlusIcon from "@/component/Icon/Plus";
import CheckSmallIcon from "@/component/Icon/CheckSmall";

interface AddHelperProps {
    serviceManager: ReturnType<typeof useServiceManager>;
}

export default function AddHelper(props: AddHelperProps) {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [matched, setMatched] = useState<Options>([]);
    
    useEffect(() => {
        const matched = searchLabels(search, props.serviceManager.values);
        setMatched(matched);
    }, [search, props.serviceManager.values]);

    const openList = () => {
        setOpen(true);
    }

    const closeList = (event: any): void => {
        if (event.currentTarget.contains(event.relatedTarget))
            return;
        props.serviceManager.selectUpperDivision("");
        props.serviceManager.selectLowerDivision("");
        setSearch("");
        setOpen(false);
    }

    return (
        <Field
            input={
                <div
                    tabIndex={0}
                    onBlur={closeList}
                    onClick={openList}
                    className="w-full max-w-[50%]"
                >
                    <Toggle
                        open={open}
                        multiple={true}
                        label={<span className="block mx-2 my-1">Select Services</span>}
                    />
                    {/* Select Upper Division */}
                    {open && !props.serviceManager.upperDivision &&
                        <div className="relative">
                            <List
                                values={[]}
                                multiple={false}
                                options={props.serviceManager.upperDivisions.map(t => [t, t])}
                                selectValue={(value: Value) => props.serviceManager.selectUpperDivision(value)}
                            />
                        </div>
                    }
                    {/* Select Lower Division */}
                    {open && props.serviceManager.upperDivision && !props.serviceManager.lowerDivision &&
                        <div className="relative z-[90]">
                            <ListWrapper>
                                <li><Back goBack={() => props.serviceManager.selectUpperDivision("")}/></li>
                                <li className="border-b p-1"><span>{props.serviceManager.upperDivision}</span></li>
                                {props.serviceManager.lowerDivisions.map((d, i) => (
                                    <li
                                        key={i}
                                        onClick={() => props.serviceManager.selectLowerDivision(d)}
                                    >
                                        <ListElement
                                            multiple={false}
                                        >
                                            <p>{d}</p>
                                        </ListElement>
                                    </li>
                                ))}
                            </ListWrapper>
                        </div>
                    }
                    {/* Select Services, Given Upper & Lower Division */}
                    {open && props.serviceManager.upperDivision && props.serviceManager.lowerDivision &&
                        <div className="relative z-[90]">
                            <ListWrapper>
                                {/* Back Button */}
                                <li>
                                    <Back 
                                        goBack={() => {
                                            props.serviceManager.selectLowerDivision("");
                                        }}
                                    />
                                </li>
                                {/* Showing Selected Upper & Lower Division */}
                                <li className="border-b p-1 flex gap-1 items-center">
                                    <span>
                                        {props.serviceManager.upperDivision}
                                    </span>
                                    <ChevronRight
                                        width="10"
                                        height="10"
                                        fill="#9CA3AF"
                                        stroke="#9CA3AF"
                                        strokeWidth="0.5"
                                    />
                                    <span className="capitalize">{props.serviceManager.lowerDivision}</span>
                                </li>
                                {/* Search Bar */}
                                <li className="border-b">
                                    <InlineText
                                        name=""
                                        value={search}
                                        onChange={(name: string, value: Value) => {
                                            setSearch(value);
                                        }}
                                        placeholder={`Search ${props.serviceManager.upperDivision}, ${props.serviceManager.lowerDivision}`}
                                    />
                                </li>
                                {/* Matched Values */}
                                {matched.map(([value, label], i) => (
                                    <li key={i}>
                                        <div 
                                            className={clsx(
                                                "flex justify-between items-center gap-2",
                                                "px-3 py-1.5"
                                            )}
                                        >
                                            <p className="whitespace-nowrap">{label}</p>
                                            {props.serviceManager.value.includes(value) ?
                                                // Already Selected
                                                <div className="bg-lime-200 p-0.5 rounded">
                                                    <CheckSmallIcon
                                                        width="18"
                                                        height="18"
                                                        fill="#84cc16"
                                                        stroke="#84cc16"
                                                        strokeWidth="0.25"
                                                    />
                                                </div>
                                                :
                                                // Not Selected
                                                <div 
                                                    onClick={() => props.serviceManager.addDefinedService(value)}
                                                    className={clsx(
                                                        "bg-gray-100 hover:bg-gray-200",
                                                        "p-0.5 rounded cursor-pointer"
                                                    )}
                                                >
                                                    <PlusIcon
                                                        width="18"
                                                        height="18"
                                                        fill="#94a3b8"
                                                        stroke="#94a3b8"
                                                        strokeWidth="0.5"
                                                        cursor="pointer"
                                                    />
                                                </div>
                                            }
                                        </div>
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
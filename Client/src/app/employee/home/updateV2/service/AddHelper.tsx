import { useContext, useEffect, useState } from "react";
import searchLabels from "@/features/Form/helpers/searchLabels";
import { Options } from "@/features/Form/DEF";
import Back from "@/pages/customer/schedule/Back";
import { Field } from "@/component/Form/Field";
import clsx from "clsx";
import useServicesManager from "./useServicesManager";

interface AddHelperProps {
    servicesManager: ReturnType<typeof useServicesManager>;
}

export default function AddHelper(props: AddHelperProps) {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [matched, setMatched] = useState<Options>([]);
    // const updateManagerContext = useContext(UpdateManagerContext);
    
    useEffect(() => {
        const matched = searchLabels(search, props.servicesManager.values);
        setMatched(matched);
    }, [search, props.servicesManager.values]);

    const openList = () => {
        setOpen(true);
    }

    const closeList = (event: any): void => {
        if (event.currentTarget.contains(event.relatedTarget))
            return;
        props.servicesManager.selectUpperDivision("");
        props.servicesManager.selectLowerDivision("");
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
                    className="w-full relative"
                >
                    <button 
                        className={clsx(
                            "w-full",
                            "p-4 py-2 bg-white rounded-md",
                            "border border-gray-300 hover:stroke-black hover:stroke-black stroke-gray-400 fill-gray-400 hover:text-black",
                            "hover:border hover:bg-gray-50",
                            "fill-gray-300 stroke-gray-300",
                            "shadow-sm flex items-center justify-center gap-2 overflow-hidden",
                            open && "rounded-none !rounded-t-md"
                        )}
                        onClick={() => setOpen(!open)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.75" stroke="currentColor" className="stroke-inherit size-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 0 0 2.25-2.25V6a2.25 2.25 0 0 0-2.25-2.25H6A2.25 2.25 0 0 0 3.75 6v2.25A2.25 2.25 0 0 0 6 10.5Zm0 9.75h2.25A2.25 2.25 0 0 0 10.5 18v-2.25a2.25 2.25 0 0 0-2.25-2.25H6a2.25 2.25 0 0 0-2.25 2.25V18A2.25 2.25 0 0 0 6 20.25Zm9.75-9.75H18a2.25 2.25 0 0 0 2.25-2.25V6A2.25 2.25 0 0 0 18 3.75h-2.25A2.25 2.25 0 0 0 13.5 6v2.25a2.25 2.25 0 0 0 2.25 2.25Z" />
                        </svg>

                    </button>
                    {/* Select Upper Division */}
                    {(open && !props.servicesManager.upperDivision) &&
                        <ul className="relative rounded-b-md bg-white border border-gray-300 border-t-0 px-0 w-full">
                            <li>
                                <div className={clsx("px-3 py-1.5 flex justify-between items-center gap-2 bg-gray-50 border-b border-b-gray-300",)}>
                                    <span className={clsx("text-gray-400 text-03 tracking-wide")}>Select Upper Division</span>
                                </div>
                            </li>
                            {props.servicesManager.upperDivisions.map(t => [t, t]).map(([value, label, node], i) => (
                                <li
                                    key={i}
                                    onClick={(event) => {
                                        event.stopPropagation();
                                        props.servicesManager.selectUpperDivision(value);
                                    }}
                                    className="last:rounded-b"
                                >
                                    <div className={clsx("last:rounded-b px-3 py-1.5 flex justify-between items-center gap-2 hover:bg-gray-100 hover:cursor-pointer",)}>
                                        <span className={clsx("text-gray-600 text-03 tracking-wide")}>{label}</span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    }
                    {/* Select Lower Division */}
                    {(open && props.servicesManager.upperDivision && !props.servicesManager.lowerDivision) &&
                        <div className="relative  z-[90] w-full">
                            <ul className="rounded-b-md bg-white border border-gray-300 border-t-0 px-0 w-full">
                                <li className="bg-gray-50 border-b border-b-gray-300 px-2 py-1.5">
                                    <div className={clsx("bg-white p-1 w-min cursor-pointer rounded border border-gray-300 shadow-sm hover:bg-gray-50")}>
                                        <div onClick={() => props.servicesManager.selectUpperDivision("")}>
                                            <Back/>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className={clsx("px-2 py-1.5 flex justify-between items-center gap-2 bg-gray-50 border-b border-b-gray-300",)}>
                                        <span className={clsx("text-gray-400 text-03 tracking-wide")}>Select Lower Division</span>
                                    </div>
                                </li>
                                {props.servicesManager.lowerDivisions.map(t => [t, t]).map(([value, label, node], i) => (
                                    <li
                                        key={i}
                                        onClick={(event) => {
                                            event.stopPropagation();
                                            props.servicesManager.selectLowerDivision(value);
                                        }}
                                        className="last:!rounded-b px-2 py-1.5 flex justify-between items-center gap-2 hover:bg-gray-100 hover:cursor-pointer"
                                    >
                                        <span className={clsx("text-gray-600 text-03 tracking-wide")}>{label}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    }
                    {/* Select Services, Given Upper & Lower Division */}
                    {(open && props.servicesManager.upperDivision && props.servicesManager.lowerDivision) &&
                        <div className="relative  z-[90] w-full">
                            <ul className="rounded-b-md bg-white border border-gray-300 border-t-0 px-0 w-full">
                                <li className="bg-gray-50 border-b border-b-gray-300 px-2 py-1.5">
                                    <div className={clsx("bg-white p-1 w-min rounded border border-gray-300 shadow-sm hover:bg-gray-50")}>
                                        <div onClick={() => props.servicesManager.selectUpperDivision("")}>
                                            <Back/>
                                        </div>
                                    </div>
                                </li>
                                {/* Showing Selected Upper & Lower Division */}
                                <li className="px-2 py-1.5 flex gap-1 items-center">
                                    <span className="capitalize text-xs tracking-wide">
                                        {props.servicesManager.upperDivision || "NONE"}
                                    </span>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.75" stroke="currentColor" className="size-3">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                    </svg>
                                    <span className="capitalize text-xs tracking-wide">{props.servicesManager.lowerDivision || "NONE"}</span>
                                </li>
                                {/* Search Bar */}
                                <li className="">
                                   <input
                                        name=""
                                        className="border-y border-y-gray-300 px-2 py-1.5 text-03 tracking-wide text-gray-400 w-full focus:outline-none focus:bg-blue-100 focus:text-black"
                                        value={search}
                                        onChange={(event) => {
                                            if (!event)
                                                return;
                                            setSearch(event.target.value);
                                        }}
                                        placeholder={`Search ${props.servicesManager.upperDivision || "NONE"}, ${props.servicesManager.lowerDivision || "NONE"}`}
                                    />
                                </li>
                                {/* Matched Values */}
                                {matched.map(([value, label], i) => (
                                    <li key={i}>
                                        <div 
                                            className={clsx(
                                                "flex justify-between items-center gap-2",
                                                "px-2 py-1.5 border-b border-b-gray-300 last:border-b-0 hover:bg-gray-50 last:!rounded-b"
                                            )}
                                        >
                                            <p className="whitespace-nowrap text-gray-600 text-03 tracking-wide">{label}</p>
                                            {props.servicesManager.value.includes(value) ?
                                                // Already Selected
                                                <div 
                                                    className={clsx(
                                                        "bg-white border border-gray-300 shadow-sm",
                                                        "p-0.5 rounded stroke-blue-500"
                                                    )}    
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.25" stroke="currentColor" className="stroke-inherit h-[14px] w-[14px]">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                                    </svg>
                                                </div>
                                                :
                                                // Not Selected
                                                <div 
                                                    onClick={() => {
                                                        props.servicesManager.addDefinedService(value);
                                                        // updateManagerContext.setChangesMade(props.servicesManager.defineItem.itemName, true);
                                                    }}
                                                    className={clsx(
                                                        "bg-white border border-gray-300 shadow-sm hover:bg-gray-50",
                                                        "p-0.5 rounded cursor-pointer stroke-gray-400 hover:stroke-black"
                                                    )}
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.25" stroke="currentColor" className="cursor-pointer stroke-inherit h-[14px] w-[14px]">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                                    </svg>
                                                </div>
                                            }
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    }
                </div>
            }
        />
    )
}
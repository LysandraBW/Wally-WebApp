import { Fragment, useEffect, useState } from "react";
import searchLabels from "@/features/Form/helpers/searchLabels";
import { Options } from "@/features/Form/DEF";
import { Field } from "@/component/Form/Field";
import clsx from "clsx";
import useServicesManager from "./useServicesManager";
import Plus from "@/component/Icons/Icons/PlusIcon";
import SquaresPlusIcon from "@/component/Icons/Icons/SquaresPlusIcon";
import CheckIcon from "@/component/Icons/Icons/CheckIcon";
import Wrapper from "@/component/Form/Select/Wrapper";
import Element from "@/component/Form/Select/Element";
import PrimaryButton from "@/component/Button/PrimaryButton";
import IconButton from "@/component/Button/IconButton";
import ArrowLongLeftIcon from "@/component/Icons/Icons/ArrowLongLeftIcon";
import Back from "./Back";
import PlusIcon from "@/component/Icons/Icons/PlusIcon";

interface AddHelperProps {
    servicesManager: ReturnType<typeof useServicesManager>;
}

export default function AddHelper(props: AddHelperProps) {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [matched, setMatched] = useState<Options>([]);
    

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


    const clickUpperDivision = (event: any, division: string): void => {
        event.stopPropagation();
        props.servicesManager.selectUpperDivision(division);
    }


    const clickLowerDivision = (event: any, division: string): void => {
        event.stopPropagation();
        props.servicesManager.selectLowerDivision(division);
    }


    return (
        <div
            tabIndex={0}
            onBlur={closeList}
            onClick={openList}
            className="w-full relative"
        >
            {/* Toggle Button */}
            <button
                className={clsx(
                    "w-full h-full",
                    "flex justify-center items-center",
                    "stroke-base-400 bg-base-100 dark:bg-base-50 entry-border-t rounded-none",
                    "hover:bg-base-0 dark:hover:bg-base-0 hover:stroke-base-700"
                )}
            >
                <SquaresPlusIcon
                    className="size-6 stroke-inherit"
                />
            </button>
            {open &&
                <>
                    {!props.servicesManager.upperDivision &&
                        <Wrapper>
                            <div className="bg-base-0 dark:bg-base-50 px-2 py-1 text-base-400 text-xs tracking-wide border-b border-base-300 dark:border-base-200 rounded-t-md">
                                Select Upper Division
                            </div>
                            {props.servicesManager.upperDivisions.map((division, i) => (
                                <Fragment key={i}>
                                    <Element
                                        label={division}
                                        selectValue={(event) => clickUpperDivision(event, division)}
                                        checked={false}
                                        smallText={true}
                                    />
                                </Fragment>
                            ))}
                        </Wrapper>
                    }
                    {props.servicesManager.upperDivision &&
                        <>
                            {!props.servicesManager.lowerDivision &&
                                <Wrapper>
                                    <Back
                                        onClick={() => props.servicesManager.selectUpperDivision("")}
                                    />
                                    <div className="bg-base-0 dark:bg-base-50 px-2 py-1 text-base-500 font-medium text-xs tracking-wide border-t border-base-300 dark:border-base-200">
                                        {props.servicesManager.upperDivision}
                                    </div>
                                    <div className="bg-base-0 dark:bg-base-50 px-2 py-1 text-base-400 text-xs tracking-wide border-y border-base-300 dark:border-base-200">
                                        Select Lower Division
                                    </div>
                                    {props.servicesManager.lowerDivisions.map((division, i) => (
                                        <Fragment key={i}>
                                            <Element
                                                label={division}
                                                selectValue={(event) => clickLowerDivision(event, division)}
                                                checked={false}
                                                smallText={true}
                                            />
                                        </Fragment>
                                    ))}
                                </Wrapper>
                            }
                            {props.servicesManager.lowerDivision &&
                                <Wrapper>
                                    <Back
                                        onClick={() => props.servicesManager.selectLowerDivision("")}
                                    />
                                    <div className="bg-base-0 dark:bg-base-50 px-2 py-1 text-base-500 font-medium text-xs tracking-wide border-t border-base-300 dark:border-base-200">
                                        {props.servicesManager.upperDivision}, {props.servicesManager.lowerDivision}
                                    </div>
                                    <input
                                        name="EasyAddSearch"
                                        value={search}
                                        onChange={(event) => setSearch(event.target.value)}
                                        placeholder={`Search ${props.servicesManager.lowerDivision}`}
                                        className={clsx(
                                            "w-full px-2 py-1.5",
                                            "text-xs tracking-wide text-base-500",
                                            "bg-base-0 dark:bg-base-50",
                                            "border-y border-base-300 dark:border-base-200",
                                            "focus:outline-none focus:bg-blue-100 focus:text-black"
                                        )}
                                    />
                                    {matched.map(([value, label], i) => (
                                        <Fragment key={i}>
                                            <Element
                                                label={label}
                                                selectValue={(event) => props.servicesManager.addDefinedService(value)}
                                                checked={props.servicesManager.value.includes(value)}
                                                CheckedIcon={
                                                    <IconButton
                                                        size={10}
                                                        onClick={() => null}
                                                        className="!shadow-none rounded-[4px]"
                                                    >
                                                        <CheckIcon 
                                                            className="stroke-blue-500 size-3 stroke-[2.5px]"
                                                        />
                                                    </IconButton>
                                                }
                                                NotCheckedIcon={
                                                    <IconButton
                                                        size={10}
                                                        onClick={() => null}
                                                        className="!shadow-none rounded-[4px]"
                                                    >
                                                        <PlusIcon 
                                                            className="stroke-inherit size-3 stroke-[2.5px]"
                                                        />
                                                    </IconButton>
                                                }
                                                smallText={true}
                                            />
                                        </Fragment>
                                    ))}
                                </Wrapper>
                            }
                        </>
                    }
                </>
            }
        </div>
    )
}
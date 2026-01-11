import { useState } from "react";
import { Event } from "./_DEF";
import { formatTime } from "@/utils/convert";
import { OptionMap } from "@/features/Form/DEF";
import UserIcon from "@/component/Icons/Icons/UserIcon";
import { Tooltip } from "react-tooltip";
import EllipsisVerticalIcon from "@/component/Icons/Icons/EllipsisVerticalIcon";
import PencilSquareIcon from "@/component/Icons/Icons/PencilSquareIcon";
import TrashIcon from "@/component/Icons/Icons/TrashIcon";
import EyeIcon from "@/component/Icons/Icons/EyeIcon";
import { navigateToPage } from "@/utils/navigate";
import { PAGE_EDIT_APPOINTMENT, PAGE_VIEW_APPOINTMENT } from "@/utils/constants";

export default function EventItem(props: {item: Event; idToName: OptionMap; i: number; onUpdate: () => void; onDelete: () => void;}) {
    const [showOptions, setShowOptions] = useState(false);
    
    return (
        <div
            className="surface-background border-y border-base-300 dark:border-base-200 shadow"
        >
            <div className="p-2 py-3 flex flex-col gap-y-1">
                <div className="flex justify-between items-start">
                    <div className="flex flex-col">
                        <span className="block text-base-400 text-[0.6rem] font-medium">
                            {formatTime(props.item.Date)}
                        </span>
                        <span className="block text-xs tracking-wide text-base-700 font-medium">
                            {props.item.Name}
                        </span>
                    </div>
                    <div 
                        id={`ShowOption-${props.i}`}
                        tabIndex={0}
                        onClick={() => setShowOptions(!showOptions)}
                        onBlur={() => setShowOptions(false)}
                        className="p-[0.5px] cursor-pointer rounded-full hover:bg-base-50 dark:hover:bg-base-100"
                    >
                        <EllipsisVerticalIcon
                            className="size-3 stroke-base-400"
                        />
                    </div>
                    <Tooltip
                        isOpen={showOptions}
                        anchorSelect={`#ShowOption-${props.i}`}
                        clickable={true}
                        opacity={1}
                        place="left"
                        className="!bg-base-50 !border !border-base-300 dark:!border-base-200"
                        style={{
                            borderRadius: "6px",
                            boxShadow: "0px 2px 2px 0px #00000010",
                            padding: 0
                        }}
                    >
                        
                        {props.item.AppointmentID !== "" &&
                            <button 
                                onClick={() => navigateToPage(PAGE_VIEW_APPOINTMENT, {appointmentID: props.item.AppointmentID || ""})}
                                className="w-full rounded-none flex items-center gap-1 p-2 !cursor-pointer group"
                            >
                                <div className="flex items-center gap-1 group-hover:bg-blue-500/10 p-1 stroke-base-500 dark:stroke-base-400 text-base-500 dark:text-base-400 rounded-md group-hover:stroke-blue-500 group-hover:text-blue-500">
                                    <EyeIcon
                                        className="stroke-inherit size-3.5"
                                    />
                                    <span className="text-xs tracking-wide text-inherit">
                                        View
                                    </span>
                                </div>
                            </button>
                        }
                        <button 
                            onClick={() => {
                                if (props.item.AppointmentID === "")
                                    props.onUpdate();
                                else
                                    navigateToPage(PAGE_EDIT_APPOINTMENT, {appointmentID: props.item.AppointmentID || ""})
                            }}
                            className="w-full rounded-none p-2 !cursor-pointer group"
                        >
                            <div 
                                className="flex items-center gap-1 group-hover:bg-blue-500/10 p-1 stroke-base-500 dark:stroke-base-400 text-base-500 dark:text-base-400 rounded-md group-hover:stroke-blue-500 group-hover:text-blue-500"
                            >
                                <PencilSquareIcon
                                    className="stroke-inherit size-3.5"
                                />
                                <span className="text-xs tracking-wide text-inherit">
                                    Edit
                                </span>
                            </div>
                        </button>
                        {props.item.AppointmentID === "" &&
                            <button 
                                onClick={() => props.onDelete()}
                                className="w-full rounded-none flex items-center gap-1 p-2 !cursor-pointer group"
                            >
                                <div className="flex items-center gap-1 group-hover:bg-red-500/10 p-1 stroke-base-500 dark:stroke-base-400 text-base-500 dark:text-base-400 rounded-md group-hover:stroke-red-500 group-hover:text-red-500">
                                    <TrashIcon
                                        className="stroke-inherit size-3.5"
                                    />
                                    <span className="text-xs tracking-wide text-inherit">
                                        Delete
                                    </span>
                                </div>
                            </button>
                        }
                    </Tooltip> 
                </div>
                <p className="block text-xs text-base-500 dark:text-base-400 tracking-wide">
                    {props.item.Summary} 
                </p>
            </div>
            {props.item.Sharees.length !== 0 &&
                <div className="p-1 bg-base-0 dark:bg-base-50 border-t border-base-300 dark:border-base-200">
                    {
                        props.item.Sharees.map((sharee, i) => (
                            <div
                                key={i}
                                className="flex items-center gap-1 py-0 px-1 border border-blue-500 w-min bg-blue-500 rounded-sm shadow-sm"
                            >
                                {/* <UserIcon
                                    className="size-2 stroke-white stroke-[2px]"
                                /> */}
                                <span className="text-[0.6rem] tracking-wide text-white whitespace-nowrap">
                                    {props.idToName[sharee]}
                                </span>
                            </div>
                        ))
                    }
                </div>
            }
            {/* <UpdateItem
                canDelete={true}
                canEdit={true}
                onUpdate={() => props.onUpdate(itemID)}
                onDelete={() => props.onDelete(itemID)}
            >
                <Item
                    ID={toInteger(item.EventID)}
                    head={
                        <div className="flex flex-col">
                            <p className="bold small">{item.Name}</p>
                            <span className="color-4">{item.Summary}</span>
                        </div>
                    }
                    tags={[
                        [toDisplayDate(item.Date)],
                        [...item.Sharees.map((sharee, i) => (
                            <Fragment>
                                <Person
                                        
                                    />
                                    {idToName[sharee]}
                                    {item.EmployeeID === sharee && 
                                        <span className="text-blue-500 medium">
                                            Creator
                                        </span>
                                    }
                            </Fragment>
                        ))]
                    ]}
                />
            </UpdateItem> */}
        </div>
    )    
                    
}
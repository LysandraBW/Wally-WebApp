import { useState } from "react";
import { Event } from "./_DEF";
import { toDisplayTime } from "@/utils/convert";
import { OptionMap } from "@/features/Form/DEF";
import UserIcon from "@/component/Icons/Icons/UserIcon";
import { Tooltip } from "react-tooltip";
import EllipsisVerticalIcon from "@/component/Icons/Icons/EllipsisVerticalIcon";
import PencilSquareIcon from "@/component/Icons/Icons/PencilSquareIcon";
import TrashIcon from "@/component/Icons/Icons/TrashIcon";
import EyeIcon from "@/component/Icons/Icons/EyeIcon";
import { navigate } from "@/utils/navigate";
import { PAGE_EDIT_APPOINTMENT, PAGE_VIEW_APPOINTMENT } from "@/utils/constants";

export default function EventItem(props: {item: Event; idToName: OptionMap; i: number; onUpdate: () => void; onDelete: () => void;}) {
    const [showOptions, setShowOptions] = useState(false);
    
    return (
        <div
            className="surface-background border-b border-base-300 dark:border-base-200 shadow-xs"
        >
            <div className="p-2 flex flex-col gap-y-0.5">
                <div className="flex justify-between items-start">
                    <div className="flex flex-col">
                        <span className="block text-base-400 text-[0.6rem] font-medium">
                            {toDisplayTime(props.item.Date)}
                        </span>
                        <span className="block text-xs text-base-700 font-medium">
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
                                onClick={() => navigate(PAGE_VIEW_APPOINTMENT, {appointmentID: props.item.AppointmentID || ""})}
                                className="w-full rounded-none flex items-center gap-1 p-2 !cursor-pointer group"
                            >
                                <div className="flex items-center gap-1 group-hover:bg-blue-500/10 p-1 stroke-base-500 text-base-500 rounded-md group-hover:stroke-blue-500 group-hover:text-blue-500">
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
                                    navigate(PAGE_EDIT_APPOINTMENT, {appointmentID: props.item.AppointmentID || ""})
                            }}
                            className="w-full rounded-none p-2 !cursor-pointer group"
                        >
                            <div 
                                className="flex items-center gap-1 group-hover:bg-blue-500/10 p-1 stroke-base-500 text-base-500 rounded-md group-hover:stroke-blue-500 group-hover:text-blue-500"
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
                                <div className="flex items-center gap-1 group-hover:bg-red-500/10 p-1 stroke-base-500 text-base-500 rounded-md group-hover:stroke-red-500 group-hover:text-red-500">
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
                <p className="block text-xs text-base-500 tracking-wide">
                    {props.item.Summary} 
                </p>
            </div>
            {props.item.Sharees.length !== 0 &&
                <div className="p-2 border-t border-base-300 dark:border-base-200">
                    {
                        props.item.Sharees.map((sharee, i) => (
                            <div
                                key={i}
                                className="flex items-center gap-1 py-0 px-1 surface-border w-min bg-base-0 dark:bg-[#121214] rounded-[4px]"
                            >
                                <UserIcon
                                    className="size-2 stroke-base-500 stroke-[2px]"
                                />
                                <span className="text-[0.6rem] tracking-wide text-base-500 whitespace-nowrap">
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
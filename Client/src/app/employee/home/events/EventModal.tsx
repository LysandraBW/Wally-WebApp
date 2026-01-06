import { Event } from "./_DEF";
import CloseButton from "@/component/Button/CloseButton";
import { toDisplayDate } from "@/utils/convert";
import { useEffect, useState } from "react";
import { OptionMap } from "@/features/Form/DEF";
import getValuesToLabels from "@/features/Form/helpers/getValuesToLabels";
import Person from "@/component/Icons/Icons/UserIcon";
import EditButton from "./EditButton";
import DeleteButton from "@/features/ItemManager/components/DeleteButton";
import clsx from "clsx";
import GetEmployeeNamePairs from "@/services/DB/Employee/GetEmployeeNamePairs";
import { navigate } from "@/utils/navigate";
import { PAGE_EDIT_APPOINTMENT, PAGE_VIEW_APPOINTMENT } from "@/utils/constants";
import UserIcon from "@/component/Icons/Icons/UserIcon";
import SecondaryButton from "@/component/Button/SecondaryButton";
import IconButton from "@/component/Button/IconButton";
import DocumentIcon from "@/component/Icons/Icons/DocumentIcon";
import { PencilIcon } from "lucide-react";

interface EventModalProps {
    event: Event;
    onClose: (eventID: string) => void;
    onUpdate: (eventID: string) => void;
    onDelete: (eventID: string) => void;
}

export default function EventModal(props: EventModalProps) {
    const [idToName, setIDToName] = useState<OptionMap>({});

    useEffect(() => {
        const load = async () => {
            const employees = await GetEmployeeNamePairs();
            setIDToName(getValuesToLabels(employees));
        }
        load();
    }, []);
    
    return (
        <>
            {props.event &&
                <div className="bg-base-0 dark:bg-base-50">
                    <div className="dark:bg-[#121214] flex justify-between items-start py-4 px-2 border-b border-base-300 dark:border-base-200">
                        <h6 className="font-medium text-base-700 text-sm">
                            {props.event.AppointmentID === "" ? props.event.Name : "Appointment"}
                        </h6>
                    </div>
                    {props.event.AppointmentID === "" &&
                        <div 
                            className={clsx(
                                "flex items-center py-2 px-2 gap-2",
                                "border-b border-base-300 dark:border-base-200 bg-base-100 dark:bg-base-50"
                            )}
                        >
                            <EditButton
                                onUpdate={() => {
                                    props.onUpdate(props.event.EventID);
                                }}
                            />
                            <DeleteButton
                                onDelete={() => {
                                    props.onDelete(props.event.EventID);
                                }}
                            />
                        </div>
                    }
                    {props.event.AppointmentID !== "" &&
                        <div 
                            className={clsx(
                                "flex items-center py-2 px-2 gap-2",
                                "border-b border-base-300 dark:border-base-200 bg-base-100 dark:bg-base-50"
                            )}
                        >
                            <IconButton
                                size={14}
                                onClick={() => navigate(PAGE_VIEW_APPOINTMENT, {appointmentID: props.event.AppointmentID || ""})}
                                className="rounded-[5px] shadow-xs dark:shadow-md"
                            >
                                <DocumentIcon
                                    className="size-4 stroke-inherit"
                                />
                            </IconButton>
                            <IconButton
                                size={14}
                                onClick={() => navigate(PAGE_EDIT_APPOINTMENT, {appointmentID: props.event.AppointmentID || ""})}
                                className="rounded-[5px] shadow-xs dark:shadow-md"
                            >
                                <PencilIcon
                                    className="size-3 stroke-inherit"
                                />
                            </IconButton>
                        </div>
                    }
                    <div className="flex-col p-1 border-b border-base-300 dark:border-base-200 bg-base-100 dark:bg-base-50">
                        <div className="flex flex-col gap-0 p-1 px-2">
                            {props.event.AppointmentID !== "" &&
                                <span className="text-xs tracking-wide text-base-500">
                                    {props.event.AppointmentID}
                                </span>
                            }
                            {props.event.AppointmentID === "" &&
                                <span className="text-xs tracking-wide text-base-500">
                                    {parseInt(props.event.EventID) >= 0 ? `Event #${props.event.EventID}` : "New Event"}
                                </span>
                            }
                            <span className="text-xs tracking-wide text-base-500">
                                {toDisplayDate(props.event.Date, 'MMMM Do, YYYY [at] hh:mm A')}
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-col px-2 py-2 gap-y-0">
                        {/* <h6 className="font-medium text-base-700 text-xs">{props.event.Name}</h6> */}
                        <p className="text-xs tracking-wide text-base-500">{props.event.Summary}</p>
                    </div>
                    {props.event.Sharees.length !== 0 && 
                        <div className="overflow-scroll scroll-hide">
                            <div 
                                className="flex bg-base-100 dark:bg-base-50 py-2 px-2 border-t border-b border-b-dashed border-base-300 dark:border-base-200 items-center gap-2"
                                style={{
                                    borderBottomStyle: "dashed"
                                }}    
                            >
                                {props.event.Sharees.map((sharee, i) => (
                                    <div
                                        key={i}
                                        className="flex items-center gap-1 py-0 px-1 surface-border w-min bg-base-0 dark:bg-[#121214] rounded-[4px]"
                                    >
                                        <UserIcon
                                            className="size-2 stroke-base-500 stroke-[2px]"
                                        />
                                        <span className="text-[0.6rem] tracking-wide text-base-500 whitespace-nowrap">
                                            {idToName[sharee]}
                                        </span>
                                        {/* {item.EmployeeID === sharee && 
                                            <span className="text-blue-500 medium">
                                                Creator
                                            </span>
                                        } */}
                                    </div>
                                ))}
                            </div>
                        </div>
                    }
                </div> 
            }
        </>
    )
}
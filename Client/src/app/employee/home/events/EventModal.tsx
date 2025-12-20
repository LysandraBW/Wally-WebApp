import { Event } from "./_DEF";
import CloseButton from "@/component/Button/CloseButton";
import { toDisplayDate } from "@/utils/convert";
import { useEffect, useState } from "react";
import { OptionMap } from "@/features/Form/DEF";
import getValuesToLabels from "@/features/Form/helpers/getValuesToLabels";
import Person from "@/component/Icon/Icons/User";
import EditButton from "./EditButton";
import DeleteButton from "@/features/ItemManager/components/DeleteButton";
import clsx from "clsx";
import GetEmployeeNamePairs from "@/services/DB/Employee/GetEmployeeNamePairs";
import { navigate } from "@/utils/navigate";
import { PAGE_EDIT_APPOINTMENT, PAGE_VIEW_APPOINTMENT } from "@/utils/constants";

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
                <div className="bg-white border border-gray-300">
                    <div className="flex justify-between items-start p-4 border-b border-b-gray-200">
                        <h6 className="font-medium">Showing Event</h6>
                        <div>
                            <CloseButton
                                close={() => {
                                    props.onClose(props.event.EventID);
                                }}
                            />
                        </div>
                    </div>
                    {props.event.AppointmentID === "" &&
                        <div 
                            className={clsx(
                                "flex items-center py-2 px-4 gap-2",
                                "border-b border-b-gray-200 bg-gray-50"
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
                    <div className="flex-col p-1 border-b border-b-gray-200 bg-gray-50">
                        <div className="flex flex-col gap-0 p-1 px-4">
                            {props.event.AppointmentID !== "" &&
                                <span className="text-01 tracking-wide text-gray-600 font-medium-">
                                    Appointment {props.event.AppointmentID}
                                </span>
                            }
                            {props.event.AppointmentID === "" &&
                                <span className="text-01 tracking-wide text-gray-600 font-medium-">
                                    {parseInt(props.event.EventID) >= 0 ? `Event #${props.event.EventID}` : "New Event"}
                                </span>
                            }
                            <span className="text-01 tracking-wide text-gray-600 font-medium-">
                                {toDisplayDate(props.event.Date)}
                            </span>
                        </div>
                    </div>
                    <div className="flex-col p-4 py-4 min-h-[200px]">
                        <h6 className="font-medium text-black text-05 tracking-wide mb-1">{props.event.Name}</h6>
                        <p className="text-sm tracking-wide text-gray-600">{props.event.Summary}</p>
                    </div>
                    {props.event.Sharees.length !== 0 && 
                        <div className="overflow-scroll scroll-hide">
                            <div className="flex bg-gray-50 py-2 px-4 border-t border-t-gray-200 items-center gap-2">
                                {props.event.Sharees.map((sharee, i) => (
                                    <span key={i} className="block flex gap-1 items-center tracking-wide text-00 font-medium shadow-sm tag border-solid text-01">
                                        <Person
                                            width="14"
                                            height="14"
                                            fill="#94a3b8"
                                            stroke="#94a3b8"
                                            strokeWidth="0.25"
                                        />
                                        {idToName[sharee]}
                                    </span>
                                ))}
                            </div>
                        </div>
                    }
                    {props.event.AppointmentID !== "" &&
                        <div className="flex gap-4 p-4 items-center border-t border-t-gray-200 justify-end">
                            <button 
                                onClick={() => navigate(PAGE_VIEW_APPOINTMENT, {"appointmentID": props.event.AppointmentID || ""})}
                                className="px-4 py-1.5 h-min border border-gray-300 rounded bg-white shadow-sm tracking-wide text-xs font-medium text-black"
                            >
                                View Appointment    
                            </button>
                            <button 
                                onClick={() => navigate(PAGE_EDIT_APPOINTMENT, {"appointmentID": props.event.AppointmentID || ""})}
                                className="px-2 py-1.5 h-min border border-gray-300 rounded bg-white shadow-sm tracking-wide text-xs font-medium text-black"
                            >
                                Edit Appointment    
                            </button>
                        </div>
                    }
                </div> 
            }
        </>
    )
}
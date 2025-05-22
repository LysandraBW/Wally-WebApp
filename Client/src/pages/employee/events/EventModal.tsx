import { goToUpdateAppointment } from "@/utils/redirect/goToUpdateAppointment";
import { Event } from "./_DEF";
import { goToViewAppointment } from "@/utils/redirect/goToViewAppointment";
import CloseButton from "@/component/Button/CloseButton";
import Button from "@/component/Form/Button/Button";
import { toDisplayDate } from "@/utils/convert";
import { useEffect, useState } from "react";
import { OptionMap } from "@/features/Form/DEF";
import { getCookie } from "@/utils/cookies/getCookie";
import GetEmployeeNamePairs from "@/services/DB/Procedure/Employee/GetEmployeeNamePairs";
import getValuesToLabels from "@/features/Form/helpers/getValuesToLabels";
import Person from "@/component/Icon/Person";
import EditButton from "@/pages/employee/events/EditButton";
import DeleteButton from "@/features/ItemManager/Form/DeleteButton";
import clsx from "clsx";

interface EventModalProps {
    event: Event;
    onClose: () => void;
    onUpdate: (eventID: string) => void;
    onDelete: (eventID: string) => void;
}

export default function EventModal(props: EventModalProps) {
    const [idToName, setIDToName] = useState<OptionMap>({});

    useEffect(() => {
        const load = async () => {
            const sessionID = await getCookie("sessionID");
            const employees = await GetEmployeeNamePairs(sessionID);
            setIDToName(getValuesToLabels(employees));
        }
        load();
    }, []);
    
    return (
        <div className="bg-white h-min shadow-lg min-w-[400px] max-w-screen">
            <div className="flex justify-between items-center p-4 border-b">
                <h6 className="font-medium">Events</h6>
                <div>
                    <CloseButton
                        close={props.onClose}
                    />
                </div>
            </div>
            {props.event.AppointmentID === "" &&
                <div 
                    className={clsx(
                        "flex items-center p-1 gap-1",
                        "border-b bg-gray-50"
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
            <div className="flex-col p-1 border-b">
                <div className="flex items-center gap-1 p-1">
                    <span className="relative top-[0.5px]">
                        {toDisplayDate(props.event.Date)}
                    </span>
                </div>
            </div>
            <div className="flex-col p-4 py-2">
                <h6>{props.event.Name}</h6>
                <p className="color-4 small">{props.event.Summary}</p>
            </div>
            {props.event.Sharees.length !== 0 && 
                <div className="overflow-scroll scroll-hide">
                    <div className="flex bg-gray-50 p-1 border-t border-b border-t-gray-200 items-center gap-1">
                        {props.event.Sharees.map((sharee, i) => (
                            <span key={i} className="block flex gap-1 items-center tag border-solid text-01">
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
                <div className="flex gap-4 p-4 border-b">
                    <Button 
                        style="boring"
                        label="View Appointment"
                        onClick={() => goToViewAppointment(props.event.AppointmentID || "")}
                    />
                    <Button 
                        style="boring"
                        label="Update Appointment"
                        onClick={() => goToUpdateAppointment(props.event.AppointmentID || "")}
                    />
                </div>
            }
        </div>
    )
}
import Checkbox from "@/component/Form/Checkbox/Checkbox";
import Flag from "@/component/Icon/Flag";
import FlagFill from "@/component/Icon/FlagFill";
import Star from "@/component/Icon/Star";
import StarFill from "@/component/Icon/StarFill";
import TableEntry from "./Entry";
import { FilterManager } from "../managers/useFilterManager";
import { DeleteManager } from "../managers/useDeleteManager";
import { Appointment, AppointmentManager } from "../managers/useAppointmentManager";
import { ToggleManager } from "../managers/useToggleManager";
import { toDisplayDate } from "@/utils/convert";
import { toString } from "@/utils/convert";
import { Fragment, useState } from "react";
import clsx from "clsx";

interface TableRowProps {
    appointment: Appointment;
    filterManager: FilterManager;
    deleteManager: DeleteManager;
    appointmentManager: AppointmentManager;
    toggleManager: ToggleManager;
}

export default function TableRow(props: TableRowProps) {
    const [seen, setSeen] = useState(props.appointment.Labels.Seen && props.appointment.Labels.Seen.Value === 1);
    const [flagged, setFlagged] = useState(props.appointment.Labels.Flag && props.appointment.Labels.Flag.Value === 1);

    const markAsSeen = () => {
        const {AppointmentID} = props.appointment;
        if (!seen) {
            props.toggleManager.toggleAppointmentLabel(AppointmentID, "Seen");
            setSeen(true);
        }
        props.appointmentManager.openAppointment(AppointmentID);
    }

    const markAsFlagged = () => {
        const {AppointmentID} = props.appointment;
        props.toggleManager.toggleAppointmentLabel(AppointmentID, "Flag");
        setFlagged(!flagged);
    }

    return (
        <tr
            onClick={markAsSeen}
            className={clsx(
                "bg-gray-50",
                "border-b border-b-gray-300 last:!border-b-0- last:border-b-gray-300",
                "cursor-pointer group hover:bg-white",
                !seen && "!bg-blue-600/10"
            )}
        >
            {/* Check */}
            <td className="p-2 !border-l-0 border-r border-r-gray-300">
                <Checkbox
                    name=""
                    value=""
                    checked={props.toggleManager.selectedAppointments.includes(props.appointment.AppointmentID)}
                    onChange={() => props.toggleManager.toggleAppointmentSelection(props.appointment.AppointmentID)}
                />
            </td>
            {/* Flag */}
            <td 
                className="p-2 !border-l-0 border-r border-r-gray-300"
                onClick={markAsFlagged}
            >
                {!flagged &&
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="16" strokeWidth="1.25" fill="currentColor" className="w-[14px] h-[16px] bi bi-bookmark-fill fill-white stroke stroke-gray-300" viewBox="0 0 16 16">
                        <path d="M2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2"/>
                    </svg>
                }
                {flagged &&
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="16" fill="currentColor" className="w-[14px] h-[16px] bi bi-bookmark-fill fill-black" viewBox="0 0 16 16">
                        <path d="M2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2"/>
                    </svg>
                }
            </td>
            <TableEntry
                entry={props.appointment.FName}
                search={props.filterManager.search}
                isNew={!seen}
            />
            <TableEntry
                entry={props.appointment.LName}
                search={props.filterManager.search}
            />
            <TableEntry
                entry={toString(props.appointment.Status)}
                search={props.filterManager.search}
            />
            <TableEntry
                entry={props.appointment.Make}
                search={props.filterManager.search}
            />
            <TableEntry
                entry={props.appointment.Model}
                search={props.filterManager.search}
            />
            <TableEntry
                entry={toString(props.appointment.ModelYear)}
                search={props.filterManager.search}
            />
            <TableEntry
                entry={toDisplayDate(props.appointment.CreationDate)}
                search={props.filterManager.search}
            />
            <TableEntry
                entry={toDisplayDate(props.appointment.StartDate)}
                search={props.filterManager.search}
            />
            <TableEntry
                entry={toDisplayDate(props.appointment.EndDate)}
                search={props.filterManager.search}
            />
            <TableEntry
                entry={toString(props.appointment.Cost)}
                search={props.filterManager.search}
            />
            <TableEntry
                entry={props.appointment.VIN}
                search={props.filterManager.search}
            />
            <TableEntry
                entry={toString(props.appointment.Mileage)}
                search={props.filterManager.search}
            />
            <TableEntry
                entry={props.appointment.LicensePlate}
                search={props.filterManager.search}
                style="!border-r-0"
            />
        </tr>
    )
}
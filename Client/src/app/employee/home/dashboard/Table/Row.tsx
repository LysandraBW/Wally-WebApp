import Checkbox from "@/component/Form/Checkbox/Checkbox";
import TableEntry from "./Entry";
import { FilterManager } from "../managers/useFilterManager";
import { DeleteManager } from "../managers/useDeleteManager";
import { Appointment, AppointmentManager } from "../managers/useAppointmentManager";
import { ToggleManager } from "../managers/useToggleManager";
import { toDisplayDate } from "@/utils/convert";
import { toString } from "@/utils/convert";
import { Fragment, useEffect, useState } from "react";
import clsx from "clsx";
import Star from "./Star";
import Flag from "./Flag";
import Check from "./Check";

interface TableRowProps {
    i: number;
    appointment: Appointment;
    filterManager: FilterManager;
    deleteManager: DeleteManager;
    appointmentManager: AppointmentManager;
    toggleManager: ToggleManager;
}

const statusColor = {
    "Pending": "bg-red-500",
    "Evaluation": "bg-orange-500",
    "Scheduled": "bg-yellow-500",
    "In Progress": "bg-green-500",
    "Done": "bg-blue-500",
    "Completed": "bg-purple-500"
}

export default function TableRow(props: TableRowProps) {
    const [seen, setSeen] = useState(props.appointment.Labels.Seen && props.appointment.Labels.Seen.Value === 1);
    const [starred, setStarred] = useState(props.appointment.Labels.Star && props.appointment.Labels.Star.Value === 1);
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

    const markAsStarred = () => {
        const {AppointmentID} = props.appointment;
        props.toggleManager.toggleAppointmentLabel(AppointmentID, "Star");
        setStarred(!starred);
    }

    useEffect(() => {
        setStarred(props.appointment.Labels.Star && props.appointment.Labels.Star.Value === 1);
        setFlagged(props.appointment.Labels.Flag && props.appointment.Labels.Flag.Value === 1);
    }, [props.appointment]);

    return (
        <Fragment>
            <Check
                i={props.i}
                seen={seen}
                appointment={props.appointment}
                toggleManager={props.toggleManager}
            />
            <Flag
                i={props.i}
                seen={seen}
                flagged={flagged}
                markAsFlagged={markAsFlagged}
            />
            <Star
                i={props.i}
                seen={seen}
                starred={starred}
                markAsStarred={markAsStarred}
            />
            <TableEntry
                i={props.i}
                entry={props.appointment.FName}
                search={props.filterManager.search}
                seen={seen}
                showNewFlag={true}
                style="sticky left-0 FName"
                onClick={markAsSeen}
            />
            <TableEntry
                i={props.i}
                entry={props.appointment.LName}
                search={props.filterManager.search}
                seen={seen}
                style="sticky left-0 LName"
                onClick={markAsSeen}
            />
            <TableEntry
                i={props.i}
                entry={toDisplayDate(props.appointment.CreationDate)}
                search={props.filterManager.search}
                seen={seen}
                onClick={markAsSeen}
            />
            <TableEntry
                i={props.i}
                entry={toString(props.appointment.Status)}
                search={props.filterManager.search}
                seen={seen}
                onClick={markAsSeen}
                children={
                    <div className={`w-1 h-1 bg-black ${(statusColor as any)[toString(props.appointment.Status)]}`}/>
                }
            />
            <TableEntry
                i={props.i}
                entry={props.appointment.Make}
                search={props.filterManager.search}
                seen={seen}
                onClick={markAsSeen}
            />
            <TableEntry
                i={props.i}
                entry={props.appointment.Model}
                search={props.filterManager.search}
                seen={seen}
                onClick={markAsSeen}
            />
            <TableEntry
                i={props.i}
                entry={toString(props.appointment.ModelYear)}
                search={props.filterManager.search}
                seen={seen}
                onClick={markAsSeen}
            />
            <TableEntry
                i={props.i}
                entry={toDisplayDate(props.appointment.StartDate)}
                search={props.filterManager.search}
                seen={seen}
                onClick={markAsSeen}
            />
            <TableEntry
                i={props.i}
                entry={toDisplayDate(props.appointment.EndDate)}
                search={props.filterManager.search}
                seen={seen}
                onClick={markAsSeen}
            />
            <TableEntry
                i={props.i}
                entry={toString(props.appointment.Cost)}
                search={props.filterManager.search}
                seen={seen}
                onClick={markAsSeen}
            />
            <TableEntry
                i={props.i}
                entry={props.appointment.VIN}
                search={props.filterManager.search}
                seen={seen}
                onClick={markAsSeen}
            />
            <TableEntry
                i={props.i}
                entry={toString(props.appointment.Mileage)}
                search={props.filterManager.search}
                seen={seen}
                onClick={markAsSeen}
            />
            <TableEntry
                i={props.i}
                entry={props.appointment.LicensePlate}
                search={props.filterManager.search}
                seen={seen}
                onClick={markAsSeen}
                style="!border-r-0"
            />
        </Fragment>
    )
}
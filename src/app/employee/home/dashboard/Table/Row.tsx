import TableEntry from "./Entry";
import { FilterManager } from "../managers/useFilterManager";
import { DeleteManager } from "../managers/useDeleteManager";
import { Appointment, AppointmentManager } from "../managers/useAppointmentManager";
import { ToggleManager } from "../managers/useToggleManager";
import { formatDate, formatMoney } from "@/utils/convert";
import { toString } from "@/utils/convert";
import { Fragment, useEffect, useState } from "react";
import Star from "./Star";
import Flag from "./Flag";
import Check from "./Check";
import StatusColor from "@/shared/appointment/StatusColor";

interface TableRowProps {
    i: number;
    appointment: Appointment;
    filterManager: FilterManager;
    deleteManager: DeleteManager;
    appointmentManager: AppointmentManager;
    toggleManager: ToggleManager;
}

export default function TableRow(props: TableRowProps) {
    const [seen, setSeen] = useState(props.appointment.Labels.Seen && props.appointment.Labels.Seen.Value === 1);
    const [starred, setStarred] = useState(props.appointment.Labels.Star && props.appointment.Labels.Star.Value === 1);
    const [flagged, setFlagged] = useState(props.appointment.Labels.Flag && props.appointment.Labels.Flag.Value === 1);
    

    useEffect(() => {
        setSeen(props.appointment.Labels.Seen && props.appointment.Labels.Seen.Value === 1);
    }, [props.appointment.Labels]);


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
                entry={props.appointment.FName || "None"}
                search={props.filterManager.search}
                seen={seen}
                children={
                    <>
                        {!seen &&
                            <div className="bg-blue-500 size-1"></div>
                        }
                    </>
                }
                style="sticky left-0 FName"
                onClick={markAsSeen}
            />
            <TableEntry
                i={props.i}
                entry={props.appointment.LName || "None"}
                search={props.filterManager.search}
                seen={seen}
                style="sticky left-0 LName"
                onClick={markAsSeen}
            />
            <TableEntry
                i={props.i}
                entry={formatDate(props.appointment.CreationDate) || "None"}
                search={props.filterManager.search}
                seen={seen}
                onClick={markAsSeen}
            />
            <TableEntry
                i={props.i}
                entry={toString(props.appointment.Status) || "None"}
                search={props.filterManager.search}
                seen={seen}
                onClick={markAsSeen}
                children={<StatusColor status={toString(props.appointment.Status)}/>}
            />
            <TableEntry
                i={props.i}
                entry={props.appointment.Make || "None"}
                search={props.filterManager.search}
                seen={seen}
                onClick={markAsSeen}
            />
            <TableEntry
                i={props.i}
                entry={props.appointment.Model || "None"}
                search={props.filterManager.search}
                seen={seen}
                onClick={markAsSeen}
            />
            <TableEntry
                i={props.i}
                entry={toString(props.appointment.ModelYear) || "None"}
                search={props.filterManager.search}
                seen={seen}
                onClick={markAsSeen}
            />
            <TableEntry
                i={props.i}
                entry={formatDate(props.appointment.StartDate) || "None"}
                search={props.filterManager.search}
                seen={seen}
                onClick={markAsSeen}
            />
            <TableEntry
                i={props.i}
                entry={formatDate(props.appointment.EndDate) || "None"}
                search={props.filterManager.search}
                seen={seen}
                onClick={markAsSeen}
            />
            <TableEntry
                i={props.i}
                entry={formatMoney(props.appointment.Cost) || "None"}
                search={props.filterManager.search}
                seen={seen}
                onClick={markAsSeen}
            />
            <TableEntry
                i={props.i}
                entry={props.appointment.VIN || "None"}
                search={props.filterManager.search}
                seen={seen}
                onClick={markAsSeen}
            />
            <TableEntry
                i={props.i}
                entry={toString(props.appointment.Mileage) || "None"}
                search={props.filterManager.search}
                seen={seen}
                onClick={markAsSeen}
            />
            <TableEntry
                i={props.i}
                entry={props.appointment.LicensePlate || "None"}
                search={props.filterManager.search}
                seen={seen}
                onClick={markAsSeen}
                style="!border-r-0"
            />
        </Fragment>
    )
}
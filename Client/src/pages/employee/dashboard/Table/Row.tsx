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
import { toDisplayDate } from "@/utils/format/toDisplayDate";
import { toString } from "@/utils/format/toString";
import { Fragment } from "react";
import clsx from "clsx";

interface TableRowProps {
    appointment: Appointment;
    filterManager: FilterManager;
    deleteManager: DeleteManager;
    appointmentManager: AppointmentManager;
    toggleManager: ToggleManager;
}

export default function TableRow(props: TableRowProps) {
    return (
        <Fragment>
            <td 
                className={clsx(
                    "p-2 !border-l-0",
                    "border-r border-r-gray-200"
                )}
            >
                <Checkbox
                    name=""
                    value=""
                    checked={props.toggleManager.selectedAppointments.includes(props.appointment.AppointmentID)}
                    onChange={() => props.toggleManager.toggleAppointmentSelection(props.appointment.AppointmentID)}
                />
            </td>
            <TableEntry
                entry={props.appointment.FName}
                search={props.filterManager.search}
            />
            <TableEntry
                entry={props.appointment.LName}
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
            />
            <TableEntry
                entry={toString(props.appointment.Status)}
                search={props.filterManager.search}
                style="!border-r-0"
            />
        </Fragment>
    )
}
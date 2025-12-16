import { Fragment } from "react";
import TableRow from "./Row";
import { AppointmentManager } from "../managers/useAppointmentManager";
import { FilterManager } from "../managers/useFilterManager";
import { ToggleManager } from "../managers/useToggleManager";
import { DeleteManager } from "../managers/useDeleteManager";

interface TableBodyProps {
    filterManager: FilterManager;
    toggleManager: ToggleManager;
    deleteManager: DeleteManager;
    appointmentManager: AppointmentManager;
}

export default function TableBody(props: TableBodyProps) {
    return (
        <tbody>
            {props.appointmentManager.appointments && props.appointmentManager.appointments.map((appointment, i) => (
                <Fragment
                    key={i}
                >
                    <TableRow
                        appointment={appointment}
                        filterManager={props.filterManager}
                        toggleManager={props.toggleManager}
                        deleteManager={props.deleteManager}
                        appointmentManager={props.appointmentManager}
                    />
                </Fragment>
            ))}
        </tbody>
    )
}
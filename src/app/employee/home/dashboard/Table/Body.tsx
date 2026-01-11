import { Fragment, useEffect } from "react";
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
    useEffect(() => {
        const cells = document.querySelectorAll("[data-row]");
        for (const cell of cells) {
            cell.addEventListener("mouseenter", () => {
                const row = (cell as any).dataset.row;
                const rowCells = document.querySelectorAll(`[data-row="${row}"]`);
                for (const rowCell of rowCells) {
                    rowCell.classList.add("!bg-slate-200");
                    rowCell.classList.add("dark:!bg-base-0");
                }
            });

            cell.addEventListener("mouseleave", () => {
                const row = (cell as any).dataset.row;
                const rowCells = document.querySelectorAll(`[data-row="${row}"]`);
                for (const rowCell of rowCells) {
                    rowCell.classList.remove("!bg-slate-200");
                    rowCell.classList.remove("dark:!bg-base-0");
                }
            });
        }
    }, [props.appointmentManager.appointments]);

    return (
        <Fragment>
            {props.appointmentManager.appointments && props.appointmentManager.appointments.map((appointment, i) => (
                <Fragment
                    key={appointment.AppointmentID}
                >
                    <TableRow
                        i={i}
                        appointment={appointment}
                        filterManager={props.filterManager}
                        toggleManager={props.toggleManager}
                        deleteManager={props.deleteManager}
                        appointmentManager={props.appointmentManager}
                    />
                </Fragment>
            ))}
        </Fragment>
    )
}
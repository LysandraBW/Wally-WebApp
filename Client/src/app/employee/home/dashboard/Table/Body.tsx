import { Fragment, useEffect } from "react";
import TableRow from "./Row";
import useAppointmentManager, { AppointmentManager } from "../managers/useAppointmentManager";
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
                    rowCell.classList.add("!bg-gray-200");
                }
            });

            cell.addEventListener("mouseleave", () => {
                const row = (cell as any).dataset.row;
                const rowCells = document.querySelectorAll(`[data-row="${row}"]`);
                for (const rowCell of rowCells) {
                    rowCell.classList.remove("!bg-gray-200");
                }
            });
        }
    }, [props.appointmentManager.appointments]);

    return (
        <Fragment>
            {props.appointmentManager.appointments && props.appointmentManager.appointments.map((appointment, i) => (
                <Fragment
                    key={i}
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
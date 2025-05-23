import clsx from "clsx";
import { Appointment, AppointmentManager } from "../managers/useAppointmentManager";
import { DeleteManager } from "../managers/useDeleteManager";
import { FilterManager } from "../managers/useFilterManager";
import { ToggleManager } from "../managers/useToggleManager";
import TableHead from "./Head";
import TableRow from "./Row";
import { Fragment } from "react";

interface TableProps {
    filterManager: FilterManager;
    toggleManager: ToggleManager;
    deleteManager: DeleteManager;
    appointmentManager: AppointmentManager;
}

export default function Table(props: TableProps) {
    

    return (
        <div>
            {props.appointmentManager.appointments && props.appointmentManager.appointments.length > 0 &&
                <table>
                    <TableHead
                        filterManager={props.filterManager}
                        toggleManager={props.toggleManager}
                    />
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
                </table>
            }
            {props.appointmentManager.appointments && props.appointmentManager.appointments.length === 0 && 
                <div className="flex justify-center items-center p-4">
                    {/* If there's no appointment, we show a cool image. */}
                        <img
                            width="200"
                            height="200"
                            src="https://media.tenor.com/gUUIT73oHrAAAAAe/all-my-monkeys.png"
                        />
                </div>
            }
        </div>
    )
}
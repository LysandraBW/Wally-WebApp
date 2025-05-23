import clsx from "clsx";
import { Appointment, AppointmentManager } from "../managers/useAppointmentManager";
import { DeleteManager } from "../managers/useDeleteManager";
import { FilterManager } from "../managers/useFilterManager";
import { ToggleManager } from "../managers/useToggleManager";
import TableHead from "./Head";
import TableRow from "./Row";

interface TableProps {
    filterManager: FilterManager;
    toggleManager: ToggleManager;
    deleteManager: DeleteManager;
    appointmentManager: AppointmentManager;
}

export default function Table(props: TableProps) {
    const markSeen = (appointment: Appointment) => {
        const {AppointmentID} = appointment;
        console.log(appointment, AppointmentID);
        if (!appointment.Labels.Seen || !appointment.Labels.Seen.Value)
            props.toggleManager.toggleAppointmentLabel(AppointmentID, "Seen");
        props.appointmentManager.openAppointment(AppointmentID);
    }

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
                            <tr 
                                key={i}
                                onClick={() => markSeen(appointment)}
                                className={clsx(
                                    "border-b border-b-gray-200",
                                    "last:!border-b-0",
                                    "cursor-pointer group hover:!bg-blue-500",
                                    (appointment.Labels.Seen && appointment.Labels.Seen.Value === 1) && "!bg-gray-50"
                                )}
                            >
                                <TableRow
                                    appointment={appointment}
                                    filterManager={props.filterManager}
                                    toggleManager={props.toggleManager}
                                    deleteManager={props.deleteManager}
                                    appointmentManager={props.appointmentManager}
                                />
                            </tr>
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
import { AppointmentManager } from "../managers/useAppointmentManager";
import { DeleteManager } from "../managers/useDeleteManager";
import { FilterManager } from "../managers/useFilterManager";
import { ToggleManager } from "../managers/useToggleManager";
import TableBody from "./Body";
import TableHead from "./Head";

interface TableProps {
    filterManager: FilterManager;
    toggleManager: ToggleManager;
    deleteManager: DeleteManager;
    appointmentManager: AppointmentManager;
}

export default function Table(props: TableProps) {
    return (
        <div className="grow overflow-x-scroll flex flex-col grow bg-gray-100 overflow-x-scroll scroll-hide">
            {props.appointmentManager.appointments && props.appointmentManager.appointments.length > 0 &&
                <table className="overflow-x-scroll">
                    <TableHead
                        filterManager={props.filterManager}
                        toggleManager={props.toggleManager}
                    />
                    <TableBody
                        filterManager={props.filterManager}
                        toggleManager={props.toggleManager}
                        deleteManager={props.deleteManager}
                        appointmentManager={props.appointmentManager}
                    />
                </table>
            }
            {props.appointmentManager.appointments && props.appointmentManager.appointments.length === 0 && 
                <div className="grow h-full flex flex-col gap-2 justify-center items-center p-4 py-8">
                    <span className="text-gray-400 tracking-wide font-medium text-03">
                        No Appointments Found
                    </span>
                </div>
            }
        </div>
    )
}
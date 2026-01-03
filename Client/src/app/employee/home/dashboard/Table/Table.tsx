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
        <div className="h-full grow flex flex-col">
            {props.appointmentManager.appointments && props.appointmentManager.appointments.length > 0 &&
                <div className="grid grid-cols-[min-content_min-content_min-content_repeat(13,1fr)] overflow-x-scroll scroll-hide">
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
                </div>
            }
            {props.appointmentManager.appointments && props.appointmentManager.appointments.length === 0 && 
                <div className="grow h-full flex flex-col gap-2 justify-center items-center p-4 py-8">
                    <span className="text-gray-500 tracking-wide font-medium text-xs">
                        No Appointments Found
                    </span>
                </div>
            }
        </div>
    )
}
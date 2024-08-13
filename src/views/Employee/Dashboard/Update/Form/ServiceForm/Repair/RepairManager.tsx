import { DB_Appointment } from "@/database/Types";
import { Fragment } from "react";
import UpdateRepair from "./UpdateRepair";
import CreateRepair from "./CreateRepair";
import useRepairManager from "@/process/Employee/Update/Repair/Process";

interface RepairManagerProps {
    appointment: DB_Appointment;
}

export default function RepairManager(props: RepairManagerProps) {
    const repairManager = useRepairManager(props.appointment);

    return (
        <div>
            {repairManager.updated &&
                <Fragment>
                    <div>
                        {Object.entries(repairManager.updated).map(([repairID, repair], i) => (
                            <div key={i}>
                                <UpdateRepair
                                    repair={repair}
                                    onDelete={() => repairManager.deleteRepair(repairID)}
                                    onUpdate={repair => repairManager.updateRepair(repairID, repair)}
                                />
                            </div>
                        ))}
                    </div>
                    <div>
                        <CreateRepair
                            onChange={value => repairManager.createRepair(value)}
                        />
                    </div>        
                </Fragment>
            }
        </div>
    )
}
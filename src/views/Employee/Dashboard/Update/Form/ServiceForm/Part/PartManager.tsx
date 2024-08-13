import UpdatePart from "./UpdatePart";
import CreatePart from "./CreatePart";
import usePartsManager from "@/process/Employee/Update/Part/Process";
import { DB_Appointment } from "@/database/Types";

interface PartManagerProps {
    appointment: DB_Appointment;
}

export default function PartManager(props: PartManagerProps) {
    const partsManager = usePartsManager(props.appointment);

    return (
        <div>
            {!!partsManager.updated && 
                <div>
                    <h5>Current Parts</h5>
                    {Object.entries(partsManager.updated.Parts).map(([partID, part], i) => (
                        <div key={i}>
                            <UpdatePart
                                part={part}
                                onDelete={() => partsManager.deletePart(partID)}
                                onUpdate={(part) => partsManager.updatePart(partID, part)}
                            />
                        </div>
                    ))}
                </div>
            }
            <div>
                <h5>Type in a Part Here</h5>
                <CreatePart
                    onChange={value => partsManager.createPart(value)}
                />
            </div>
        </div>
    )
}
import ServiceManager from "./Service/ServiceManager";
import DiagnosisManager from "./Diagnosis/DiagnosisManager";
import RepairManager from "./Repair/RepairManager";
import PartManager from "./Part/PartManager";
import { DB_Appointment } from "@/database/Types";

interface ServiceProps {
    appointment: DB_Appointment;
}

export default function ServiceForm(props: ServiceProps) {
    return (
        <>
            <ServiceManager
                appointment={props.appointment}
            />
            <DiagnosisManager
                appointment={props.appointment}
            />
            <RepairManager
                appointment={props.appointment}
            />
            <PartManager
                appointment={props.appointment}
            />
        </>
    )
}
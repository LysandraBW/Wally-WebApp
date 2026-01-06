import { Diagnosis as DB_AppointmentDiagnosis } from "waltronics-types";
import Item from "@/features/ItemManager/components/Item";
import { Diagnosis } from "@/app/employee/home/update/diagnosis/_DEF";

interface DiagnosisItemProps {
    diagnosis: DB_AppointmentDiagnosis | Diagnosis;
}

export default function DiagnosisItem(props: DiagnosisItemProps) {
    return (
        <Item
            ID={parseInt(props.diagnosis?.DiagnosisID as any)}
            head={props.diagnosis?.Message}
            tags={[[props.diagnosis?.Code]]}
        />
    )
}
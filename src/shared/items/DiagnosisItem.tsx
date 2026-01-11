import { Diagnosis as DB_AppointmentDiagnosis } from "waltronics-types";
import Item from "@/features/ItemManager/components/Item";
import { Diagnosis } from "@/app/employee/home/update/diagnosis/_DEF";
import { toInteger } from "@/utils/convert";

interface DiagnosisItemProps {
    diagnosis: DB_AppointmentDiagnosis | Diagnosis;
}

export default function DiagnosisItem(props: DiagnosisItemProps) {
    return (
        <Item
            ID={toInteger(props.diagnosis?.DiagnosisID)}
            head={props.diagnosis?.Message}
            tags={[[props.diagnosis?.Code]]}
        />
    )
}
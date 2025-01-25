import { DB_AppointmentDiagnosis } from "@/services/DB/Interface/Appointment";
import { Diagnosis } from "../edit/service/diagnosis/_DEF";
import Item from "@/features/ItemManager/Item/Item";

interface DiagnosisItemProps {
    diagnosis: DB_AppointmentDiagnosis | Diagnosis;
}

export default function DiagnosisItem(props: DiagnosisItemProps) {
    return (
        <Item
            ID={
                typeof props.diagnosis.DiagnosisID === "number" ? 
                    props.diagnosis.DiagnosisID : 
                    parseInt(props.diagnosis.DiagnosisID)
            }
            head={props.diagnosis.Message}
            tags={[[props.diagnosis.Code]]}
        />
    )
}
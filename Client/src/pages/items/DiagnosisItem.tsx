import { Diagnosis as DB_AppointmentDiagnosis } from "waltronics-types";
import { Diagnosis } from "../../../app/employee/home/update/diagnosis/_DEF";
import Item from "@/features/ItemManager/components/Item";

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
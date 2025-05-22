import DiagnosisDisplay from "./DiagnosisDisplay";
import { Diagnosis as DB_AppointmentDiagnosis } from "waltronics-types";
import { Diagnoses, DiagnosisUpdates, DefineDiagnosis } from "./_DEF";
import buildUpdate from "@/features/ItemManager/buildUpdate";
import ItemManager from "@/features/ItemManager/ItemManager";
import DiagnosisForm from "./DiagnosisForm";
import { UseForm } from "@/features/Form/useForm/useForm";

interface DiagnosisManagerProps {
    parentForm: UseForm;
    diagnosisList: Array<DB_AppointmentDiagnosis>;
    onSaveUpdates: (updates: DiagnosisUpdates) => void;
}

export default function DiagnosisManager(props: DiagnosisManagerProps) {
    const defineDiagnosis = new DefineDiagnosis();
    
    const processUpdates = (oldItems: Diagnoses, newItems: Diagnoses) => {
        const itemID = "DiagnosisID";
        const mutateKeys = ["Code", "Message"];
        const updates = buildUpdate(oldItems, newItems, itemID, mutateKeys, mutateKeys, itemID);
        props.onSaveUpdates(updates);
    }

    return (
        <div>
            <ItemManager
                itemList={props.diagnosisList}
                defineItem={defineDiagnosis}
                parentForm={props.parentForm}
                Form={DiagnosisForm}
                Display={DiagnosisDisplay}
                saveAllUpdates={processUpdates}
            />
        </div>
    )
}

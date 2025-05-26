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
    // Forms
    tabOpen: boolean;
    openForm: (form: string) => void;
    openFormDisplayed: string;
    openForms: Array<string>;
    closeForm: (form: string) => void;
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
        <ItemManager
            itemList={props.diagnosisList}
            defineItem={defineDiagnosis}
            parentForm={props.parentForm}
            Form={DiagnosisForm}
            Display={DiagnosisDisplay}
            saveAllUpdates={processUpdates}
            tabOpen={props.tabOpen}
            openForm={props.openForm}
            openFormDisplayed={props.openFormDisplayed}
            openForms={props.openForms}
            closeForm={props.closeForm}
            tab="Diagnoses"
        />
    )
}

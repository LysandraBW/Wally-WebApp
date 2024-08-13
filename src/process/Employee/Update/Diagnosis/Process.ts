import { DB_Appointment, DB_Diagnosis } from "@/database/Types";
import { DiagnosesFormStructure, InitialDiagnosesForm } from "@/submission/Employee/Update/Diagnosis/Form";
import { submitDiagnosesForm } from "@/submission/Employee/Update/Diagnosis/Submit";
import Diagnoses from "@/views/Customer/Lookup/Summary/Diagnoses";
import { useEffect, useState } from "react";

export default function useDiagnosisManager(appointment: DB_Appointment) {
    const [counter, setCounter] = useState(1);
    const [updated, setUpdated] = useState<DiagnosesFormStructure>();
    const [reference, setReference] = useState<DiagnosesFormStructure>();

    useEffect(() => {
        const load = async () => {
            const form = await InitialDiagnosesForm(appointment);
            setUpdated(form);
            setReference(form);
        }
    }, [appointment]);

    const deleteDiagnosis = (diagnosisID: string) => {
        if (!updated)
            return;
        let updatedValue = {...updated.Diagnoses};
        delete updatedValue[`${diagnosisID}`];
        setUpdated(Object.assign({}, updated, {Diagnoses: {...updated.Diagnoses, ...updatedValue}}));
    }

    const updateDiagnosis = (diagnosisID: string, diagnosis: DB_Diagnosis) => {
        if (!updated)
            return;
        let updatedValue = {...updated.Diagnoses};
        updatedValue[`${diagnosisID}`] = diagnosis;
        setUpdated(Object.assign({}, updated, {Diagnoses: {...updated.Diagnoses, ...updatedValue}}));
    }

    const createDiagnosis = (diagnosis: DB_Diagnosis) => {
        if (!updated)
            return;
        let updatedValue = {...updated.Diagnoses};
        updatedValue[`${-counter}`] = diagnosis;
        setUpdated(Object.assign({}, updated, {Diagnoses: {...updated.Diagnoses, ...updatedValue}}));
        setCounter(counter => counter + 1);
    }

    
    const resetData = async () => {
        setUpdated(reference);
    }

    const saveData = async () => {
        if (!reference || !updated)
            return;
        return await submitDiagnosesForm(reference, updated);
    }

    return {
        updated,
        deleteDiagnosis,
        updateDiagnosis,
        createDiagnosis,
        resetData,
        submitData: saveData
    }
}
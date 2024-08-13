import { DB_Appointment, DB_Repair } from "@/database/Types";
import { InitialRepairsForm, RepairsFormStructure } from "@/submission/Employee/Update/Repair/Form";
import { submitRepairsForm } from "@/submission/Employee/Update/Repair/Submit";
import { useEffect, useState } from "react";

export default function useRepairManager(appointment: DB_Appointment) {
    const [counter, setCounter] = useState(1);
    const [updated, setUpdated] = useState<RepairsFormStructure>();
    const [reference, setReference] = useState<RepairsFormStructure>();

    useEffect(() => {
        const load = async () => {
            const form = await InitialRepairsForm(appointment);
            setUpdated(form);
            setReference(form);
        }
        load();
    }, [appointment]);

    const deleteRepair = (repairID: string) => {
        if (!updated)
            return;
        let updatedValue = {...updated.Repairs};
        delete updatedValue[`${repairID}`];
        setUpdated(Object.assign({}, updated, {Repairs: {...updated.Repairs, ...updatedValue}}));
    }

    const updateRepair = (repairID: string, repair: DB_Repair) => {
        if (!updated)
            return;
        let updatedValue = {...updated.Repairs};
        delete updatedValue[`${repairID}`];
        setUpdated(Object.assign({}, updated, {Repairs: updatedValue}));
    }

    const createRepair = (repair: DB_Repair) => {
        if (!updated)
            return;
        setUpdated(Object.assign({}, updated, {Repairs: {...updated.Repairs, [`${-counter}`]: repair}}));
        setCounter(counter => counter + 1);
    }

    const resetData = () => {
        setUpdated(reference);
    }

    const saveData = async () => {
        if (!updated || !reference)
            return;
        return await submitRepairsForm(reference, updated);
    }

    return {
        updated,
        deleteRepair,
        updateRepair,
        createRepair,
        resetData,
        saveData
    }
}
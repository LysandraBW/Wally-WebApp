import { DB_Appointment } from "@/database/Types";
import { InitialPartsForm, PartsFormStructure, UpdatePart } from "@/submission/Employee/Update/Part/Form";
import { useEffect, useState } from "react";

export default function usePartsManager(appointment: DB_Appointment) {
    const [counter, setCounter] = useState(1);
    const [updated, setUpdated] = useState<PartsFormStructure>();
    const [reference, setReference] = useState<PartsFormStructure>();

    useEffect(() => {
        const load = async () => {
            const form = await InitialPartsForm(appointment);
            setUpdated(form);
            setReference(form);
        }
        load();
    }, []);

    const deletePart = (partID: string) => {
        if (!updated)
            return;
        let updatedValue = {...updated.Parts};
        delete updatedValue[`${partID}`];
        setUpdated(Object.assign({}, updated, {Parts: {...updated.Parts, ...updatedValue}}));
    }

    const updatePart = (partID: string, part: UpdatePart) => {
        if (!updated)
            return;
        let updatedValue = {...updated.Parts};
        updatedValue[`${partID}`] = part;
        setUpdated(Object.assign({}, updated, {Parts: {...updated.Parts, ...updatedValue}}));
    }

    const createPart = (part: UpdatePart) => {
        if (!updated)
            return;
        setUpdated(Object.assign({}, updated, {Parts: {...updated.Parts, [`${-counter}`]: part}}));
        setCounter(counter => counter + 1);
    }

    return {
        updated,
        reference,
        createPart,
        updatePart,
        deletePart
    }
}
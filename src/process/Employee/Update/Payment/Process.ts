import { DefaultInputState } from "@/components/Input/MutateInput";
import { DB_Appointment } from "@/database/Types";
import { InitialPaymentForm, PaymentFormStructure, UpdatePayment } from "@/submission/Employee/Update/Payment/Form";
import { submitPaymentForm } from "@/submission/Employee/Update/Payment/Submit";
import { validNumber } from "@/validation/Validation";
import { useEffect, useState } from "react";

export default function usePaymentManager(appointment: DB_Appointment) {
    const [counter, setCounter] = useState(1);
    const [updated, setUpdated] = useState<PaymentFormStructure>();
    const [reference, setReference] = useState<PaymentFormStructure>();
    const [costState, setCostState] = useState(DefaultInputState);
    const [initialCost, setInitialCost] = useState('');

    useEffect(() => {
        const load = async () => {
            const form = await InitialPaymentForm(appointment);
            setUpdated(form);
            setReference(form);
            setInitialCost(form.Cost);
        }
        load();
    }, [appointment]);

    const updateCost = async (cost: string) => {
        setUpdated(Object.assign({}, updated, {Cost: cost}));
    }

    const inspectCost = async (cost: string) => {
        const output = await validNumber(cost);
        setCostState({state: output[0], message: output[1] || ''});
    }

    const resetCost = async () => {
        if (!updated || updated.Cost)
            return;
        setUpdated(Object.assign({}, updated, {Cost: initialCost}))
    }

    const deletePayment = (paymentID: string) => {
        if (!updated)
            return;
        let updatedValue = {...updated.Payments};
        delete updatedValue[`${paymentID}`];
        setUpdated(Object.assign({}, updated, {Payments: updatedValue}));
    }

    const updatePayment = (paymentID: string, payment: UpdatePayment) => {
        if (!updated)
            return;
        let updatedValue = {...updated.Payments};
        updatedValue[`${paymentID}`] = payment;
        setUpdated(Object.assign({}, updated, {Payments: updatedValue}));
    }

    const createPayment = (payment: UpdatePayment) => {
        if (!updated)
            return;
        setUpdated(Object.assign({}, updated, {Payments: {...updated.Payments, [`${-counter}`]: payment}}));
        setCounter(counter => counter + 1);
    }

    const resetData = async () => {
        setUpdated(reference);
    }

    const saveData = async () => {
        if (!reference || !updated)
            return;
        const output = await submitPaymentForm(reference, updated);
        if (output)
            setInitialCost(updated.Cost);
        return output;
    }

    return {
        updated,
        costState,
        updateCost,
        inspectCost,
        resetCost,
        deletePayment,
        updatePayment,
        createPayment,
        resetData,
        saveData
    }
}
import { MathSet, updatedValue } from "../../Helper";
import { PaymentFormStructure } from "./Payment";

export interface ProcessedPaymentFormStructure {
    AppointmentID: string;
    Update: {
        Cost: number | null;
    }
    Insert: Array<{
        Payment: string | number;  
        Name: string | null;
        Type: string | null;
        CCN: string | null;
        EXP: string | null;
    }>
    Delete: Array<{
        PaymentID: number;
    }>
}

export async function processPaymentForm(reference: PaymentFormStructure, current: PaymentFormStructure): Promise<ProcessedPaymentFormStructure> {
    const processedCostForm: ProcessedPaymentFormStructure = {
        AppointmentID: current.AppointmentID,
        Update: {
            Cost: updatedValue(reference.Cost, current.Cost)
        },
        Insert: [],
        Delete: []
    };

    const refPaymentIDs = new MathSet(Object.keys(reference.Payments).map(p => parseInt(p)));
    const curPaymentIDs = new MathSet(Object.keys(current.Payments).map(p => parseInt(p)));

    // Insert Payment
    const toInsertPaymentIDs = curPaymentIDs.difference(refPaymentIDs);
    toInsertPaymentIDs.forEach((paymentID) => {
        const curPayment = current.Payments[`${paymentID}`];
        processedCostForm.Insert.push({
            Payment: curPayment.Payment,
            Name: curPayment.Name,
            Type: curPayment.Type,
            CCN: curPayment.CCN,
            EXP: curPayment.EXP
        });
    });

    // Delete Payment
    const toDeletePaymentIDs = refPaymentIDs.difference(curPaymentIDs);
    toDeletePaymentIDs.forEach((paymentID) => {
        processedCostForm.Delete.push({
            PaymentID: paymentID
        });
    })

    return processedCostForm;
}
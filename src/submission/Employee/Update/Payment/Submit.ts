import { getSessionID } from "@/lib/Storage/Storage";
import { PaymentFormStructure } from "./Form";
import { ProcessedPaymentFormStructure, processPaymentForm } from "./Process";
import { DeletePayment, InsertCreditCard, InsertPayment, UpdateCost } from "@/database/Export";
import { toFloat } from "@/lib/Convert/Convert";

export async function submitPaymentForm(reference: PaymentFormStructure, current: PaymentFormStructure): Promise<boolean> {
    const processedForm: ProcessedPaymentFormStructure = await processPaymentForm(reference, current);
    const SessionID = await getSessionID();
    const AppointmentID = processedForm.AppointmentID;

    // Update Cost
    if (processedForm.Update.Cost) {
        const output = await UpdateCost({
            SessionID,
            AppointmentID,
            ...processedForm.Update
        });
        if (!output)
            throw 'Update Cost Error';
    }

    // Inserting Payment
    for (const insert of processedForm.Insert) {
        const PaymentID = await InsertPayment({
            SessionID,
            AppointmentID,
            Payment: toFloat(insert.Payment)
        });

        if (!PaymentID)
            throw 'Insert Payment Error';

        // Inserting a Credit Card for Payment
        if (insert.Name && insert.Type && insert.CCN && insert.EXP) {
            const output = await InsertCreditCard({
                SessionID,
                AppointmentID,
                PaymentID,
                Name: insert.Name,
                Type: insert.Type,
                CCN: insert.CCN,
                EXP: insert.EXP
            });

            if (!output)
                throw 'Insert Credit Card Error';
        }
    }

    // Deleting Payment
    for (const deletePayment of processedForm.Delete) {
        const output = await DeletePayment({
            SessionID,
            AppointmentID,
            ...deletePayment
        });
        if (!output)
            throw 'Delete Payment Error';
    }

    return true;
}
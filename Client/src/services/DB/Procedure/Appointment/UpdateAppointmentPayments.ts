import { queryDB } from "../../queryDB";
import { PaymentUpdates } from "@/pages/employee/edit/finance/payment/_DEF";

export async function UpdateAppointmentPayments(sessionID: string, appointmentID: string, updates: PaymentUpdates) {
    try {
        for (const INSERT of updates.Insert) {
            if (!INSERT.Name) {
                queryDB("appointment/insertPayment", {
                    sessionID,
                    appointmentID,
                    payment: INSERT.Payment
                });
                continue;
            }
            queryDB("appointment/insertDigitalPayment", {
                sessionID,
                appointmentID,
                payment: INSERT.Payment,
                name: INSERT.Name,
                type: INSERT.Type,
                ccn: INSERT.CCN,
                exp: INSERT.EXP
            });
        }

        for (const DELETE of updates.Delete) {
            queryDB("appointment/deletePayment", {
                sessionID,
                appointmentID,
                paymentID: DELETE.PaymentID
            });
        }
        
        return true;
    }
    catch (error) {
        console.error(error);
        return false;
    }
}
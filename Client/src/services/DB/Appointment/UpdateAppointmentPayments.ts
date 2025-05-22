import { PaymentUpdates } from "@/pages/employee/edit/finance/payment/_DEF";
import { request } from "../request";

export async function UpdateAppointmentPayments(appointmentID: string, updates: PaymentUpdates) {
    try {
        for (const INSERT of updates.Insert) {
            if (!INSERT.Name) {
                request("PUT", `/appointment/${appointmentID}/payment`, {
                    payment: INSERT.Payment
                });
            }
            else {
                request("PUT", `/appointment/${appointmentID}/payment?type=Digital`, {
                    name: INSERT.Name,
                    type: INSERT.Type,
                    ccn: INSERT.CCN,
                    exp: INSERT.EXP,
                    payment: INSERT.Payment,
                });
            }
        }

        for (const DELETE of updates.Delete) {
            request("DELETE", `/appointment/${appointmentID}/payment/${DELETE.PaymentID}`);
        }
        
        return true;
    }
    catch (error) {
        console.error(error);
        return false;
    }
}
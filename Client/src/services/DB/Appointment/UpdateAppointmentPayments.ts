import { PaymentUpdates } from "@/app/employee/home/update/payment/_DEF";
import { request } from "../request";

export async function UpdateAppointmentPayments(appointmentID: string, updates: PaymentUpdates) {
    try {
        let allOutput = true;

        for (const INSERT of updates.Insert) {
            if (!INSERT.Name) {
                const {output} = await request("PUT", `/appointment/${appointmentID}/payment`, {
                    payment: INSERT.Payment
                });
                allOutput = allOutput && output !== false;
            }
            else {
                const {output} = await request("PUT", `/appointment/${appointmentID}/payment?type=Digital`, {
                    name: INSERT.Name,
                    type: INSERT.Type,
                    ccn: INSERT.CCN,
                    exp: INSERT.EXP,
                    payment: INSERT.Payment,
                });
                allOutput = allOutput && output !== false;
            }
        }

        for (const DELETE of updates.Delete) {
            const {output} = await request("DELETE", `/appointment/${appointmentID}/payment/${DELETE.PaymentID}`);
            allOutput = allOutput && output !== false;
        }
        
        return allOutput;
    }
    catch (error) {
        console.error(error);
        return false;
    }
}
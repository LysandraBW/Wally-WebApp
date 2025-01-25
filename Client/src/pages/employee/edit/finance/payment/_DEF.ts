import { z } from "zod";
import { DB_AppointmentPayment } from "@/services/DB/Interface/Appointment";
import { toString } from "@/utils/format/toString";
import { Define } from "@/features/ItemManager/Define";
import { PAYMENT } from "../../_DEF";
import { FormTest } from "@/features/Form/useForm/Form";

export interface Payment extends Omit<DB_AppointmentPayment, "Payment" | "PaymentID" | "PaymentDate" | "AppointmentID"> {
    Payment: string;
    PaymentID: string;
    PaymentDate: string;
}

export interface Payments {
    [paymentID: string]: Payment;
}

export interface PaymentUpdates {
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

export class DefinePayment extends Define<DB_AppointmentPayment, Payment, Payments> {
    formID = PAYMENT;
    itemID = "PaymentID";
    itemName = "Payment";

    test(..._: any[]): FormTest {
        return z.object({
            CCN: z.string(),
            EXP: z.string(),
            Name: z.string(),
            Type: z.string(),
            Payment: z.string(),
            PaymentID: z.string()
        });
    }

    buildItem(baseItem: DB_AppointmentPayment | null): Payment {
        console.log("Base Item", baseItem);
        return {
            CCN: baseItem?.CCN || "",
            EXP: baseItem?.EXP || "",
            Name: baseItem?.Name || "",
            Type: baseItem?.Type || "",
            Payment: toString(baseItem?.Payment),
            PaymentID: toString(baseItem?.PaymentID),
            PaymentDate: toString(baseItem?.PaymentDate)
        };
    }

    buildItems(baseItems: DB_AppointmentPayment[]): Payments {
        const payments: Payments = {};
        for (const payment of baseItems)
            payments[toString(payment.PaymentID)] = this.buildItem(payment);
        return payments;
    }
}
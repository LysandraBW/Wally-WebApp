import { z } from "zod";
import { toString } from "@/utils/convert";
import { Define } from "../Define";
import { PAYMENT } from "../_DEF";
import { FormTest } from "@/features/Form/useForm/Form";
import { Payment as DB_Payment } from "waltronics-types";

export interface Payment extends Omit<DB_Payment, "Payment" | "PaymentID" | "PaymentDate" | "AppointmentID"> {
    Payment: string;
    PaymentID: string;
    PaymentDate: string;
}

export interface MappedPayments {
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

export class DefinePayment extends Define<DB_Payment, Payment, MappedPayments> {
    key = PAYMENT;
    itemName = "Payment";
    itemIDName = "PaymentID";

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

    processThing(baseItem: DB_Payment | null): Payment {
        // console.log("Base Item", baseItem);
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

    processThings(baseItems: DB_Payment[]): MappedPayments {
        const payments: MappedPayments = {};
        for (const payment of baseItems)
            payments[toString(payment.PaymentID)] = this.processThing(payment);
        return payments;
    }
}
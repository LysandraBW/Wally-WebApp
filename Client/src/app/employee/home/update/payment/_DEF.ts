import { FormTest } from "@/features/Form/useForm/Form";
import { Define } from "@/features/ItemManager/Define";
import { PAYMENT } from "@/app/employee/home/update/_DEF";
import { toString } from "@/utils/convert";
import { Payment as DB_Payment } from "waltronics-types";
import { z } from "zod";

export interface Cost {
    Cost: string
}

export function makeCost(cost: string): Cost {
    return {
        Cost: cost
    }
}

export const costTest = z.object({
    Cost: z.string()
});

export interface CostUpdates {
    Cost: string | null;
}
export interface Payment extends Omit<DB_Payment, "Payment" | "PaymentID" | "PaymentDate" | "AppointmentID"> {
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
    }>;
    Delete: Array<{
        PaymentID: number;
    }>;
}

export class DefinePayment extends Define<DB_Payment, Payment, Payments> {
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

    buildItem(baseItem: DB_Payment | null): Payment {
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

    buildItems(baseItems: DB_Payment[]): Payments {
        const payments: Payments = {};
        for (const payment of baseItems)
            payments[toString(payment.PaymentID)] = this.buildItem(payment);
        return payments;
    }
}

import { DB_Payment } from "@/database/Types";

export interface PaymentFormStructure {
    AppointmentID:  string;
    Cost:           number;
    Payments:       {[paymentID: string]: DB_Payment};
}

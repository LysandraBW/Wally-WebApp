import { DB_Appointment } from "@/database/Types";
import { toString } from "@/lib/Convert/Convert";

export interface UpdatePayment {    
    AppointmentID:  string;
    PaymentID:      number;
    Payment:        string;
    PaymentDate:    Date;
    Name:           string;
    Type:           string;
    CCN:            string;
    EXP:            string;
}

export interface PaymentsStructure {
    [paymentID: string]: UpdatePayment   
}

export interface PaymentFormStructure {
    AppointmentID:  string;
    Cost:           string;
    Payments:       PaymentsStructure;
}

export const InitialPaymentForm = (appointment: DB_Appointment): PaymentFormStructure => {
    const payments: PaymentsStructure = {};
    for (const payment of appointment.Payments)
        payments[payment.PaymentID] = {...payment, Payment: payment.Payment.toString()};

    return {
        AppointmentID:  appointment.AppointmentID,
        Cost:           toString(appointment.Cost),
        Payments:       payments
    };
}
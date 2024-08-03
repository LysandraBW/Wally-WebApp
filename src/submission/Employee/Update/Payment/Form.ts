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

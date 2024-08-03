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

export interface PaymentFormStructure {
    AppointmentID:  string;
    Cost:           number;
    Payments:       {[paymentID: string]: UpdatePayment};
}

import { UpdatePayment } from "@/submission/Employee/Update/Payment/Form";

export const DefaultValues: UpdatePayment = {
    AppointmentID:  '',
    PaymentID: 0,
    Payment: '',
    Name: '',
    Type: '',
    CCN: '',
    EXP: '',
    PaymentDate: new Date(),
}
import { UpdateEvent } from "@/submission/Employee/Calendar/Form";

export const DefaultValues: UpdateEvent = {
    EventID: -1,
    EmployeeID: '',
    AppointmentID: '',
    Name: '',
    Summary: '',
    Sharees: [],
    UpdatedDate: '',
    Date: new Date()
}
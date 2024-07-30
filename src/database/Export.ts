export {default as UpdateDate} from "./Appointment/Date/Update";
export {default as UpdateDiagnosis} from "./Appointment/Diagnosis/Update";
export {default as InsertDiagnosis} from "./Appointment/Diagnosis/Insert";
export {default as DeleteDiagnosis} from "./Appointment/Diagnosis/Delete";
export {default as GetDiagnosis} from "./Appointment/Diagnosis/Select";
export {default as UpdateRepair} from "./Appointment/Repair/Update";
export {default as InsertRepair} from "./Appointment/Repair/Insert";
export {default as DeleteRepair} from "./Appointment/Repair/Delete";
export {default as GetRepairs} from "./Appointment/Repair/Select";
export {default as UpdateLabel} from "./Appointment/Label/Update";
export {default as UpdateNote} from "./Appointment/Note/Update";
export {default as DeleteNote} from "./Appointment/Note/Delete";
export {default as UpdatePart} from "./Appointment/Part/Update";
export {default as InsertPart} from "./Appointment/Part/Insert";
export {default as DeletePart} from "./Appointment/Part/Delete";
export {default as GetParts} from "./Appointment/Part/Select";
export {default as UpdateCost} from "./Appointment/Payment/Update";
export {default as GetPayment} from "./Appointment/Payment/Select";
export {default as DeletePayment} from "./Appointment/Payment/Delete";
export {default as UpdateService} from "./Appointment/Service/Update";
export {default as DeleteService} from "./Appointment/Service/Delete";
export {default as GetServices} from "./Appointment/Service/Select";
export {default as GetNoteSharees} from "./Appointment/SharedNote/Select";
export {default as InsertNoteSharee} from "./Appointment/SharedNote/Insert";
export {default as DeleteNoteSharees} from "./Appointment/SharedNote/Delete";
export {default as UpdateStatus} from "./Appointment/Status/Update";
export {default as UpdateVehicle} from "./Appointment/Vehicle/Update";
export {default as InsertAppointment} from "./Appointment/Insert";
export {default as UpdateCustomer} from "./Customer/Update";
export {default as DeleteEvent} from "./Employee/Event/Delete";
export {default as GetEventSharees} from "./Employee/SharedEvent/Select";
export {default as InsertEventSharee} from "./Employee/SharedEvent/Insert";
export {default as DeleteEventSharees} from "./Employee/SharedEvent/Delete";

export {
    AuthenticateLogin, 
    AuthenticateSession as AuthenticateEmployeeSession
} from "./Employee/Security";

export { 
    DB_Statuses as Statuses,
    DB_Services as Services,
    DB_Labels as Labels,
    DB_Makes as Makes
} from "./Info/Info";

export {
    Delete, 
    Restore
} from "./Appointment/Deleted/General";

export {
    GetEmployeeNotes,
    GetCustomerNotes
} from "./Appointment/Note/Select";

export {
    InsertPayment,
    InsertCreditCard
} from "./Appointment/Payment/Insert";

export {
    InsertService, 
    InsertDefinedService
} from "./Appointment/Service/Insert";

export {
    AuthenticateLookup,
    AuthenticateSession as AuthenticateAppointmentSession
} from "./Appointment/Security";

export {
    Get as GetAppointment,
    GetAll as GetAllAppointments,
    GetSummary as GetAppointmentSummary,
} from "./Appointment/Appointment";

export {
    Get as GetEmployee,
    GetAll as GetAllEmployees
} from "./Employee/Employee";

export {
    GetLabels,
    GetAllLabels as GetEmployeeLabels
} from "./Appointment/Label/Select"

export { 
    InsertNote,
    InsertNoteAttachment
} from "./Appointment/Note/Insert";

export { 
    DeleteNoteAttachment
} from "./Appointment/Note/Delete";

export { 
    UpdateEvent 
} from "./Employee/Event/Update";

export { 
    InsertEvent 
} from "./Employee/Event/Insert";

export { 
    GetEvents 
} from "./Employee/Event/Select";
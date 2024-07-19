export {default as UpdateDate} from "./Appointment/Date/Update";
export {default as UpdateDiagnosis} from "./Appointment/Diagnosis/Update";
export {default as InsertDiagnosis} from "./Appointment/Diagnosis/Insert";
export {default as DeleteDiagnosis} from "./Appointment/Diagnosis/Delete";
export {default as GetDiagnosis} from "./Appointment/Diagnosis/Select";
export {default as UpdateFix} from "./Appointment/Fix/Update";
export {default as InsertFix} from "./Appointment/Fix/Insert";
export {default as DeleteFix} from "./Appointment/Fix/Delete";
export {default as GetFixes} from "./Appointment/Fix/Select";
export {default as UpdateLabel} from "./Appointment/Label/Update";
export {default as UpdateNote} from "./Appointment/Note/Update";
export {default as InsertNote} from "./Appointment/Note/Insert";
export {default as DeleteNote} from "./Appointment/Note/Delete";
export {default as UpdatePart} from "./Appointment/Part/Update";
export {default as InsertPart} from "./Appointment/Part/Insert";
export {default as DeleteFixPart} from "./Appointment/Part/Delete";
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
export {default as AuthenticateLookup} from "./Appointment/Lookup";
export {default as UpdateCustomer} from "./Customer/Update";
export {default as UpdateEvent} from "./Employee/Event/Update";
export {default as InsertEvent} from "./Employee/Event/Insert";
export {default as DeleteEvent} from "./Employee/Event/Delete";
export {default as GetEvents} from "./Employee/Event/Select";
export {default as GetEventSharees} from "./Employee/SharedEvent/Select";
export {default as InsertEventSharee} from "./Employee/SharedEvent/Insert";
export {default as DeleteEventSharees} from "./Employee/SharedEvent/Delete";
export {default as AuthenticateLogin} from "./Employee/Login";

export { 
    GetStatus,
    GetStatusDesc,
    GetService,
    GetLabel,
    GetMake
} from "./Info/Info";

export {
    Remove, 
    Restore
} from "./Appointment/Deleted/General";

export {
    GetEmployeeNotesData,
    GetCustomerNotesData
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
    Get as GetAppointment,
    GetAll as GetAllAppointments,
    GetSummary as GetAppointmentSummary,
} from "./Appointment/Appointment";

export {
    Get as GetEmployee,
    GetAll as GetAllEmployees
} from "./Employee/Employee";
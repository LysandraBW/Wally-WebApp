export interface SessionParameter {
    SessionID: string;
}

export interface SessionAppParameters {
    SessionID: string;
    AppointmentID: string;
}

export interface UpdateVehicleParameters {
    SessionID: string;
    AppointmentID: string;
    Make: string | null;
    Model: string | null;
    ModelYear: number | null;
    VIN: string | null;
    Mileage: number | null;
    LicensePlate: string | null;
}

export interface UpdateStatusParameters {
    SessionID: string;
    AppointmentID: string;
    StatusID: number | null;
}

export interface MutateNoteShareeParameters {
    SessionID: string;
    NoteID: number;
    NoteShareeID: string;
}

export interface GetNoteShareesParameters {
    SessionID: string;
    NoteID: number;
}

export interface UpdateServiceParameters {
    SessionID: string;
    AppointmentID: string;
    ServiceID: number;
    Service: string | null;
    Division: string | null;
    Class: string | null;
}

export interface DeleteRepairParameters {
    SessionID: string;
    AppointmentID: string;
    RepairID: number;
}

export interface InsertRepairParameters {
    SessionID: string;
    AppointmentID: string;
    Repair: string;
}

export interface UpdateRepairParameters {
    SessionID: string;
    AppointmentID: string;
    RepairID: number;
    Repair: string | null;
}

export interface DeletePaymentParameters {
    SessionID: string;
    AppointmentID: string;
    PaymentID: number;
}

export interface InsertPaymentParameters {
    SessionID: string;
    AppointmentID: string;
    Payment: number;
}

export interface InsertCreditCardParameters {
    SessionID: string;
    AppointmentID: string;
    PaymentID: number;
    Name: string;
    Type: string;
    CCN: string;
    EXP: string;
}

export interface UpdateCostParameters {
    SessionID: string;
    AppointmentID: string;
    Cost: number | null;
}

export interface DeletePartParameters {
    SessionID: string;
    AppointmentID: string;
    PartID: number;
}

export interface InsertPartParameters {
    SessionID: string;
    AppointmentID: string;
    PartName: string;
    PartNumber: string;
    Quantity: number;
    UnitCost: number;
}

export interface UpdatePartParameters {
    SessionID: string;
    AppointmentID: string;
    PartID: number;
    PartName: string | null;
    PartNumber: string | null;
    Quantity: number | null;
    UnitCost: number | null;
}

export interface DeleteNoteParameters {
    SessionID: string;
    AppointmentID: string;
    NoteID: number;
}

export interface DeleteNoteAttachmentData {
    SessionID: string;
    NoteID: number;
    AttachmentID: number;
}

export interface InsertNoteParameters {
    SessionID: string;
    AppointmentID: string;
    Head: string;
    Body: string;
    ShowCustomer: number;
}

export interface InsertNoteAttachmentParameters {
    SessionID: string;
    NoteID: number;
    Name: string;
    Type: string;
    URL: string;
}

export interface UpdateNoteParameters {
    SessionID: string;
    AppointmentID: string;
    NoteID: number;
    Head: string | null;
    Body: string | null;
    ShowCustomer: number | null;
}

export interface UpdateLabelParameters {
    SessionID: string;
    AppointmentID: string;
    LabelID: number;
}

export interface DeleteDiagnosisParameters {
    SessionID: string;
    AppointmentID: string;
    DiagnosisID: number;
}

export interface InsertDiagnosisParameters {
    SessionID: string;
    AppointmentID: string;
    Code: string;
    Message: string;
}

export interface UpdateDiagnosisParameters {
    SessionID: string;
    AppointmentID: string;
    DiagnosisID: number;
    Code: string | null;
    Message: string | null;
}

export interface UpdateDateParameters {
    SessionID: string;
    AppointmentID: string;
    StartDate: string | null;
    EndDate: string | null;
}

export interface InsertAppointmentParameters {
    SessionID?: string;
    FName: string;
    LName: string;
    Email: string;
    Phone: string;
    Make: string;
    Model: string;
    ModelYear: number;
    VIN?: string;
}

export interface GetAllParameters {
    SessionID: string;
    PageNumber?: number;
    PageSize?: number;
    LookAhead?: number;
    Search?: string;
    Deleted?: number;
    LabelID?: number;
    StatusID?: number;
    FName?: number;
    LName?: number;
    Make?: number;
    Model?: number;
    ModelYear?: number;
    CreationDate?: number;
    StartDate?: number;
    EndDate?: number;
    Cost?: number;
}

export interface AuthenticateLookupParameters {
    AppointmentID: string;
    Email: string;
}

export interface UpdateCustomerParameters {
    SessionID: string;
    AppointmentID: string;
    FName: string | null;
    LName: string | null;
    Email: string | null;
    Phone: string | null;
}

export interface MutateEventShareeParameters {
    SessionID: string;
    EventID: number;
    EventShareeID: string;
}

export interface GetEventShareesParameters {
    SessionID: string;
    EventID: number;
}

export interface UpdateEventParameters {
    SessionID: string;
    EventID: number;
    Name: string | null;
    Date: string | null;
    Summary: string | null;
}

export interface InsertEventParameters {
    SessionID: string;
    Name: string;
    Date: string;
    Summary: string;
}

export interface DeleteEventParameters {
    SessionID: string;
    EventID: number;
}

export interface AuthenticateLoginParameters {
    Username: string;
    Password: string;
}

export interface DeleteServiceParameters {
    SessionID: string;
    AppointmentID: string;
    ServiceID: number;
}

export interface InsertDefinedServiceParameters {
    SessionID?: string;
    AppointmentID: string;
    ServiceID: number;
}

export interface InsertServiceParameters {
    SessionID: string;
    AppointmentID: string;
    Service: string;
    Division: string;
    Class: string;
}
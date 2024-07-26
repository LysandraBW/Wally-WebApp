
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
    Make: string;
    Model: string;
    ModelYear: number;
    VIN: string;
    Mileage: number;
    LicensePlate: string;
}

export interface UpdateStatusParameters {
    SessionID: string;
    AppointmentID: string;
    StatusID: number;
}

export interface MutateNoteShareeParameters {
    SessionID: string;
    NoteID: number;
    NoteShareeID: number;
}

export interface GetNoteShareesParameters {
    SessionID: string;
    NoteID: number;
}

export interface UpdateServiceParameters {
    SessionID: string;
    AppointmentID: string;
    ServiceID: number;
    Service: string;
    Division: string;
    Class: string;
}

export interface DeleteRepairParameters {
    SessionID: string;
    AppointmentID: string;
    RepairID: number;
}

export interface InsertRepairParameters {
    SessionID: string;
    AppointmentID: string;
    Repair: number;
}

export interface UpdateRepairParameters {
    SessionID: string;
    AppointmentID: string;
    RepairID: number;
    Repair: string;
}

export interface DeletePaymentParameters {
    SessionID: string;
    AppointmentID: string;
    PaymentID: number;
}

export interface InsertPaymentParameters {
    SessionID: string;
    AppointmentID: string;
    Payment: string;
}

export interface InsertCreditCardParameters {
    SessionID: string;
    AppointmentID: string;
    PaymentID: number;
    Name: string;
    Type: string;
    CNN: string;
    EXP: string;
}

export interface UpdateCostParameters {
    SessionID: string;
    AppointmentID: string;
    Cost: string;
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
    UnitCost: string;
}

export interface UpdatePartParameters {
    SessionID: string;
    AppointmentID: string;
    PartID: number;
    PartName: string;
    PartNumber: string;
    Quantity: number;
    UnitCost: string;
}

export interface DeleteNoteParameters {
    SessionID: string;
    AppointmentID: string;
    NoteID: number;
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
    URL: string;
}

export interface UpdateNoteParameters {
    SessionID: string;
    AppointmentID: string;
    NoteID: number;
    Head: string;
    Body: string;
    ShowCustomer: number;
}

export interface GetAllLabelsParameters {
    SessionID: string;
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
    Code: string;
    Message: string;
}

export interface UpdateDateParameters {
    SessionID: string;
    AppointmentID: string;
    StartDate: string;
    EndDate: string;
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
    FName: string;
    LName: string;
    Email: string;
    Phone: string;
}

export interface MutateEventShareeParameters {
    SessionID: string;
    EventID: number;
    EventShareeID: number;
}

export interface GetEventShareesParameters {
    SessionID: string;
    EventID: number;
}

export interface UpdateEventParameters {
    SessionID: string;
    EventID: number;
    Name?: string;
    Date?: string;
    Summary?: string;
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
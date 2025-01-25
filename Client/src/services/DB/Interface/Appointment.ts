import { DB_EmployeeNote, DB_Note } from "./Employee";

export interface DB_AppointmentLabel {
    LabelID: number;
    AppointmentID: string;
    Label: string;
    Value: number | null;
}

export interface DB_SingleAppointmentLabel {
    [Label: string]: DB_AppointmentLabel;
}

export interface DB_MultipleAppointmentLabels {
    [AppointmentID: string]: DB_SingleAppointmentLabel;
}

export interface DB_Appointment {
    AppointmentID: string;
    CustomerID: number;
    FName: string;
    LName: string;
    Email: string;
    Phone: string;
    CreationDate: Date;
    UpdationDate: Date;
    StartDate: string | null;
    EndDate: string | null;
    Cost: number;
    StatusID: number;
    Status: string;
    Make: string;
    Model: string;
    ModelYear: number;
    VIN: string;
    Mileage: number;
    LicensePlate: string;
    Labels: DB_SingleAppointmentLabel;
    Notes: Array<DB_EmployeeNote>;
    Parts: Array<DB_AppointmentPart>;
    Repairs: Array<DB_AppointmentRepair>;
    Payments: Array<DB_AppointmentPayment>;
    Services: Array<DB_AppointmentService>;
    Diagnoses: Array<DB_AppointmentDiagnosis>;
}

export interface DB_AppointmentSummary {
    AppointmentID: string;
    CustomerID: number;
    FName: string;
    LName: string;
    Email: string;
    Phone: string;
    CreationDate: Date;
    UpdationDate: Date;
    StartDate: Date;
    EndDate: Date;
    Cost: number;
    StatusID: number;
    Status: string;
    Make: string;
    Model: string;
    ModelYear: number;
    VIN: string;
    Mileage: number;
    LicensePlate: string;
    Notes: Array<DB_Note>;
    Repairs: Array<DB_AppointmentRepair>;
    Services: Array<DB_AppointmentService>;
    Diagnoses: Array<DB_AppointmentDiagnosis>;
}

export interface DB_AppointmentOverview {
    AppointmentID: string;
    CustomerID: number;
    FName: string;
    LName: string;
    Email: string;
    Phone: string;
    CreationDate: Date;
    UpdationDate: Date;
    StartDate: Date;
    EndDate: Date;
    Cost: number;
    StatusID: number;
    Status: number;
    Make: string;
    Model: string;
    ModelYear: number;
    VIN: string;
    Mileage: number;
    LicensePlate: string;
}

export interface DB_AppointmentOverviews {
    Count: number;
    Labels: DB_MultipleAppointmentLabels;
    Appointments: Array<DB_AppointmentOverview>;
}

export interface DB_AppointmentPayment {
    AppointmentID: string;
    PaymentID: string;
    Payment: number;
    PaymentDate: Date;
    Name: string;
    Type: string;
    CCN: string;
    EXP: string;
}

export interface DB_AppointmentRepair {
    RepairID: number;
    Repair: string;
}

export interface DB_AppointmentPart {
    PartID: number;
    PartName: string;
    PartNumber: string;
    Quantity: number;
    UnitCost: number;
}

export interface DB_AppointmentDiagnosis {
    DiagnosisID: number;
    Code: string;
    Message: string;
}

export interface DB_AppointmentService {
    AppointmentServiceID: number;
    AppointmentID: string;
    Class: string;
    Division: string;
    Service: string;
    ServiceID: number | null;
}
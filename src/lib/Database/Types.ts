export interface DB_Status {
    StatusID:       number;
    Status:         string;
    Description:    string;
}

export interface DB_Service {
    Class:      string;
    ClassID:    number;
    Division:   string;
    DivisionID: number;
    Service:    string;
    ServiceID:  number;
}

export interface DB_Label {
    LabelID:    number;
    Label:      string;
}

export interface DB_Make {
    Make: string;
}

export interface DB_Employee {
    EmployeeID: string;
    FName: string;
    LName: string;
    Email: string;
    Phone: string;
}

export interface DB_GeneralEmployee {
    EmployeeID: string;
    FName: string;
    LName: string;
}

export interface DB_AppointmentService {
    AppointmentServiceID: number;
    AppointmentID: string;
    Class: string;
    Division: string;
    Service: string;
    ServiceID: number | null;
}

export interface DB_Event {
    EventID:    number;
    EmployeeID: number;
    Name:       string;
    Date:       Date;
    Summary:    string;
}

export interface DB_EventSharee {
    ShareeFName:    string;
    ShareeLName:    string;
    ShareeID:       number;
}

export interface DB_Payment {
    AppointmentID:  string;
    PaymentID:      number;
    Payment:        number;
    PaymentDate:    Date;
    Name:           string;
    Type:           string;
    CCN:            string;
    EXP:            string;
}

export interface DB_Repair {
    RepairID:   number;
    Repair:     string;
}

export interface DB_Part {
    PartID:     number;
    PartName:   string;
    PartNumber: string;
    Quantity:   number;
    UnitCost:   number;
}

export interface DB_Diagnosis {
    DiagnosisID:    number;
    Code:           string;
    Message:        string;
}

export interface DB_NoteSharee {
    ShareeFName:    string;
    ShareeLName:    string;
    ShareeID:       string;
}

export interface DB_Attachment {
    NoteID: number;
    AttachmentID: number;
    URL:    string;
    Name:   string;
}

export interface DB_Note {
    NoteID:         number;
    EmployeeID:     string;
    AppointmentID:  string;
    Head:           string;
    Body:           string;
    ShowCustomer:   number;
    CreationDate:   Date;
    UpdationDate:   Date;
    Attachments:    Array<DB_Attachment>;
}

export interface DB_EmployeeNote extends DB_Note {
    OwnerFName: string;
    OwnerLName: string;
    OwnerID:    string;
}

export interface DB_AppointmentLabel {
    LabelID: number;
    Label: string;
    Value: number;
}

export interface DB_EmployeeLabel extends DB_AppointmentLabel {
    AppointmentID: string;
}

export interface DB_EmployeeLabels {
    [AppointmentID: string]: Array<DB_EmployeeLabel>
}

export interface DB_Appointment {
    AppointmentID:  string;
    CustomerID:     number;
    FName:          string;
    LName:          string;
    Email:          string;
    Phone:          string;
    CreationDate:   Date;
    UpdationDate:   Date;
    StartDate:      Date;
    EndDate:        Date;
    Cost:           string;
    StatusID:       number;
    Status:         string;
    Make:           string;
    Model:          string;
    ModelYear:      number;
    VIN:            string;
    Mileage:        number;
    LicensePlate:   string;
    Services:       Array<DB_AppointmentService>,
    Diagnoses:      Array<DB_Diagnosis>,
    Repairs:        Array<DB_Repair>
    Parts:          Array<DB_Part>
    Payments:       Array<DB_Payment>
    Labels:         Array<DB_AppointmentLabel>;
    Notes:          Array<DB_EmployeeNote>;
}

export interface DB_AppointmentSummary {
    AppointmentID:  string;
    CustomerID:     number;
    FName:          string;
    LName:          string;
    Email:          string;
    Phone:          string;
    CreationDate:   Date;
    UpdationDate:   Date;
    StartDate:      Date;
    EndDate:        Date;
    Cost:           string;
    StatusID:       number;
    Status:         string;
    Make:           string;
    Model:          string;
    ModelYear:      number;
    VIN:            string;
    Mileage:        number;
    LicensePlate:   string;
    Services:       Array<DB_Service>;
    Diagnoses:      Array<DB_Diagnosis>;
    Repairs:        Array<DB_Repair>;
    Notes:          Array<DB_Note>; 
}

export interface DB_AppointmentOverview {
    AppointmentID:  string;
    CustomerID:     number;
    FName:          string;
    LName:          string;
    Email:          string;
    Phone:          string;
    CreationDate:   Date;
    UpdationDate:   Date;
    StartDate:      Date;
    EndDate:        Date;
    Cost:           string;
    StatusID:       number;
    Status:         string;
    Make:           string;
    Model:          string;
    ModelYear:      number;
    VIN:            string;
    Mileage:        number;
    LicensePlate:   string;
}

export interface DB_Appointments {
    all: Array<DB_AppointmentOverview>;
    labels: DB_EmployeeLabels;
    count: number;
}
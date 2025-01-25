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

export interface DB_EmployeeName {
    EmployeeID: string;
    Name: string;
}

export interface DB_Event {
    EventID: number;
    EmployeeID: string;
    Name: string;
    Date: string;
    Summary: string;
    AppointmentID: string | null;
    Sharees: Array<{
        ShareeID: string;
        EventID: string;
    }>;
}

export interface DB_EventSharee {
    ShareeFName: string;
    ShareeLName: string;
    ShareeID: string;
}

export interface DB_Note {
    NoteID: string;
    EmployeeID: string;
    AppointmentID: string;
    Head: string;
    Body: string;
    ShowCustomer: string;
    CreationDate: Date;
    UpdationDate: Date;
    Sharees: Array<{
        ShareeID: string;
        NoteID: string;
    }>;
    Attachments: Array<DB_NoteAttachment>;
}

export interface DB_NoteSharee {
    ShareeFName: string;
    ShareeLName: string;
    ShareeID: string;
}

export interface DB_NoteAttachment {
    NoteID: number;
    AttachmentID: number;
    URL: string;
    Name: string;
}

export interface DB_EmployeeNote extends DB_Note {
    OwnerFName: string;
    OwnerLName: string;
    OwnerID: string;
}
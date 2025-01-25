export interface DB_Make {
    Make: string;
}

export interface DB_Label {
    LabelID: number;
    Label: string;
}

export interface DB_Status {
    StatusID: number;
    Status: string;
    Description: string;
}

export interface DB_Service {
    ClassID: number;
    DivisionID: number;
    ServiceID: number;
    Class: string;
    Division: string;
    Service: string;
}

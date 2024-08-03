import { 
    DB_AppointmentService, 
    DB_Diagnosis,
    DB_Repair 
} from "@/database/Types";

export type UpdatePart = {
    PartID:     number;
    PartName:   string;
    PartNumber: string;
    Quantity: string;
    UnitCost: string;
};

export interface ServiceFormStructure {
    AppointmentID:  string;
    Diagnoses:      {[diagnosisID:  string]:    DB_Diagnosis};
    Repairs:        {[repairID:     string]:    DB_Repair};
    Parts:          {[partID:       string]:    UpdatePart};
    Services:       {[serviceID:    string]:    DB_AppointmentService};
}
import { 
    DB_AppointmentService, 
    DB_Diagnosis, 
    DB_Part, 
    DB_Repair 
} from "@/database/Types";

export interface ServiceFormStructure {
    AppointmentID:  string;
    Services:       {[serviceID:    string]:    DB_AppointmentService};
    Diagnoses:      {[diagnosisID:  string]:    DB_Diagnosis};
    Repairs:        {[repairID:     string]:    DB_Repair};
    Parts:          {[partID:       string]:    DB_Part};
}
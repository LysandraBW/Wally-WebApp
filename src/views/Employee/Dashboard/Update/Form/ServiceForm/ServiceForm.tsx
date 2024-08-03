import { DB_AppointmentService, DB_Diagnosis, DB_Part, DB_Repair } from "@/database/Types";
import { FormType } from "@/process/Employee/Update/Form/UpdateForm";
import ServiceManager from "./Service/ServiceManager";
import DiagnosisManager from "./Diagnosis/DiagnosisManager";
import RepairManager from "./Repair/RepairManager";
import PartManager from "./Part/PartManager";

interface ServiceProps {
    form: {
        Services:   {[serviceID: string]:   DB_AppointmentService};
        Diagnoses:  {[diagnosisID: string]: DB_Diagnosis};
        Repairs:    {[repairID: string]:    DB_Repair};
        Parts:      {[partID: string]:      DB_Part};
    };
    updateFormState: (state: boolean) => void;
    changeHandler: (formPart: FormType, name: string, value: any) => void;
}

export default function ServiceForm(props: ServiceProps) {
    return (
        <>
            <div>
                <ServiceManager
                    services={props.form.Services}
                    updateFormState={props.updateFormState}
                    onChange={(updatedValue) => props.changeHandler('Service', 'Services', updatedValue)}
                />
            </div>
            <div>
                <DiagnosisManager
                    diagnoses={props.form.Diagnoses}
                    updateFormState={props.updateFormState}
                    onChange={(updatedValue) => props.changeHandler('Service', 'Diagnoses', updatedValue)}
                />
            </div>
            <div>
                <RepairManager
                    repairs={props.form.Repairs}
                    updateFormState={props.updateFormState}
                    onChange={(updatedValue) => props.changeHandler('Service', 'Repairs', updatedValue)}
                />
            </div>
            <div>
                <PartManager
                    parts={props.form.Parts}
                    updateFormState={props.updateFormState}
                    onChange={(updatedValue) => props.changeHandler('Service', 'Parts', updatedValue)}
                />
            </div>
        </>
    )
}
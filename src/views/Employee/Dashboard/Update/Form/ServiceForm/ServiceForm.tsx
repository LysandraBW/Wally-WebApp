import ServiceManager from "./Service/ServiceManager";
import DiagnosisManager from "./Diagnosis/DiagnosisManager";
import RepairManager from "./Repair/RepairManager";
import PartManager from "./Part/PartManager";
import { DiagnosesStructure, PartsStructure, RepairsStructure, ServicesStructure } from "@/submission/Employee/Update/Service/Form";
import { FormType } from "@/submission/Employee/Update/Form";
import { DB_Appointment } from "@/database/Types";

interface ServiceProps {
    appointment: DB_Appointment;
}

export default function ServiceForm(props: ServiceProps) {
    return (
        <>
            <div>
                <ServiceManager
                    appointment={props.appointment}
                />
            </div>
            <div>
                <DiagnosisManager
                    diagnoses={props.form.Diagnoses}
                    updateFormState={props.updateFormState}
                    onChange={(updatedValue) => props.changeHandler(FormType.Service, 'Diagnoses', updatedValue)}
                />
            </div>
            <div>
                <RepairManager
                    repairs={props.form.Repairs}
                    updateFormState={props.updateFormState}
                    onChange={(updatedValue) => props.changeHandler(FormType.Service, 'Repairs', updatedValue)}
                />
            </div>
            <div>
                <PartManager
                    parts={props.form.Parts}
                    updateFormState={props.updateFormState}
                    onChange={(updatedValue) => props.changeHandler(FormType.Service, 'Parts', updatedValue)}
                />
            </div>
        </>
    )
}
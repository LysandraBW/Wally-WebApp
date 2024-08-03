import ServiceManager from "./Service/ServiceManager";
import DiagnosisManager from "./Diagnosis/DiagnosisManager";
import RepairManager from "./Repair/RepairManager";
import PartManager from "./Part/PartManager";
import { DiagnosesStructure, PartsStructure, RepairsStructure, ServicesStructure } from "@/submission/Employee/Update/Service/Form";
import { FormType } from "@/submission/Employee/Update/Form";

interface ServiceProps {
    form: {
        Services: ServicesStructure;
        Diagnoses: DiagnosesStructure;
        Repairs: RepairsStructure;
        Parts: PartsStructure;
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
                    onChange={(updatedValue) => props.changeHandler(FormType.Service, 'Services', updatedValue)}
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
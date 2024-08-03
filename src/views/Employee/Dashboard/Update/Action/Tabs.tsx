import { FormType } from "@/submission/Employee/Update/Form";


interface FormTabsProps {
    currentForm: FormType;
    updateCurrentForm: (formPart: FormType) => void;
}

export default function FormTabs(props: FormTabsProps) {
    return (
        <div>
            <span onClick={() => props.updateCurrentForm(FormType.General)}>General</span>
            <span onClick={() => props.updateCurrentForm(FormType.Vehicle)}>Vehicle</span>
            <span onClick={() => props.updateCurrentForm(FormType.Service)}>Service</span>
            <span onClick={() => props.updateCurrentForm(FormType.Payment)}>Payment</span>
        </div>
    )
}
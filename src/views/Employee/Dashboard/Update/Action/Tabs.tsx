import { FormType } from "@/submission/Employee/Update/Form/Form"

interface FormTabsProps {
    currentForm: FormType;
    updateCurrentForm: (formPart: FormType) => void;
}

export default function FormTabs(props: FormTabsProps) {
    return (
        <div>
            <span onClick={() => props.updateCurrentForm('General')}>General</span>
            <span onClick={() => props.updateCurrentForm('Vehicle')}>Vehicle</span>
            <span onClick={() => props.updateCurrentForm('Service')}>Service</span>
            <span onClick={() => props.updateCurrentForm('Payment')}>Payment</span>
        </div>
    )
}
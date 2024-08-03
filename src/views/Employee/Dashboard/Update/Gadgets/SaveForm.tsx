import { submitGeneralForm } from "@/process/Employee/Update/Form/Form/General/Submit";
import { submitNoteForm } from "@/process/Employee/Update/Form/Form/Note/Submit";
import { submitPaymentForm } from "@/process/Employee/Update/Form/Form/Payment/Submit";
import { submitServiceForm } from "@/process/Employee/Update/Form/Form/Service/Submit";
import { submitVehicleForm } from "@/process/Employee/Update/Form/Form/Vehicle/Submit";
import { FormType } from "@/process/Employee/Update/Form/UpdateForm";

interface SaveFormProps {
    currentForm: FormType;
    onSave: <T,> (submitFunction: (a: T, b: T) => Promise<boolean>) => void;
}

export default function SaveForm(props: SaveFormProps) {
    const sendSubmitFunction =  () => {
        switch (props.currentForm) {
            case 'General':
                props.onSave(submitGeneralForm);
            case 'Vehicle':
                props.onSave(submitVehicleForm);
            case 'Note':
                props.onSave(submitNoteForm);
            case 'Service':
                props.onSave(submitServiceForm);
            case 'Payment':
                props.onSave(submitPaymentForm);
        }
    }

    return (
        <button onClick={() => sendSubmitFunction()}>
            Save
        </button>
    )
}
import { submitGeneralForm } from "@/submission/Employee/Update/General/Submit";
import { submitNoteForm } from "@/submission/Employee/Update/Form/Note/Submit";
import { submitPaymentForm } from "@/submission/Employee/Update/Form/Payment/Submit";
import { submitServiceForm } from "@/submission/Employee/Update/Service/Submit";
import { submitVehicleForm } from "@/submission/Employee/Update/Form/Vehicle/Submit";
import { FormType } from "@/submission/Employee/Update/Form/Form";

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
import { FormType } from "@/submission/Employee/Update/Form";
import { submitGeneralForm } from "@/submission/Employee/Update/General/Submit";
import { submitNoteForm } from "@/submission/Employee/Update/Note/Submit";
import { submitPaymentForm } from "@/submission/Employee/Update/Payment/Submit";
import { submitServiceForm } from "@/submission/Employee/Update/Service/Submit";
import { submitVehicleForm } from "@/submission/Employee/Update/Vehicle/Submit";

interface SaveFormProps {
    currentForm: FormType;
    onSave: <T,> (submitFunction: (a: T, b: T) => Promise<boolean>) => void;
}

export default function SaveForm(props: SaveFormProps) {
    const sendSubmitFunction =  () => {
        switch (props.currentForm) {
            case FormType.General:
                props.onSave(submitGeneralForm);
            case FormType.Vehicle:
                props.onSave(submitVehicleForm);
            case FormType.Note:
                props.onSave(submitNoteForm);
            case FormType.Service:
                props.onSave(submitServiceForm);
            case FormType.Payment:
                props.onSave(submitPaymentForm);
        }
    }

    return (
        <button onClick={() => sendSubmitFunction()}>
            Save
        </button>
    )
}
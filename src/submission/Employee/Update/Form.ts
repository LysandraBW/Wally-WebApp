import { GeneralFormStructure } from "./General/Form";
import { VehicleFormStructure } from "./Vehicle/Form";
import { ServiceFormStructure } from "./Service/Form";
import { PaymentFormStructure } from "./Payment/Form";
import { NoteFormStructure } from "./Note/Form";

export type FormType = 'General' | 'Vehicle' | 'Service' | 'Payment' | 'Note';

export interface UpdateStructure {
    General:    GeneralFormStructure;
    Vehicle:    VehicleFormStructure;
    Service:    ServiceFormStructure;
    Payment:    PaymentFormStructure;
    Note:       NoteFormStructure;
}

export interface UpdateFormStructure {
    current:    UpdateStructure;
    reference:  UpdateStructure;
}
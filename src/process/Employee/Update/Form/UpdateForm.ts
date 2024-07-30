import { GeneralFormStructure } from "./Form/General/General";
import { VehicleFormStructure } from "./Form/Vehicle/Vehicle";
import { ServiceFormStructure } from "./Form/Service/Service";
import { PaymentFormStructure } from "./Form/Payment/Payment";
import { NoteFormStructure } from "./Form/Note/Note";

export type FormPart = 'General' | 'Vehicle' | 'Service' | 'Payment' | 'Note';

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
import { GeneralFormStructure } from "./General/Form";
import { VehicleFormStructure } from "./Vehicle/Form";
import { ServiceFormStructure } from "./Service/Form";
import { PaymentFormStructure } from "./Payment/Form";
import { NoteFormStructure } from "./Note/Form";

export enum FormType {General, Vehicle, Service, Payment, Note};

export interface UpdateStructure {
    [FormType.General]:    GeneralFormStructure;
    [FormType.Vehicle]:    VehicleFormStructure;
    [FormType.Service]:    ServiceFormStructure;
    [FormType.Payment]:    PaymentFormStructure;
    [FormType.Note]:       NoteFormStructure;
}

export interface UpdateFormStructure {
    current:    UpdateStructure;
    reference:  UpdateStructure;
}
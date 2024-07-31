import { UpdateEvent } from "./Form/Form";

export interface ControllerStructure {
    Date:           Date;
    OpenDay:        number;
    OpenEvent:      UpdateEvent | null;
    AddEvent:       boolean;
}

export const Controller: ControllerStructure = {
    Date:           new Date(),
    OpenDay:        0,
    OpenEvent:      null,
    AddEvent:       false
}
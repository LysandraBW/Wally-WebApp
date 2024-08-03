import { UpdateEvent } from "@/submission/Employee/Calendar/Form";

export interface ControllerStructure {
    Date: Date;
    OpenDay: number;
    OpenEvent: UpdateEvent | null;
    AddEvent: boolean;
}

export const DefaultController: ControllerStructure = {
    Date: new Date(),
    OpenDay: 0,
    OpenEvent: null,
    AddEvent: false
}
import { UpdateEvent } from "@/submission/Employee/Calendar/Form";

export interface ControllerStructure {
    Date: Date;
    OpenedEvents: number;
    OpenedEvent: UpdateEvent | null;
    AddEvent: boolean;
}

export const DefaultController: ControllerStructure = {
    Date: new Date(),
    OpenedEvents: 0,
    OpenedEvent: null,
    AddEvent: false
}
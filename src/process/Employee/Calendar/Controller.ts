export interface ControllerStructure {
    Date:           Date;
    Month:          number;
    Year:           number;
    OpenDay:        number | null;
    OpenEventID:    number | null;
    AddEvent:       boolean;
}

export const Controller: ControllerStructure = {
    Date:           new Date(),
    Month:          0,
    Year:           0,
    OpenDay:        -1,
    OpenEventID:    -1,
    AddEvent:       false
}
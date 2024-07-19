export interface FormStructure {
    fName:     string;
    lName:     string;
    email:     string;
    phone:     string;
    vin:       string;
    make:      Array<string>;
    model:     Array<string>;
    modelYear: Array<number>;
    services:  Array<number>;
    // Just here to appease the
    // compiler.
    [key: string]:  any;
}

export const Form: FormStructure = {
    fName:      "",
    lName:      "",
    email:      "",
    phone:      "",
    vin:        "",
    make:       [],
    model:      [],
    modelYear:  [],
    services:   []
}
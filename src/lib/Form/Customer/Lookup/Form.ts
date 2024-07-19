export interface FormStructure {
    fName: string;
    lName: string;
    email: string;
    appointmentID: number | null;
}

export const Form: FormStructure = {
    fName: "",
    lName: "",
    email: "",
    appointmentID: null
}
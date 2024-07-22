"use server";
import { FormStructure } from "./Form";
import { processForm } from "./ProcessedForm";
import { InsertAppointment, InsertDefinedService } from "@/lib/Database/Export";

const submitForm = async (form: FormStructure): Promise<string> => {
    let processedForm = processForm(form);

    const AppointmentID = await InsertAppointment({
        SessionID: null,
        ...processedForm.Scalar
    });

    // Error on Insertion
    if (!AppointmentID)
        return '';

    for (const ServiceID of processedForm.NonScalar.Services) {
        const serviceID = await InsertDefinedService({
                SessionID: null,
                AppointmentID,
                ServiceID
        });

        // Error on Insertion
        if (!serviceID)
            return '';
    }

    return AppointmentID;
}

export default submitForm;
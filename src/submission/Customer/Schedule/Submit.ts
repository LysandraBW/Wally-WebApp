"use server";
import { FormStructure } from "./Form";
import { processForm } from "./Process";
import { InsertAppointment, InsertDefinedService } from "@/database/Export";

const submitForm = async (form: FormStructure): Promise<string> => {
    let processedForm = processForm(form);

    const AppointmentID = await InsertAppointment(processedForm.Scalar);
    if (!AppointmentID)
        return '';

    for (const ServiceID of processedForm.NonScalar.Services) {
        const serviceID = await InsertDefinedService({
            AppointmentID,
            ServiceID
        });

        if (!serviceID)
            return '';
    }
    
    return AppointmentID;
}

export default submitForm;
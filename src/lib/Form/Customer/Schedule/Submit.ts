"use server";
import { FormStructure } from "./Form";
import { processForm } from "./ProcessedForm";
import { InsertAppointment, InsertDefinedService } from "@/lib/Database/Export";

const submitForm = async (form: FormStructure): Promise<number> => {
    let processedForm = processForm(form);

    const AppointmentID = await InsertAppointment({
        EmployeeID: null,
        ...processedForm.Scalar
    });

    // Error on Insertion
    if (!AppointmentID)
        return 0;

    for (const ServiceID of processedForm.NonScalar.Services) {
        const serviceID = await InsertDefinedService({
                EmployeeID: null,
                AppointmentID,
                ServiceID,
                FName: processedForm.Scalar.FName,
                LName: processedForm.Scalar.LName,
                Email: processedForm.Scalar.Email
        });

        // Error on Insertion
        if (!serviceID)
            return 0;
    }

    return AppointmentID;
}

export default submitForm;
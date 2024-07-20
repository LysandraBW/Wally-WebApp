"use server";
import { FormStructure } from "./Form";
import { processForm } from "./ProcessedForm";
import { InsertAppointment, InsertDefinedService } from "@/lib/Database/Export";
import { UserType } from "@/lib/Database/Connection";

const submitForm = async (form: FormStructure): Promise<number> => {
    let processedForm = processForm(form);

    const AppointmentID = await InsertAppointment(
        UserType.Default,
        {
            EmployeeID: null,
            ...processedForm.Scalar
        }
    );

    if (!AppointmentID)
        return 0;

    for (const ServiceID of processedForm.NonScalar.Services) {
        const serviceID = await InsertDefinedService(
            UserType.Default,
            {
                EmployeeID: null,
                AppointmentID,
                ServiceID,
                FName: processedForm.Scalar.FName,
                LName: processedForm.Scalar.LName,
                Email: processedForm.Scalar.Email
            }
        );

        if (!serviceID)
            return 0;
    }

    return AppointmentID;
}

export default submitForm;
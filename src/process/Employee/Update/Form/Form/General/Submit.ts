import { getSessionID } from "@/lib/Cookies/Cookies";
import { GeneralFormStructure } from "./General";
import { ProcessedGeneralFormStructure, processGeneralForm } from "./Process";
import { UpdateCustomer, UpdateDate, UpdateStatus } from "@/database/Export";

export async function submitGeneralForm(reference: GeneralFormStructure, current: GeneralFormStructure): Promise<boolean> {
    const processedForm: ProcessedGeneralFormStructure = await processGeneralForm(reference, current);
    
    const SessionID = await getSessionID();
    const AppointmentID = processedForm.AppointmentID;

    // Update Customer
    const customerOutput = await UpdateCustomer({
        SessionID,
        AppointmentID,
        FName: processedForm.FName,
        LName: processedForm.LName,
        Email: processedForm.Email,
        Phone: processedForm.Phone
    });

    if (!customerOutput)
        throw 'Customer Error';

    // Update Date
    const dateOutput = await UpdateDate({
        SessionID,
        AppointmentID,
        StartDate: processedForm.StartDate,
        EndDate: processedForm.EndDate
    });
    
    if (!dateOutput)
        throw 'Date Error';

    // Update Status
    if (processedForm.StatusID) {
        const statusOutput = await UpdateStatus({
            SessionID,
            AppointmentID,
            StatusID: processedForm.StatusID
        });
    
        if (!statusOutput)
            throw 'Error';
    }

    return true;
}
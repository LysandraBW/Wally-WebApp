'use server';
import { uploadFile } from "@/lib/Files/Upload";
import { 
    ProcessedNotesFormStructure,
    ProcessedGeneralFormStructure,
    ProcessedVehicleFormStructure,
    ProcessedServicesFormStructure,
    ProcessedCostFormStructure,
    processNotesForm,
    processGeneralForm
} from "./Process";
import { BeginCommit, EndCommit } from "@/lib/Database/Info/Info";
import { getSessionID } from "@/lib/Cookies/Cookies";
import { User } from "@/lib/Database/User";
import { DeleteDiagnosis, DeleteNote, DeleteNoteAttachment, DeletePayment, DeleteRepair, DeleteService, InsertCreditCard, InsertDiagnosis, InsertNote, InsertNoteAttachment, InsertNoteSharee, InsertPart, InsertPayment, InsertRepair, InsertService, UpdateCost, UpdateCustomer, UpdateDate, UpdateDiagnosis, UpdateNote, UpdatePart, UpdateRepair, UpdateService, UpdateStatus, UpdateVehicle } from "@/lib/Database/Export";
import DeleteNoteSharee from "@/lib/Database/Appointment/SharedNote/Delete";
import DeletePart from "@/lib/Database/Appointment/Part/Delete";
import { GeneralFormStructure, NotesFormStructure } from "./Form";

export async function submitNotesForm(ref: NotesFormStructure, cur: NotesFormStructure): Promise<boolean> {
    const processedForm: ProcessedNotesFormStructure = await processNotesForm(ref, cur);
    const SessionID = await getSessionID();
    const AppointmentID = processedForm.AppointmentID;

    await BeginCommit(
        User.Employee, 
        {SessionID}
    );

    for (const updateNote of processedForm.Update) {
        const output = await UpdateNote({
            SessionID,
            ...updateNote,
            AppointmentID
        });
        if (!output)
            break;
    }

    for (const insertAttachment of processedForm.Insert.Attachment) {
        const URL = await uploadFile(insertAttachment.URL, insertAttachment.File);
        const output = await InsertNoteAttachment({
            URL,
            NoteID: insertAttachment.NoteID,
            SessionID
        });

        if (!output)
            break;
    }

    for (const insertNote of processedForm.Insert.Note) {
        const output = await InsertNote({
            SessionID,
            ...insertNote,
            AppointmentID
        });
        if (!output)
            break;
    }

    for (const insertSharee of processedForm.Insert.Sharee) {
        const output = await InsertNoteSharee({
            SessionID,
            ...insertSharee
        });
        if (!output)
            break;
    }

    for (const deleteAttachment of processedForm.Delete.Attachment) {
        const output = await DeleteNoteAttachment({
            SessionID,
            ...deleteAttachment
        });
        if (!output)
            break;
    }

    for (const deleteNote of processedForm.Delete.Note) {
        const output = await DeleteNote({
            SessionID,
            ...deleteNote,
            AppointmentID
        });
        if (!output)
            break;
    }

    for (const deleteSharee of processedForm.Delete.Sharee) {
        const output = await DeleteNoteSharee({
            SessionID,
            ...deleteSharee
        });
        if (!output)
            break;
    }

    await EndCommit(
        User.Employee, 
        {SessionID}
    );

    return false;
}

export async function submitGeneralForm(ref: GeneralFormStructure, cur: GeneralFormStructure): Promise<boolean> {
    const processedForm: ProcessedGeneralFormStructure = await processGeneralForm(ref, cur);
    const SessionID = await getSessionID();
    const AppointmentID = processedForm.AppointmentID;

    await BeginCommit(
        User.Employee, 
        {SessionID}
    );

    const customerOutput = await UpdateCustomer({
        SessionID,
        AppointmentID,
        FName: processedForm.FName,
        LName: processedForm.LName,
        Email: processedForm.Email,
        Phone: processedForm.Phone
    });

    if (!customerOutput)
        throw 'Error';

    const dateOutput = await UpdateDate({
        SessionID,
        AppointmentID,
        StartDate: processedForm.StartDate,
        EndDate: processedForm.EndDate
    });
    
    if (!dateOutput)
        throw 'Error';

    const statusOutput = await UpdateStatus({
        SessionID,
        AppointmentID,
        StatusID: processedForm.StatusID
    });

    if (!statusOutput)
        throw 'Error';

    await EndCommit(
        User.Employee, 
        {SessionID}
    );

    return false;
}

export async function submitVehicleForm(form: ProcessedVehicleFormStructure): Promise<boolean> {
    const SessionID = await getSessionID();

    await BeginCommit(
        User.Employee, 
        {SessionID}
    );

    const output = await UpdateVehicle({
        SessionID,
        ...form
    })

    if (!output)
        throw 'Error';

    await EndCommit(
        User.Employee, 
        {SessionID}
    );

    return true;
}

export async function submitServicesForm(form: ProcessedServicesFormStructure): Promise<boolean> {
    const SessionID = await getSessionID();
    const AppointmentID = form.AppointmentID;

    await BeginCommit(
        User.Employee, 
        {SessionID}
    );

    for (const updateService of form.Update.Services) {
        const output = await UpdateService({
            SessionID,
            AppointmentID,
            ...updateService
        });

        if (!output)
            throw '';
    }

    for (const updateDiagnosis of form.Update.Diagnoses) {
        const output = await UpdateDiagnosis({
            SessionID,
            AppointmentID,
            ...updateDiagnosis
        });

        if (!output)
            throw '';
        
    }

    for (const updateRepairs of form.Update.Repairs) {
        const output = await UpdateRepair({
            SessionID,
            AppointmentID,
            ...updateRepairs
        });

        if (!output)
            throw '';
        
    }

    for (const updateParts of form.Update.Parts) {
        const output = await UpdatePart({
            SessionID,
            AppointmentID,
            ...updateParts
        });

        if (!output)
            throw '';
        
    }

    for (const insertService of form.Insert.Services) {
        const output = await InsertService({
            SessionID,
            AppointmentID,
            ...insertService
        });
        if (!output)
            throw '';
    }

    for (const insertDiagnosis of form.Insert.Diagnoses) {
        const output = await InsertDiagnosis({
            SessionID,
            AppointmentID,
            ...insertDiagnosis
        });
        if (!output)
            throw '';
        
    }

    for (const insertRepairs of form.Insert.Repairs) {
        const output = await InsertRepair({
            SessionID,
            AppointmentID,
            ...insertRepairs
        });
        if (!output)
            throw '';
    }

    for (const insertParts of form.Insert.Parts) {
        const output = await InsertPart({
            SessionID,
            AppointmentID,
            ...insertParts
        });
        if (!output)
            throw ''; 
    }

    for (const deleteService of form.Delete.Services) {
        const output = await DeleteService({
            SessionID,
            AppointmentID,
            ...deleteService
        });
        if (!output)
            throw '';
    }

    for (const deleteDiagnosis of form.Delete.Diagnoses) {
        const output = await DeleteDiagnosis({
            SessionID,
            AppointmentID,
            ...deleteDiagnosis
        });
        if (!output)
            throw '';
    }

    for (const deleteRepairs of form.Delete.Repairs) {
        const output = await DeleteRepair({
            SessionID,
            AppointmentID,
            ...deleteRepairs
        });
        if (!output)
            throw '';  
    }

    for (const deleteParts of form.Delete.Parts) {
        const output = await DeletePart({
            SessionID,
            AppointmentID,
            ...deleteParts
        });
        if (!output)
            throw '';   
    }

    await EndCommit(
        User.Employee, 
        {SessionID}
    );

    return true;
}

export async function submitCostForm(form: ProcessedCostFormStructure): Promise<boolean> {
    const SessionID = await getSessionID();
    const AppointmentID = form.AppointmentID;

    await BeginCommit(
        User.Employee, 
        {SessionID}
    );

    const costOutput = await UpdateCost({
        SessionID,
        AppointmentID,
        ...form.Update
    });

    if (!costOutput)
        throw '';

    for (const insert of form.Insert) {
        const PaymentID = await InsertPayment({
            SessionID,
            AppointmentID,
            Payment: insert.Payment
        });

        if (!PaymentID)
            throw '';

        if (insert.Name && insert.Type && insert.CCN && insert.EXP) {
            const output = await InsertCreditCard({
                SessionID,
                AppointmentID,
                PaymentID,
                Name: insert.Name,
                Type: insert.Type,
                CCN: insert.CCN,
                EXP: insert.EXP
            });

            if (!output)
                throw '';
        }
    }

    for (const deletePayment of form.Delete) {
        const output = await DeletePayment({
            SessionID,
            AppointmentID,
            ...deletePayment
        });
        if (!output)
            throw '';
    }

    await EndCommit(
        User.Employee, 
        {SessionID}
    );

    return true;
}
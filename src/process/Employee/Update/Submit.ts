'use server';
import { generateURL, uploadFile } from "@/lib/Files/Upload";
import { 
    ProcessedNotesFormStructure,
    ProcessedGeneralFormStructure,
    ProcessedVehicleFormStructure,
    ProcessedServicesFormStructure,
    ProcessedCostFormStructure,
    processNotesForm,
    processGeneralForm,
    processVehicleForm,
    processServiceForm,
    processCostForm
} from "./Process";
import { BeginCommit, EndCommit } from "@/lib/Database/Info/Info";
import { getSessionID } from "@/lib/Cookies/Cookies";
import { User } from "@/lib/Database/User";
import { DeleteDiagnosis, DeleteNote, DeleteNoteAttachment, DeletePayment, DeleteRepair, DeleteService, InsertCreditCard, InsertDiagnosis, InsertNote, InsertNoteAttachment, InsertNoteSharee, InsertPart, InsertPayment, InsertRepair, InsertService, UpdateCost, UpdateCustomer, UpdateDate, UpdateDiagnosis, UpdateNote, UpdatePart, UpdateRepair, UpdateService, UpdateStatus, UpdateVehicle } from "@/lib/Database/Export";
import DeleteNoteSharee from "@/lib/Database/Appointment/SharedNote/Delete";
import DeletePart from "@/lib/Database/Appointment/Part/Delete";
import { 
    CostFormStructure, 
    GeneralFormStructure, 
    NotesFormStructure, 
    ServicesFormStructure, 
    VehicleFormStructure 
} from "./Form";
import util from 'util';

async function uploadAttachments(data: {
    SessionID: string,
    NoteID: number,
    fileList: unknown
}): Promise<boolean> {
    const fileList = <File> data.fileList;
    console.log(fileList);
    const URL = await uploadFile(await generateURL(), fileList);
    console.log(URL, fileList, fileList.name);
    if (!URL)
        return false;

    const output = await InsertNoteAttachment({
        SessionID: data.SessionID,
        NoteID: data.NoteID, 
        Name: fileList.name,
        Type: fileList.type,
        URL
    });
    if (!output)
        return false;
    return false;
}

export async function submitNotesForm(
    ref: NotesFormStructure, 
    cur: NotesFormStructure
): Promise<boolean> {
    const processedForm: ProcessedNotesFormStructure = await processNotesForm(ref, cur);
    const SessionID = await getSessionID();
    const AppointmentID = processedForm.AppointmentID;
    console.log(util.inspect(processedForm, {showHidden: false, depth: null, colors: true}));

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
        if (!insertAttachment.Files.has('Files'))
            continue;

        const fileLists = insertAttachment.Files.getAll('Files');
        console.log(fileLists);
        console.log('HELP')
        for (const fileList of fileLists) {
            const output = await uploadAttachments({
                NoteID: insertAttachment.NoteID,
                SessionID,
                fileList,
            });
            if (!output)
                throw 'Error';
        }
    }

    for (const insertNote of processedForm.Insert.Note) {
        const noteID = await InsertNote({
            SessionID,
            Head: insertNote.Head,
            Body: insertNote.Body,
            ShowCustomer: insertNote.ShowCustomer,
            AppointmentID
        });
        if (!noteID)
            throw 'Error';

        if (insertNote.Files && insertNote.Files.has('Files')) {
            const fileLists = insertNote.Files.getAll('Files');
            console.log('gptta pee');
            console.log(fileLists);
            for (const fileList of fileLists) {
                const output = await uploadAttachments({
                    NoteID: noteID,
                    SessionID,
                    fileList,
                });
                if (!output)
                    throw '';
            }
        }

        insertNote.Sharees.forEach(async (sharee) => {
            const output = await InsertNoteSharee({
                SessionID,
                NoteID: noteID,
                NoteShareeID: sharee
            });
            if (!output)
                throw '';
        }); 
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

    return true;
}

export async function submitGeneralForm(
    ref: GeneralFormStructure, 
    cur: GeneralFormStructure
): Promise<boolean> {
    const processedForm: ProcessedGeneralFormStructure = await processGeneralForm(ref, cur);
    const SessionID = await getSessionID();
    const AppointmentID = processedForm.AppointmentID;

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

    if (processedForm.StatusID) {
        const statusOutput = await UpdateStatus({
            SessionID,
            AppointmentID,
            StatusID: processedForm.StatusID
        });
    
        if (!statusOutput)
            throw 'Error';
    }

    return false;
}

export async function submitVehicleForm(
    ref: VehicleFormStructure, 
    cur: VehicleFormStructure
): Promise<boolean> {
    const processedForm: ProcessedVehicleFormStructure = await processVehicleForm(ref, cur);
    const SessionID = await getSessionID();
    console.log(util.inspect(processedForm, {showHidden: false, depth: null, colors: true}));

    const output = await UpdateVehicle({
        SessionID,
        ...processedForm
    })

    if (!output)
        throw 'Error';

    return true;
}

export async function submitServicesForm(
    ref: ServicesFormStructure, 
    cur: ServicesFormStructure
): Promise<boolean> {
    const processedForm: ProcessedServicesFormStructure = await processServiceForm(ref, cur);
    const SessionID = await getSessionID();
    const AppointmentID = processedForm.AppointmentID;
    console.log(util.inspect(processedForm, {showHidden: false, depth: null, colors: true}));

    for (const updateService of processedForm.Update.Services) {
        const output = await UpdateService({
            SessionID,
            AppointmentID,
            ...updateService
        });

        if (!output)
            throw '';
    }

    for (const updateDiagnosis of processedForm.Update.Diagnoses) {
        const output = await UpdateDiagnosis({
            SessionID,
            AppointmentID,
            ...updateDiagnosis
        });

        if (!output)
            throw '';
        
    }

    for (const updateRepairs of processedForm.Update.Repairs) {
        const output = await UpdateRepair({
            SessionID,
            AppointmentID,
            ...updateRepairs
        });

        if (!output)
            throw '';
        
    }

    for (const updateParts of processedForm.Update.Parts) {
        const output = await UpdatePart({
            SessionID,
            AppointmentID,
            ...updateParts
        });

        if (!output)
            throw '';
        
    }

    for (const insertService of processedForm.Insert.Services) {
        const output = await InsertService({
            SessionID,
            AppointmentID,
            ...insertService
        });
        if (!output)
            throw '';
    }

    for (const insertDiagnosis of processedForm.Insert.Diagnoses) {
        const output = await InsertDiagnosis({
            SessionID,
            AppointmentID,
            ...insertDiagnosis
        });
        if (!output)
            throw '';
        
    }

    for (const insertRepairs of processedForm.Insert.Repairs) {
        const output = await InsertRepair({
            SessionID,
            AppointmentID,
            ...insertRepairs
        });
        if (!output)
            throw '';
    }

    for (const insertParts of processedForm.Insert.Parts) {
        const output = await InsertPart({
            SessionID,
            AppointmentID,
            ...insertParts
        });
        if (!output)
            throw ''; 
    }

    for (const deleteService of processedForm.Delete.Services) {
        const output = await DeleteService({
            SessionID,
            AppointmentID,
            ...deleteService
        });
        if (!output)
            throw '';
    }

    for (const deleteDiagnosis of processedForm.Delete.Diagnoses) {
        const output = await DeleteDiagnosis({
            SessionID,
            AppointmentID,
            ...deleteDiagnosis
        });
        if (!output)
            throw '';
    }

    for (const deleteRepairs of processedForm.Delete.Repairs) {
        const output = await DeleteRepair({
            SessionID,
            AppointmentID,
            ...deleteRepairs
        });
        if (!output)
            throw '';  
    }

    for (const deleteParts of processedForm.Delete.Parts) {
        const output = await DeletePart({
            SessionID,
            AppointmentID,
            ...deleteParts
        });
        if (!output)
            throw '';   
    }

    return true;
}

export async function submitCostForm(
    ref: CostFormStructure,
    cur: CostFormStructure
): Promise<boolean> {
    const processedForm: ProcessedCostFormStructure = await processCostForm(ref, cur);
    const SessionID = await getSessionID();
    const AppointmentID = processedForm.AppointmentID;
    console.log(processedForm)

    if (processedForm.Update.Cost) {
        const costOutput = await UpdateCost({
            SessionID,
            AppointmentID,
            ...processedForm.Update
        });
        
        if (!costOutput)
            throw '';
    }

    for (const insert of processedForm.Insert) {
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

    for (const deletePayment of processedForm.Delete) {
        const output = await DeletePayment({
            SessionID,
            AppointmentID,
            ...deletePayment
        });
        if (!output)
            throw '';
    }

    return true;
}
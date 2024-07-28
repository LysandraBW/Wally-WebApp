import util from "util";
import { 
    NotesFormStructure, 
    GeneralFormStructure, 
    VehicleFormStructure, 
    ServicesFormStructure, 
    CostFormStructure 
} from "./Form";

class MathSet extends Set {
    intersection(B: MathSet) {
        const common = new MathSet();
        this.forEach(e => {
            if (B.has(e)) {
                common.add(e);
            }
        })
        return common;
    }

    difference(B: MathSet) {
        const notCommon = new MathSet();
        this.forEach(e => {
            if (!B.has(e)) {
                notCommon.add(e);
            }
        })
        return notCommon;
    }
}

const objectMatch = (A: {[k: string]: any}, B: {[k: string]: any}, keys: Array<string>): boolean => {
    for (const key of keys) {
        if (A[`${key}`] !== B[`${key}`]) {
            return false;
        }
    }
    return true;
}

const objectDifference = <T extends {[k: string|number]: any}> (A: T, B: T): T => {
    const difference: {[k: string|number]: any} = {};
    const keys = Object.keys(A);
    for (const key of keys) {
        const typedKey = {key};

        const valueA = A[`${key}`];
        const valueB = B[`${key}`];

        if (valueA !== valueB)
            difference[typedKey.key] = valueB;
        else
            difference[typedKey.key] = null;
    }
    return <T> difference;
}

export interface ProcessedNotesFormStructure {
    AppointmentID: string;
    Update: Array<{
        NoteID: number;
        Head: string | null;
        Body: string | null;
        ShowCustomer: number | null;
    }>;
    Insert: {
        Attachment: Array<{
            NoteID: number;
            Files: FormData;
        }>;
        Note: Array<{
            Head: string;
            Body: string;
            ShowCustomer: number;
            Files: FormData | null;
            Sharees: Array<string>;
        }>;
        Sharee: Array<{
            NoteID: number;
            NoteShareeID: string;
        }>;
    };
    Delete: {
        Attachment: Array<{
            NoteID: number;
            AttachmentID: number;
        }>;
        Note: Array<{
            NoteID: number;
        }>;
        Sharee: Array<{
            NoteID: number;
            NoteShareeID: string;
        }>;
    };
}

export async function processNotesForm(
    ref: NotesFormStructure, 
    cur: NotesFormStructure
):Promise<ProcessedNotesFormStructure> {
    const refNoteIDs = new MathSet(Object.keys(ref.Notes).map(n => parseInt(n)).sort());
    const curNoteIDs = new MathSet(Object.keys(cur.Notes).map(n => parseInt(n)).sort());

    console.log(refNoteIDs, curNoteIDs);

    const toUpdateNoteIDs = refNoteIDs.intersection(curNoteIDs);
    const toInsertNoteIDs = curNoteIDs.difference(refNoteIDs);
    const toDeleteNoteIDs = refNoteIDs.difference(curNoteIDs);

    console.log(toUpdateNoteIDs, toInsertNoteIDs, toDeleteNoteIDs);

    const processedNotesForm: ProcessedNotesFormStructure = {
        AppointmentID: cur.AppointmentID,
        Update: [],
        Insert: {
            Attachment: [],
            Note: [],
            Sharee: []
        },
        Delete: {
            Attachment: [],
            Note: [],
            Sharee: []
        }
    }

    toUpdateNoteIDs.forEach(async (noteID) => {
        const refNote = ref.Notes[`${noteID}`];
        const curNote = cur.Notes[`${noteID}`]; 

        console.log(refNote, curNote);

        if (!objectMatch(refNote, curNote, ['Head', 'Body', 'ShowCustomer'])) {
            processedNotesForm.Update.push({ 
                NoteID: refNote.NoteID,
                Head: refNote.Head !== curNote.Head ? curNote.Head : null, 
                Body: refNote.Body !== curNote.Body ? curNote.Body : null,
                ShowCustomer: refNote.ShowCustomer !== curNote.ShowCustomer ? curNote.ShowCustomer : null
            });
        }

        const refNoteAttachmentIDs = new MathSet(refNote.Attachments.map(a => a.AttachmentID));
        const curNoteAttachmentIDs = new MathSet(curNote.Attachments.map(a => a.AttachmentID));

        // Users can only delete existing attachments.
        // So, we only look for the IDs that are only
        // in the refNote and not the curNote (deleted). 
        const toDeleteAttachmentIDs = refNoteAttachmentIDs.difference(curNoteAttachmentIDs);
        toDeleteAttachmentIDs.forEach((attachmentID) => {
            processedNotesForm.Delete.Attachment.push({
                NoteID: noteID,
                AttachmentID: attachmentID
            });
        });

        // Users can only add files.
        if (curNote.Files) {
            processedNotesForm.Insert.Attachment.push({
                NoteID: noteID,
                Files: curNote.Files
            });
        }

        const refNoteSharees = new MathSet(refNote.Sharees);
        const curNoteSharees = new MathSet(curNote.Sharees);

        const toDeleteSharees = refNoteSharees.difference(curNoteSharees);
        const toInsertSharees = curNoteSharees.difference(refNoteSharees);

        toDeleteSharees.forEach((shareeID) => {
            processedNotesForm.Delete.Sharee.push({
                NoteID: noteID,
                NoteShareeID: shareeID
            });
        });

        toInsertSharees.forEach((shareeID) => {
            processedNotesForm.Insert.Sharee.push({
                NoteID: noteID,
                NoteShareeID: shareeID
            });
        });
    });

    toInsertNoteIDs.forEach((noteID) => {
        const curNote = cur.Notes[`${noteID}`];
        processedNotesForm.Insert.Note.push({
            Head: curNote.Head,
            Body: curNote.Body,
            ShowCustomer: curNote.ShowCustomer,
            Files: curNote.Files,
            Sharees: curNote.Sharees
        });
    });

    toDeleteNoteIDs.forEach((noteID) => {
        processedNotesForm.Delete.Note.push({
            NoteID: noteID
        });
    });

    return processedNotesForm;
}

export interface ProcessedGeneralFormStructure {
    AppointmentID: string;
    FName: string | null;
    LName: string | null;
    Email: string | null;
    Phone: string | null;
    StartDate: string | null;
    EndDate: string | null;
    StatusID: number | null;
}

export async function processGeneralForm(
    ref: GeneralFormStructure, 
    cur: GeneralFormStructure
): Promise<ProcessedGeneralFormStructure> {
    return {
        AppointmentID: cur.AppointmentID,
        FName: ref.FName === cur.FName ? null : cur.FName,
        LName: ref.LName === cur.LName ? null : cur.LName,
        Email: ref.Email === cur.Email ? null : cur.Email,
        Phone: ref.Phone === cur.Phone ? null : cur.Phone,
        StartDate: ref.StartDate === cur.StartDate ? null : cur.StartDate.toString().replace('T', ' '),
        EndDate: ref.EndDate === cur.EndDate ? null : cur.EndDate.toString().replace('T', ' '),
        StatusID: ref.StatusID === cur.StatusID ? null : cur.StatusID,
    }
}

export interface ProcessedVehicleFormStructure {
    AppointmentID: string;
    VIN: string | null;
    Make: string | null;
    Model: string | null;
    ModelYear:  number | null;
    Mileage: number | null;
    LicensePlate: string | null;
}

export async function processVehicleForm(
    ref: VehicleFormStructure, 
    cur: VehicleFormStructure
): Promise<ProcessedVehicleFormStructure> {
    return {
        AppointmentID: cur.AppointmentID,
        VIN: ref.VIN === cur.VIN ? null : cur.VIN,
        Make: ref.Make === cur.Make ? null : cur.Make,
        Model: ref.Model === cur.Model ? null : cur.Model,
        ModelYear: ref.ModelYear === cur.ModelYear ? null : cur.ModelYear,
        Mileage: ref.Mileage === cur.Mileage ? null : cur.Mileage,
        LicensePlate: ref.LicensePlate === cur.LicensePlate ? null : cur.LicensePlate
    }
}

export interface ProcessedServicesFormStructure {
    AppointmentID: string;
    Update: {
        Services: Array<{
            ServiceID: number;
            Service: string | null;
            Division: string | null;
            Class: string | null;
        }>
        Diagnoses: Array<{
            DiagnosisID: number;
            Code: string | null;
            Message: string | null;
        }>
        Repairs: Array<{
            RepairID: number;
            Repair: string | null;
        }>
        Parts: Array<{
            PartID: number;
            PartName: string | null;
            PartNumber: string | null;
            Quantity: number | null;
            UnitCost: number | null;
        }>
    }
    Insert: {
        Services: Array<{
            Service: string;
            Division: string;
            Class: string;
        }>;
        Diagnoses: Array<{
            Code: string;
            Message: string;
        }>
        Repairs: Array<{
            Repair: string;
        }>
        Parts: Array<{
            PartName: string;
            PartNumber: string;
            Quantity: number;
            UnitCost: number;
        }>
    }
    Delete: {
        Services: Array<{
            ServiceID: number;
        }>
        Diagnoses: Array<{
            DiagnosisID: number;
        }>
        Repairs: Array<{
            RepairID: number;
        }>
        Parts: Array<{
            PartID: number;
        }>
    }
}

export async function processServiceForm(
    ref: ServicesFormStructure,
    cur: ServicesFormStructure
): Promise<ProcessedServicesFormStructure> {
    const processedServicesForm: ProcessedServicesFormStructure = {
        AppointmentID: cur.AppointmentID,
        Update: {
            Services: [],
            Diagnoses: [],
            Repairs: [],
            Parts: []
        },
        Insert: {
            Services: [],
            Diagnoses: [],
            Repairs: [],
            Parts: []
        },
        Delete: {
            Services: [],
            Diagnoses: [],
            Repairs: [],
            Parts: []
        }
    }
    // Services
    const refServiceIDs = new MathSet(Object.keys(ref.Services).map(s => parseInt(s)));
    const curServiceIDs = new MathSet(Object.keys(cur.Services).map(s => parseInt(s)));

    console.log("Reference Service IDs", refServiceIDs);
    console.log("Current Service IDs", curServiceIDs);

    const toUpdateServiceIDs = refServiceIDs.intersection(curServiceIDs);
    const toInsertServiceIDs = curServiceIDs.difference(refServiceIDs);
    const toDeleteServiceIDs = refServiceIDs.difference(curServiceIDs);

    console.log(toUpdateServiceIDs);
    console.log(toInsertServiceIDs);
    console.log(toDeleteServiceIDs);

    toUpdateServiceIDs.forEach((serviceID) => {
        const refService = ref.Services[`${serviceID}`];
        const curService = cur.Services[`${serviceID}`];

        if (objectMatch(refService, curService, ['Class', 'Division', 'Service']))
            return false;

        processedServicesForm.Update.Services.push({
            ServiceID: serviceID,
            Class: refService.Class !== curService.Class ? curService.Class : null,
            Division: refService.Division !== curService.Division ? curService.Division : null,
            Service: refService.Service !== curService.Service ? curService.Service : null
        });
    });

    toInsertServiceIDs.forEach((serviceID) => {
        const curService = cur.Services[`${serviceID}`];
        processedServicesForm.Insert.Services.push({
            Class: curService.Class,
            Division: curService.Division,
            Service: curService.Service
        });
    });

    toDeleteServiceIDs.forEach((serviceID) => {
        if (serviceID < 0)
            return false;
        processedServicesForm.Delete.Services.push({
            ServiceID: serviceID
        });
    });

    // Diagnoses
    const refDiagnosisIDs = new MathSet(Object.keys(ref.Diagnoses).map(s => parseInt(s)));
    const curDiagnosisIDs = new MathSet(Object.keys(cur.Diagnoses).map(s => parseInt(s)));

    const toUpdateDiagnosisIDs = refDiagnosisIDs.intersection(curDiagnosisIDs);
    const toInsertDiagnosisIDs = curDiagnosisIDs.difference(refDiagnosisIDs);
    const toDeleteDiagnosisIDs = refDiagnosisIDs.difference(curDiagnosisIDs);

    toUpdateDiagnosisIDs.forEach((diagnosisID) => {
        const refDiagnosis = ref.Diagnoses[`${diagnosisID}`];
        const curDiagnosis = cur.Diagnoses[`${diagnosisID}`];

        if (objectMatch(refDiagnosis, curDiagnosis, ['Code', 'Message']))
            return false;

        processedServicesForm.Update.Diagnoses.push({
            DiagnosisID: diagnosisID,
            Code: refDiagnosis.Code !== curDiagnosis.Code ? curDiagnosis.Code : null,
            Message: refDiagnosis.Message !== curDiagnosis.Message ? curDiagnosis.Message : null
        });
    });

    toInsertDiagnosisIDs.forEach((diagnosisID) => {
        const curDiagnosis = cur.Diagnoses[`${diagnosisID}`];
        processedServicesForm.Insert.Diagnoses.push({
            Code: curDiagnosis.Code,
            Message: curDiagnosis.Message
        });
    });

    toDeleteDiagnosisIDs.forEach((diagnosisID) => {
        if (diagnosisID < 0)
            return false;
        processedServicesForm.Delete.Diagnoses.push({
            DiagnosisID: diagnosisID
        });
    });

    // Repairs
    const refRepairIDs = new MathSet(Object.keys(ref.Repairs).map(s => parseInt(s)));
    const curRepairIDs = new MathSet(Object.keys(cur.Repairs).map(s => parseInt(s)));

    const toUpdateRepairIDs = refRepairIDs.intersection(curRepairIDs);
    const toInsertRepairIDs = curRepairIDs.difference(refRepairIDs);
    const toDeleteRepairIDs = refRepairIDs.difference(curRepairIDs);

    toUpdateRepairIDs.forEach((repairID) => {
        const refRepairs = ref.Repairs[`${repairID}`];
        const curRepairs = cur.Repairs[`${repairID}`];

        if (objectMatch(refRepairs, curRepairs, ['Code', 'Message']))
            return false;

        processedServicesForm.Update.Repairs.push({
            RepairID: repairID,
            Repair: refRepairs.Repair !== curRepairs.Repair ? curRepairs.Repair : null
        });
    });

    toInsertRepairIDs.forEach((repairID) => {
        const curRepairs = cur.Repairs[`${repairID}`];
        processedServicesForm.Insert.Repairs.push({
            Repair: curRepairs.Repair
        });
    });

    toDeleteRepairIDs.forEach((repairID) => {
        if (repairID < 0)
            return false;
        processedServicesForm.Delete.Repairs.push({
            RepairID: repairID
        });
    });

    // Parts
    const refPartIDs = new MathSet(Object.keys(ref.Parts).map(s => parseInt(s)));
    const curPartIDs = new MathSet(Object.keys(cur.Parts).map(s => parseInt(s)));

    const toUpdatePartIDs = refPartIDs.intersection(curPartIDs);
    const toInsertPartIDs = curPartIDs.difference(refPartIDs);
    const toDeletePartIDs = refPartIDs.difference(curPartIDs);

    toUpdatePartIDs.forEach((partID) => {
        const refParts = ref.Parts[`${partID}`];
        const curParts = cur.Parts[`${partID}`];

        if (objectMatch(refParts, curParts, ['PartName', 'PartNumber', 'Quantity', 'UnitCost']))
            return false;
        
        processedServicesForm.Update.Parts.push({
            PartID: partID,
            PartName: refParts.PartName !== curParts.PartName ? curParts.PartName : null,
            PartNumber: refParts.PartNumber !== curParts.PartNumber ? curParts.PartNumber : null,
            Quantity: refParts.Quantity !== curParts.Quantity ? curParts.Quantity : null,
            UnitCost: refParts.UnitCost !== curParts.UnitCost ? curParts.UnitCost : null
        });
    });

    toInsertPartIDs.forEach((partID) => {
        const curParts = cur.Parts[`${partID}`];
        processedServicesForm.Insert.Parts.push({
            PartName: curParts.PartName,
            PartNumber: curParts.PartNumber,
            Quantity: curParts.Quantity,
            UnitCost: curParts.UnitCost
        });
    });

    toDeletePartIDs.forEach((partID) => {
        if (partID < 0)
            return false;
        processedServicesForm.Delete.Parts.push({
            PartID: partID
        });
    });

    return processedServicesForm;
}

export interface ProcessedCostFormStructure {
    AppointmentID: string;
    Update: {
        Cost: number | null;
    }
    Insert: Array<{
        Payment: number;  
        Name: string | null;
        Type: string | null;
        CCN: string | null;
        EXP: string | null;
    }>
    Delete: Array<{
        PaymentID: number;
    }>
}

export async function processCostForm(
    ref: CostFormStructure,
    cur: CostFormStructure
): Promise<ProcessedCostFormStructure> {
    const processedCostForm: ProcessedCostFormStructure = {
        AppointmentID: cur.AppointmentID,
        Update: {
            Cost: ref.Cost !== cur.Cost ? parseFloat(cur.Cost.toString()) : null
        },
        Insert: [],
        Delete: []
    };

    const refPaymentIDs = new MathSet(Object.keys(ref.Payments).map(p => parseInt(p)));
    const curPaymentIDs = new MathSet(Object.keys(cur.Payments).map(p => parseInt(p)));

    const toInsertPaymentIDs = curPaymentIDs.difference(refPaymentIDs);
    const toDeletePaymentIDs = refPaymentIDs.difference(curPaymentIDs);

    toInsertPaymentIDs.forEach((paymentID) => {
        const curPayment = cur.Payments[`${paymentID}`];
        processedCostForm.Insert.push({
            Payment: curPayment.Payment,
            Name: curPayment.Name,
            Type: curPayment.Type,
            CCN: curPayment.CCN,
            EXP: curPayment.EXP
        });
    });

    toDeletePaymentIDs.forEach((paymentID) => {
        processedCostForm.Delete.push({
            PaymentID: paymentID
        });
    })

    return processedCostForm;
}
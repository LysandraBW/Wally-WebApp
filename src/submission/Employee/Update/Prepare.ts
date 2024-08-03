'use server';
import { 
    DB_Appointment
} from "@/database/Types";
import { GetNoteSharees } from "@/database/Export";
import { getSessionID } from "@/lib/Storage/Storage";
import { toWebDateTime } from "@/lib/Convert/Convert";
import { PaymentsStructure } from "./Payment/Form";
import { UpdateFormStructure, UpdateStructure } from "./Form";
import { NotesStructure, NoteType } from "./Note/Form";
import { DiagnosesStructure, PartsStructure, RepairsStructure, ServicesStructure } from "./Service/Form";

export async function prepareUpdateForm(employeeID: string, apt: DB_Appointment): Promise<UpdateStructure> {
    let reference: {[k: string]: any} = {};

    // General
    reference.General = {
        AppointmentID:  apt.AppointmentID,
        FName:          apt.FName,
        LName:          apt.LName,
        Email:          apt.Email,
        Phone:          apt.Phone,
        StartDate:      toWebDateTime(apt.StartDate),
        EndDate:        toWebDateTime(apt.EndDate),
        StatusID:       apt.StatusID
    };

    // Vehicle
    reference.Vehicle = {
        AppointmentID:  apt.AppointmentID,
        Make:           apt.Make,
        Model:          apt.Model,
        ModelYear:      apt.ModelYear,
        VIN:            apt.VIN,
        Mileage:        apt.Mileage,
        LicensePlate:   apt.LicensePlate
    };

    // Services
    const services: ServicesStructure = {};
    for (const service of apt.Services)
        services[service.AppointmentServiceID] = service;

    // Diagnoses
    const diagnoses: DiagnosesStructure = {};
    for (const diagnosis of apt.Diagnoses)
        diagnoses[diagnosis.DiagnosisID] = diagnosis;

    // Repairs
    const repairs: RepairsStructure = {};
    for (const repair of apt.Repairs)
        repairs[repair.RepairID] = repair;

    // Parts
    const parts: PartsStructure = {};
    for (const part of apt.Parts) {
        parts[part.PartID] = {
            ...part, 
            Quantity: part.Quantity.toString(), 
            UnitCost: part.UnitCost.toString()
        };
    }

    // All Services
    reference.Service = {
        AppointmentID:  apt.AppointmentID,
        Services:       services,
        Diagnoses:      diagnoses,
        Repairs:        repairs,
        Parts:          parts,
    };

    // Payments
    const payments: PaymentsStructure = {};
    for (const payment of apt.Payments)
        payments[payment.PaymentID] = {...payment, Payment: payment.Payment.toString()};

    reference.Payment = {
        AppointmentID:  apt.AppointmentID,
        Cost:           apt.Cost,
        Payments:       payments
    };

    // Notes
    const notes: NotesStructure = {};
    for (const note of apt.Notes) {
        let sharees = (await GetNoteSharees({
            SessionID: await getSessionID(),
            NoteID: note.NoteID
        })).map(sharee => sharee.ShareeID);

        notes[note.NoteID] =  { 
            ...note, 
            Type: NoteType.Attachment, 
            Files: null, 
            Sharees: sharees
        };
    }

    reference.Note = {
        AppointmentID: apt.AppointmentID,
        EmployeeID: employeeID,
        Notes: notes
    };

    return <UpdateStructure> reference;
}

export const UpdateForm = async (
    employeeID: string, 
    appointment: DB_Appointment
): Promise<UpdateFormStructure> => {
    const form = await prepareUpdateForm(employeeID, appointment);
    return {
        current: form,
        reference: form
    };
}
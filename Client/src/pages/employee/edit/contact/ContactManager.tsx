import { DB_Appointment } from "@/services/DB/Interface/Appointment";
import { Contact, ContactUpdates } from "./_DEF";
import ContactForm from "./ContactForm";
import { updatedValue } from "@/features/ItemManager/helpers/updatedValue";
import { UseForm } from "@/features/Form/useForm/useForm";

interface ContactManagerProps {
    parentForm: UseForm;
    appointment: DB_Appointment;
    onSaveUpdates: (updates: ContactUpdates) => void;
}

export default function ContactManager(props: ContactManagerProps) {
    const processUpdates = (oldContact: Contact, newContact: Contact) => {
        const updates = {
            FName: updatedValue(oldContact.FName, newContact.FName),
            LName: updatedValue(oldContact.LName, newContact.LName),
            Email: updatedValue(oldContact.Email, newContact.Email),
            Phone: updatedValue(oldContact.Phone, newContact.Phone),
            StartDate: updatedValue(oldContact.StartDate, newContact.StartDate),
            EndDate: updatedValue(oldContact.EndDate, newContact.EndDate),
            StatusID: updatedValue(oldContact.StatusID, newContact.StatusID)
        } as ContactUpdates;
        props.onSaveUpdates(updates);
    }

    return (
        <div>
            <ContactForm
                parent={props.parentForm}
                appointment={props.appointment}
                onSaveUpdates={processUpdates}
            />
        </div>
    )
}
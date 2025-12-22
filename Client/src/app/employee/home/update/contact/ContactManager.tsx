import { updatedValue } from "@/features/ItemManager/helpers/updatedValue";
import useForm, { UseForm } from "@/features/Form/useForm/useForm";
import { Appointment as DB_Appointment } from "waltronics-types";
import { CONTACT } from "../_DEF";
import { useEffect, useState } from "react";
import { Options } from "@/features/Form/DEF";
import GetStatusPairs from "@/services/DB/Information/GetStatusPairs";
import { Contact, contactTest, ContactUpdates, makeContact } from "@/app/employee/home/update/contact/_DEF";
import makeForm from "@/features/Form/useForm/makeForm";
import SaveResetButtons from "@/features/ItemManager/components/SaveResetButtons";
import SelectGrid from "@/component/Form/Select/SelectGrid/SelectGrid";
import TextFieldGrid from "@/component/Form/Text/TextFieldGrid";


interface ContactManagerProps {
    updateManagerForm: UseForm;
    appointment: DB_Appointment;
    onSaveUpdates: (updates: ContactUpdates) => void;
    setChangesMade?: (keyForUpdateManager: string, changesMade: boolean) => void;
}

export default function ContactManager(props: ContactManagerProps) {
    const form = useForm(CONTACT);
    const [statuses, setStatuses] = useState<Options>([]);
    const [oldContact, setOldContact] = useState<Contact>();
    const [changesMade, setChangesMade] = useState(false);
    

    useEffect(() => {
        refresh();
    }, []);

    
    useEffect(() => {
        props.setChangesMade && props.setChangesMade(CONTACT, changesMade);
    }, [changesMade]);


    const refresh = async () => {
        const statuses = await GetStatusPairs();
        setStatuses(statuses);
        resetUpdates();
    }


    const processUpdates = (oldContact: Contact, newContact: Contact) => {
        const updates = {
            FName: updatedValue(oldContact.FName, newContact.FName),
            LName: updatedValue(oldContact.LName, newContact.LName),
            Email: updatedValue(oldContact.Email, newContact.Email),
            Phone: updatedValue(oldContact.Phone, newContact.Phone),
            StartDate: updatedValue(oldContact.StartDate, newContact.StartDate),
            EndDate: updatedValue(oldContact.EndDate, newContact.EndDate),
            StatusID: updatedValue(oldContact.StatusID[0], newContact.StatusID[0])
        } as ContactUpdates;
        props.onSaveUpdates(updates);
    }


    const saveUpdates = async () => {
        const state = form.getState();
        props.updateManagerForm.setInputState("General", [state, ""]);
        if (!state || !oldContact)
            return;
        const newContact = form.getData() as Contact;
        processUpdates(oldContact, newContact);
        setChangesMade(false);
    }

    
    const resetUpdates = async () => {
        const contact = makeContact(props.appointment);
        setOldContact(contact);
        form.resetForm(makeForm(contact, contactTest, true));
        props.updateManagerForm.setInputState(CONTACT, [form.getState(), ""]);
        setChangesMade(false);
    }


    const updateValue = async (name: string, value: any) => {
        form.updateInputData(name, value);
        props.updateManagerForm.setInputState(CONTACT, [form.getState(), ""]);
        setChangesMade(JSON.stringify(form.getData()) !== JSON.stringify(oldContact));
    }
    

    return (
        <div className="grow h-full relative flex flex-col shadow-sm rounded-b-md border border-gray-300">
            <div className="bg-white relative h-full grow">
                <table className="grow w-full border-collapse rounded">
                    <tbody>
                        <TextFieldGrid
                            type="text"
                            name="FName"
                            label="First Name"
                            value={form.getInput("FName").data}
                            state={form.getInput("FName").state}
                            onChange={updateValue}
                            onBlur={undefined}
                        />
                        <TextFieldGrid
                            type="text"
                            name="LName"
                            label="Last Name"
                            value={form.getInput("LName").data}
                            state={form.getInput("LName").state}
                            onChange={updateValue}
                            onBlur={undefined}
                        />
                        <TextFieldGrid
                            type="text"
                            name="Email"
                            label="Email Address"
                            value={form.getInput("Email").data}
                            state={form.getInput("Email").state}
                            onChange={updateValue}
                            onBlur={undefined}
                        />
                        <TextFieldGrid
                            type="text"
                            name="Phone"
                            label="Phone Number"
                            value={form.getInput("Phone").data}
                            state={form.getInput("Phone").state}
                            onChange={updateValue}
                            onBlur={undefined}
                        />
                        <TextFieldGrid
                            type="datetime-local"
                            name="StartDate"
                            label="Start Date"
                            value={form.getInput("StartDate").data}
                            state={form.getInput("StartDate").state}
                            onChange={updateValue}
                            onBlur={undefined}
                        />
                        <TextFieldGrid
                            type="datetime-local"
                            name="EndDate"
                            label="End Date"
                            value={form.getInput("EndDate").data}
                            state={form.getInput("EndDate").state}
                            onChange={updateValue}
                            onBlur={undefined}
                        />
                        <SelectGrid
                            name="StatusID"
                            label="Status"
                            toggleLabel="Select Status"
                            options={statuses}
                            values={form.getInput("StatusID").data}
                            state={form.getInput("StatusID").state}
                            onChange={updateValue}
                            disabled={false}
                        />
                    </tbody>
                </table>
            </div>
            <SaveResetButtons
                onSave={saveUpdates}
                onReset={resetUpdates}
                changesMade={changesMade}
            />
        </div>
    )
}
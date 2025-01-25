import { DB_Appointment } from "@/services/DB/Interface/Appointment";
import { contactTest, Contact, makeContact } from "./_DEF";
import { useEffect, useState } from "react";
import StatusPairs from "@/services/DB/Procedure/Pairs/StatusPairs";
import { CONTACT } from "../_DEF";
import { Options } from "@/features/Form/DEF";
import useForm, { UseForm } from "@/features/Form/useForm/useForm";
import makeForm from "@/features/Form/useForm/makeForm";
import TextField from "@/component/Form/Text/TextField";
import Segment from "@/component/Form/Segment/Segment";
import PhoneNumber from "@/component/Form/Text/PhoneNumber/PhoneNumber";
import SaveResetButtons from "@/features/ItemManager/Form/SaveResetButtons";
import Select from "@/component/Form/Select/Select/Select";
import clsx from "clsx";

interface ContactFormProps {
    parent: UseForm;
    appointment: DB_Appointment;
    onSaveUpdates: (oldContact: Contact, newContact: Contact) => void;
}

export default function ContactForm(props: ContactFormProps) {
    const form = useForm(CONTACT);
    const [statuses, setStatuses] = useState<Options>([]);
    const [oldContact, setOldContact] = useState<Contact>();

    useEffect(() => {
        const load = async () => {
            resetForm();
            const statuses = await StatusPairs();
            setStatuses(statuses);
        }
        load();
    }, []);

    const saveForm = async () => {
        const state = form.getState();
        props.parent.setInputState(CONTACT, [state, ""]);
        if (!state || !oldContact)
            return;
        const newContact = form.getData() as Contact;
        props.onSaveUpdates(oldContact, newContact);
    }

    const resetForm = async () => {
        const contact = makeContact(props.appointment);
        setOldContact(contact);
        form.resetForm(makeForm(contact, contactTest, true));
        props.parent.setInputState(CONTACT, [form.getState(), ""]);
    }

    const updateValue = async (name: string, value: any) => {
        form.updateInputData(name, value);
        props.parent.setInputState(CONTACT, [form.getState(), ""]);
    }

    return (
        <div>
            <div className={clsx(
                "flex flex-col px-6 py-6 gap-6 max-w-[500px]"
            )}>
                <TextField
                    type="text"
                    name="FName"
                    label="First Name"
                    value={form.getInput("FName").data}
                    state={form.getInput("FName").state}
                    onChange={updateValue}
                    onBlur={undefined}
                />
                <TextField
                    type="text"
                    name="LName"
                    label="Last Name"
                    value={form.getInput("LName").data}
                    state={form.getInput("LName").state}
                    onChange={updateValue}
                    onBlur={undefined}
                />
                <TextField
                    type="text"
                    name="Email"
                    label="Email Address"
                    value={form.getInput("Email").data}
                    state={form.getInput("Email").state}
                    onChange={updateValue}
                    onBlur={undefined}
                />
                <PhoneNumber
                    name="Phone"
                    label="Phone Number"
                    value={form.getInput("Phone").data}
                    state={form.getInput("Phone").state}
                    onChange={updateValue}
                    onBlur={undefined}
                />
                <TextField
                    type="datetime-local"
                    name="StartDate"
                    label="Start Date"
                    value={form.getInput("StartDate").data}
                    state={form.getInput("StartDate").state}
                    onChange={updateValue}
                    onBlur={undefined}
                />
                <TextField
                    type="datetime-local"
                    name="EndDate"
                    label="End Date"
                    value={form.getInput("EndDate").data}
                    state={form.getInput("EndDate").state}
                    onChange={updateValue}
                    onBlur={undefined}
                />
                <Select
                    name="StatusID"
                    label="Select Status"
                    toggleLabel="Select Status"
                    options={statuses}
                    values={form.getInput("StatusID").data}
                    state={form.getInput("StatusID").state}
                    onChange={updateValue}
                    disabled={false}
                />
            </div>
            <SaveResetButtons
                onSave={saveForm}
                onReset={resetForm}
            />
        </div>
    )
}
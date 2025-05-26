import { contactTest, Contact, makeContact } from "./_DEF";
import { Fragment, useContext, useEffect, useState } from "react";
import GetStatusPairs from "@/services/DB/Information/GetStatusPairs";
import { CONTACT } from "../_DEF";
import { Options } from "@/features/Form/DEF";
import useForm, { UseForm } from "@/features/Form/useForm/useForm";
import makeForm from "@/features/Form/useForm/makeForm";
import TextField from "@/component/Form/Text/TextField";
import PhoneNumber from "@/component/Form/Text/PhoneNumber/PhoneNumber";
import SaveResetButtons from "@/features/ItemManager/Form/SaveResetButtons";
import Select from "@/component/Form/Select/Select/Select";
import clsx from "clsx";
import { Appointment as DB_Appointment } from "waltronics-types";
import TextFieldGrid from "../TextFieldGrid";
import SelectGrid from "../SelectGrid";
import { UpdateManagerContext } from "../Update";

interface ContactFormProps {
    parent: UseForm;
    appointment: DB_Appointment;
    onSaveUpdates: (oldContact: Contact, newContact: Contact) => void;
    tabOpen: boolean;
}

export default function ContactForm(props: ContactFormProps) {
    const form = useForm(CONTACT);
    const [statuses, setStatuses] = useState<Options>([]);
    const [oldContact, setOldContact] = useState<Contact>();
    const updateManagerContext = useContext(UpdateManagerContext);

    useEffect(() => {
        const load = async () => {
            resetForm();
            const statuses = await GetStatusPairs();
            setStatuses(statuses);
        }
        load();
    }, []);

    const saveForm = async () => {
        const state = form.getState();
        props.parent.setInputState("General", [state, ""]);
        if (!state || !oldContact)
            return;
        const newContact = form.getData() as Contact;
        props.onSaveUpdates(oldContact, newContact);
        updateManagerContext.setChangesMade("General", false);
    }

    const resetForm = async () => {
        const contact = makeContact(props.appointment);
        setOldContact(contact);
        form.resetForm(makeForm(contact, contactTest, true));
        props.parent.setInputState(CONTACT, [form.getState(), ""]);
        updateManagerContext.setChangesMade("General", false);
    }

    const updateValue = async (name: string, value: any) => {
        form.updateInputData(name, value);
        props.parent.setInputState(CONTACT, [form.getState(), ""]);
        updateManagerContext.setChangesMade("General", JSON.stringify(form.getData()) !== JSON.stringify(oldContact));
    }

    return (
        <Fragment>
            {props.tabOpen &&
                <div className="row-start-5 row-span-1 col-start-1 col-span-1 grow relative flex flex-col h-min">
                <div className="bg-white relative after:absolute after:w-[1px] after:h-full after:top-0 after:left-[0px] after:bg-gray-300 before:absolute before:w-[1px] before:h-full after:top-0 before:right-[0px] before:bg-gray-300 h-full grow">
                    <table className="grow w-full border-collapse">
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
                        onSave={saveForm}
                        onReset={resetForm}
                    />
                </div>
            }
        </Fragment>
    )
}
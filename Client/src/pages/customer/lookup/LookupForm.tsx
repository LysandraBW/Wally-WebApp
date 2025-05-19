"use client";
import { startForm } from "./_DEF";
import Button from "@/component/Form/Button/Button";
import LookupAppointment from "@/services/DB/Procedure/Appointment/LookupAppointment";
import TextField from "@/component/Form/Text/TextField";
import useForm from "@/features/Form/useForm/useForm";
import { ID } from "@/app/lookup/page";
import ButtonTwo from "@/component/Form/Button/ButtonTwo";

interface LookupFormProps {
    setPerson: (person: ID | null) => void;
}

export default function LookupForm(props: LookupFormProps) {
    const form = useForm("Lookup", startForm());
 
    const submitForm = async () => {
        const output = await LookupAppointment(form.getData());
        props.setPerson(output);
    }
    
    return (
        <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col gap-8"
        >
            <TextField
                type="text"
                name="appointmentID"
                label="ID"
                value={form.getInput("appointmentID").data}
                state={form.getInput("appointmentID").state}
                onChange={form.updateInputData}
                onBlur={undefined}
            />
            <TextField
                type="text"
                name="email"
                label="Email Address"
                value={form.getInput("email").data}
                state={form.getInput("email").state}
                onChange={form.updateInputData}
                onBlur={undefined}
            />
            <ButtonTwo
                id="errorPopup"
                label="Search"
                onClick={submitForm}
            />
        </form>
    )
}
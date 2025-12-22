"use client";
import TextField from "@/component/Form/Text/Text";
import { UseForm } from "@/features/Form/useForm/useForm";
import ButtonTwo from "@/component/Form/Button/Button2";
import { Fragment } from "react";

interface LookupFormProps {
    form: UseForm;
    submitForm: () => void;
}

export default function LookupForm(props: LookupFormProps) {
    return (
        <Fragment>
            <TextField
                type="text"
                name="appointmentID"
                label="ID"
                value={props.form.getInput("appointmentID").data}
                state={props.form.getInput("appointmentID").state}
                onChange={props.form.updateInputData}
                onBlur={undefined}
            />
            <TextField
                type="text"
                name="email"
                label="Email Address"
                value={props.form.getInput("email").data}
                state={props.form.getInput("email").state}
                onChange={props.form.updateInputData}
                onBlur={undefined}
            />
            <ButtonTwo
                id="errorPopup"
                label="Search"
                onClick={props.submitForm}
            />
        </Fragment>
    )
}
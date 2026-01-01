import TextField from "@/component/Form/Text/Text";
import { UseForm } from "@/features/Form/useForm/useForm";
import { Fragment } from "react";

interface ContactFormProps {
    form: UseForm;
}

export default function ContactForm(props: ContactFormProps) {
    return (
        <Fragment>
            <TextField
                type="text"
                name="fName"
                label="First Name"
                value={props.form.getInput("fName").data}
                state={props.form.getInput("fName").state}
                onChange={props.form.updateInputData}
            />
            <TextField
                type="text"
                name="lName"
                label="Last Name"
                value={props.form.getInput("lName").data}
                state={props.form.getInput("lName").state}
                onChange={props.form.updateInputData}
            />
            <TextField
                type="text"
                name="email"
                label="Email Address"
                value={props.form.getInput("email").data}
                state={props.form.getInput("email").state}
                onChange={props.form.updateInputData}
            />
            <TextField
                name="phone"
                label="Phone Number"
                placeholder="123-456-7890"
                value={props.form.getInput("phone").data}
                state={props.form.getInput("phone").state}
                onChange={props.form.updateInputData}
            />
        </Fragment>
    )
}
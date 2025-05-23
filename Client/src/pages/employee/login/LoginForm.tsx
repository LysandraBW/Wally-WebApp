import { startLoginForm } from "./_DEF";
import useForm from "@/features/Form/useForm/useForm";
import TextField from "@/component/Form/Text/TextField";
import { Fragment } from "react";
import ButtonTwo from "@/component/Form/Button/ButtonTwo";
import { LoginEmployee } from "@/services/DB/Employee/LoginEmployee";

interface LoginFormProps {
    setSessionID: (sessionID: string) => void;
}

export default function LoginForm(props: LoginFormProps) {
    const form = useForm("Login", startLoginForm());

    const submitForm = async () => {
        if (!form.getState()) {
            props.setSessionID("");
            return;
        }
        const output = await LoginEmployee(form.getData());
        props.setSessionID(output);
    }

    return (
        <Fragment>
            <TextField
                type="text"
                name="username"
                label="Username"
                value={form.getInput("username").data}
                state={form.getInput("username").state}
                onChange={form.updateInputData}
            />
            <TextField
                type="password"
                name="password"
                label="Password"
                value={form.getInput("password").data}
                state={form.getInput("password").state}
                onChange={form.updateInputData}
            />
            <ButtonTwo
                id="errorPopup"
                label="Login"
                onClick={submitForm}
            />
        </Fragment>
    )
}
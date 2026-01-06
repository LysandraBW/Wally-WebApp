import { startLoginForm } from "./_DEF";
import useForm from "@/features/Form/useForm/useForm";
import TextField from "@/component/Form/Text/Text";
import { Fragment } from "react";
import { LoginEmployee } from "@/services/DB/Employee/LoginEmployee";
import PrimaryButton from "@/component/Button/PrimaryButton";

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
        <form
            onSubmit={(e) => e.preventDefault()}
            className="w-full max-w-[320px] flex flex-col gap-4"
        >
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
            <PrimaryButton
                id="errorPopup"
                className="mt-2 text-sm"
                onClick={submitForm}
            >
                Login
            </PrimaryButton>
        </form>
    )
}
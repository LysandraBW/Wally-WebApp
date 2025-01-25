import { startLoginForm } from "./_DEF";
import { LoginEmployee } from "@/services/DB/Procedure/Employee/LoginEmployee";
import useForm from "@/features/Form/useForm/useForm";
import TextField from "@/component/Form/Text/TextField";
import Button from "@/component/Form/Button/Button";

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
            onSubmit={e => e.preventDefault()}
            className="flex flex-col gap-8"
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
            <Button
                label="Login"
                style="dark"
                onClick={submitForm}
            />
        </form>
    )
}
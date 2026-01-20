import { startLoginForm } from "./_DEF";
import useForm from "@/features/Form/useForm/useForm";
import TextField from "@/component/Form/Text/Text";
import { Fragment, useEffect, useState } from "react";
import { LoginEmployee } from "@/services/db/Employee/LoginEmployee";
import PrimaryButton from "@/component/Button/PrimaryButton";
import { Tooltip } from "react-tooltip";

interface LoginFormProps {
    sessionID: string|undefined;
    setSessionID: (sessionID: string) => void;
}

export default function LoginForm(props: LoginFormProps) {
    const form = useForm("Login", startLoginForm());
    const [showError, setShowError] = useState(false);

    const submitForm = async () => {
        if (!form.getState()) {
            setShowError(true);
            props.setSessionID("");
            return;
        }
        const output = await LoginEmployee(form.getData());
        props.setSessionID(output);
        
        if (!output)
            setShowError(true);
    }

    return (
        <form
            onSubmit={(e) => e.preventDefault()}
            className="w-full flex flex-col gap-4"
        >
            <TextField
                type="text"
                name="username"
                label="Username"
                value={form.getInput("username").data}
                state={form.getInput("username").state}
                onChange={(name, value) => {
                    setShowError(false)
                    form.updateInputData(name, value);
                }}
            />
            <TextField
                type="password"
                name="password"
                label="Password"
                value={form.getInput("password").data}
                state={form.getInput("password").state}
                onChange={(name, value) => {
                    setShowError(false)
                    form.updateInputData(name, value);
                }}
            />
            <PrimaryButton
                id="errorPopup"
                className="mt-2 text-sm"
                onClick={submitForm}
            >
                Login
            </PrimaryButton>
            {showError && 
                <Tooltip
                    isOpen={true}
                    anchorSelect="#errorPopup"
                    opacity={1}
                    place="bottom"
                    border="1px solid #FCF34D"
                    style={{
                        backgroundColor: "#fffbeb",
                        display: "flex",
                        gap: "0rem",
                        borderRadius: "6px",
                        alignItems: "center",
                        flexDirection: "column",
                        boxShadow: "0px 2px 2px 0px #00000010",
                    }}
                >
                    <h6 className="text-xs tracking-wide text-base-500 dark:text-base-400">
                        No login matches this information. 
                        Please try again.
                    </h6>
                </Tooltip> 
            }
        </form>
    )
}
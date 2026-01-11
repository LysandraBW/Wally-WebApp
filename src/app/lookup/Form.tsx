"use client";
import PrimaryButton from "@/component/Button/PrimaryButton";
import TextField from "@/component/Form/Text/Text";
import { UseForm } from "@/features/Form/useForm/useForm";
import { Tooltip } from "react-tooltip";

interface LookupFormProps {
    user: any;
    form: UseForm;
    submitForm: () => void;
}

export default function Form(props: LookupFormProps) {
    return (
        <div className="flex flex-col w-full">
            <form
                onSubmit={(e) => e.preventDefault()}
                className="w-full flex flex-col gap-6"
            >
                <TextField
                    type="text"
                    name="email"
                    label="Email Address"
                    value={props.form.getInput("email").data}
                    state={props.form.getInput("email").state}
                    onChange={props.form.updateInputData}
                    onBlur={undefined}
                />
                <TextField
                    type="text"
                    name="appointmentID"
                    label="Appointment ID"
                    value={props.form.getInput("appointmentID").data}
                    state={props.form.getInput("appointmentID").state}
                    onChange={props.form.updateInputData}
                    onBlur={undefined}
                />
                <PrimaryButton
                    id="errorPopup"
                    className="mt-2 text-sm"
                    onClick={props.submitForm}
                >
                    Search
                </PrimaryButton>
            </form>
            {props.user === null && 
                <Tooltip
                    isOpen={true}
                    anchorSelect="#errorPopup"
                    opacity={1}
                    place="bottom"
                    border="1px solid #FCD34D"
                    style={{
                        backgroundColor: "#FFFBEB",
                        boxShadow: "0px 2px 2px 0px #00000010",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "0rem",
                        borderRadius: "6px",
                        pointerEvents: "auto"
                    }}
                >
                    <h6 className="text-02 text-gray-600 tracking-wide">
                        No appointment matches this information. 
                        Please try again.
                    </h6>
                    <a 
                        href="/schedule" 
                        className="text-02 text-blue-500 tracking-wide underline"
                    >
                        Haven't scheduled an appointment?
                    </a>
                </Tooltip> 
            }
        </div>
    )
}
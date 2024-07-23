import { Text, Button } from "@/components/Input/Export";

interface LookupFormProps {
    form: {
        appointmentID: string;
        email: string;
    }
    changeHandler: (name: string, value: any) => void;
    submitHandler: () => void;
}

export default function LookupForm(props: LookupFormProps) {
    return (
        <div>
            <Text
                name={"appointmentID"}
                value={props.form.appointmentID}
                label={"Appointment ID"}
                onChange={(name, value) => props.changeHandler(name, value)}
            />
            <Text
                name={"email"}
                value={props.form.email}
                label={"Email"}
                onChange={(name, value) => props.changeHandler(name, value)}
            />
            <Button
                label="Submit"
                onClick={props.submitHandler}
            />
        </div>
    )
}
import { Text, Button } from "@/components/Input/Export";

interface LookupFormProps {
    form: {
        appointmentID: string;
        email: string;
    }
    onChange: (name: string, value: any) => void;
    onSubmit: () => void;
}

export default function LookupForm(props: LookupFormProps) {
    return (
        <div>
            <Text
                name={"appointmentID"}
                value={props.form.appointmentID}
                label={"Appointment ID"}
                onChange={(name, value) => props.onChange(name, value)}
            />
            <Text
                name={"email"}
                value={props.form.email}
                label={"Email"}
                onChange={(name, value) => props.onChange(name, value)}
            />
            <Button
                label="Submit"
                onClick={props.onSubmit}
            />
        </div>
    )
}
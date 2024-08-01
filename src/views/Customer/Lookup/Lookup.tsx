import { Text, Button } from "@/components/Input/Export";
import { ErrorStructure } from "@/lib/Inspector/Inspectors";

interface LookupFormProps {
    form: {
        appointmentID: string;
        email: string;
    }
    formError: ErrorStructure;
    onChange: (name: string, value: any) => void;
    onSubmit: () => void;
}

export default function LookupForm(props: LookupFormProps) {
    return (
        <div>
            <Text
                name={"appointmentID"}
                value={props.form.appointmentID}
                error={props.formError.appointmentID}
                label={"Appointment ID"}
                onChange={(name, value) => props.onChange(name, value)}
            />
            <Text
                name={"email"}
                value={props.form.email}
                error={props.formError.email}
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
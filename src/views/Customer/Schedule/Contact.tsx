import { Text } from "@/components/Input/Export";
import { ErrorStructure } from "@/lib/Inspector/Inspectors";

interface ContactFormProps {
    form: {
        fName: string;
        lName: string;
        email: string;
        phone: string;
    }
    error: ErrorStructure;
    onChange: (name: string, value: any) => void;
}

export default function ContactForm(props: ContactFormProps) {
    return (
        <div>
            <Text
                name={"fName"}
                value={props.form.fName}
                label={"First Name"}
                error={props.error.fName}
                onChange={(name, value) => props.onChange(name, value)}
            />
            <Text
                name={"lName"}
                value={props.form.lName}
                label={"Last Name"}
                error={props.error.lName}
                onChange={(name, value) => props.onChange(name, value)}
            />
            <Text
                name={"email"}
                value={props.form.email}
                label={"Email"}
                error={props.error.email}
                onChange={(name, value) => props.onChange(name, value)}
            />
            <Text
                name={"phone"}
                value={props.form.phone}
                label={"Phone"}
                error={props.error.phone}
                onChange={(name, value) => props.onChange(name, value)}
            />
        </div>
    )
}
import { Text } from "@/components/Input/Export";

interface ContactFormProps {
    form: {
        fName: string;
        lName: string;
        email: string;
        phone: string;
    }
    onChange: (name: string, value: any) => void;
}

export default function ContactForm(props: ContactFormProps) {
    return (
        <div>
            <Text
                name={"fName"}
                value={props.form.fName}
                label={"First Name"}
                onChange={(name, value) => props.onChange(name, value)}
            />
            <Text
                name={"lName"}
                value={props.form.lName}
                label={"Last Name"}
                onChange={(name, value) => props.onChange(name, value)}
            />
            <Text
                name={"email"}
                value={props.form.email}
                label={"Email"}
                onChange={(name, value) => props.onChange(name, value)}
            />
            <Text
                name={"phone"}
                value={props.form.phone}
                label={"Phone"}
                onChange={(name, value) => props.onChange(name, value)}
            />
        </div>
    )
}
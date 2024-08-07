import { Text } from '@/components/Input/Export';
import { DefaultState } from "@/hook/State/Interface";
import { Fragment } from 'react';

interface ContactFormProps {
    form: {
        fName: string;
        lName: string;
        email: string;
        phone: string;
    };
    onChange: (name: string, value: any) => void;
}

export default function ContactForm(props: ContactFormProps) {
    return (
        <Fragment>
            <Text
                type='text'
                name='fName'
                label='First Name'
                value={props.form.fName}
                onChange={(name, value) => props.onChange(name, value)}
                state={DefaultState}
                onBlur={null}
            />
            <Text
                type='text'
                name='lName'
                label='Last Name'
                value={props.form.lName}
                onChange={(name, value) => {
                    props.onChange(name, value);
                }}
                state={DefaultState}
                onBlur={null}
            />
            <Text
                type='text'
                name='email'
                label='Email'
                value={props.form.email}
                onChange={(name, value) => props.onChange(name, value)}
                state={DefaultState}
                onBlur={null}
            />
            <Text
                type='text'
                name='phone'
                label='Phone'
                value={props.form.phone}
                onChange={(name, value) => props.onChange(name, value)}
                state={DefaultState}
                onBlur={null}
            />
        </Fragment>
    )
}
import { Text, Button } from '@/components/Input/Export';
import { DefaultState } from "@/hook/State/Interface";
import { Fragment } from 'react';

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
        <Fragment>
            <Text
                type='text'
                name={'appointmentID'}
                label={'Appointment ID'}
                value={props.form.appointmentID}
                onChange={(name, value) => props.onChange(name, value)}
                state={DefaultState}
                onBlur={null}
            />
            <Text
                type='text'
                name={'email'}
                label={'Email'}
                value={props.form.email}
                onChange={(name, value) => props.onChange(name, value)}
                state={DefaultState}
                onBlur={null}
            />
            <Button
                label='Submit'
                onClick={props.onSubmit}
            />
        </Fragment>
    )
}
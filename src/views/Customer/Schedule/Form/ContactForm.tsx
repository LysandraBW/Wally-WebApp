import { Text } from '@/components/Input/Export';
import { StateType } from '@/process/Customer/Schedule/State';
import { DataKeys, DataType } from '@/submission/Customer/Schedule/Data';
import { Fragment } from 'react';

interface ContactFormProps {
    data: DataType;
    state: StateType;
    onChange: (name: DataKeys, value: any) => void;
}

export default function ContactForm(props: ContactFormProps) {
    return (
        <Fragment>
            <Text
                type='text'
                name='FName'
                label='First Name'
                value={props.data.FName}
                onChange={(name, value) => props.onChange('FName', value)}
                state={props.state.FName}
                onBlur={null}
            />
            <Text
                type='text'
                name='LName'
                label='Last Name'
                value={props.data.LName}
                onChange={(name, value) => props.onChange('LName', value)}
                state={props.state.LName}
                onBlur={null}
            />
            <Text
                type='text'
                name='Email'
                label='Email'
                value={props.data.Email}
                onChange={(name, value) => props.onChange('Email', value)}
                state={props.state.Email}
                onBlur={null}
            />
            <Text
                type='text'
                name='Phone'
                label='Phone'
                value={props.data.Phone}
                onChange={(name, value) => props.onChange('Phone', value)}
                state={props.state.Phone}
                onBlur={null}
            />
        </Fragment>
    )
}
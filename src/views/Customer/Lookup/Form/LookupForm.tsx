import { Text, Button } from '@/components/Input/Export';
import { StateType } from '@/process/Customer/Lookup/State';
import { DataKeys, DataType } from '@/submission/Customer/Lookup/Data';
import { Fragment } from 'react';

interface LookupFormProps {
    data: DataType;
    state: StateType;
    onChange: (name: DataKeys, value: any) => void;
    onSubmit: () => void;
}

export default function LookupForm(props: LookupFormProps) {
    return (
        <Fragment>
            <Text
                type='text'
                name='AppointmentID'
                label='Appointment ID'
                value={props.data.AppointmentID}
                state={props.state.AppointmentID}
                onChange={(name, value) => props.onChange('AppointmentID', value)}
                onBlur={null}
            />
            <Text
                type='text'
                name='Email'
                label='Email'
                value={props.data.Email}
                state={props.state.Email}
                onChange={(name, value) => props.onChange('Email', value)}
                onBlur={null}
            />
            <Button
                label='Submit'
                onClick={props.onSubmit}
            />
        </Fragment>
    )
}
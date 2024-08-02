import { Text, Button } from '@/components/Input/Export';
import FormStateReducer, { InitialFormState, ReducerState } from '@/hook/FormState/Reducer';
import { InitialLookupFormState } from '@/validation/State/Lookup';
import { validUniqueIdentifier, validEmail } from '@/validation/Validation';
import { useEffect, useReducer } from 'react';

interface LookupFormProps {
    form: {
        appointmentID: string;
        email: string;
    }
    onChange: (name: string, value: any) => void;
    onSubmit: () => void;
    updateFormState: (state: boolean) => void;
}

export default function LookupForm(props: LookupFormProps) {
    const [formState, formStateDispatch] = useReducer(FormStateReducer, InitialLookupFormState);

    useEffect(() => {
        props.updateFormState(formState.state);
    }, [formState.state]);

    const inspectAppointmentID = async (aptID: string = props.form.appointmentID): Promise<boolean> => {
        const [errState, errMessage] = await validUniqueIdentifier(aptID);
        formStateDispatch({
            name: 'appointmentID',
            state: [errState, errMessage]
        });
        return errState;
    }

    const inspectEmail = async (email: string = props.form.email): Promise<boolean> => {
        const [errState, errMessage] = await validEmail(email)
        formStateDispatch({
            name: 'email',
            state: [errState, errMessage]
        });
        return errState;
    }

    return (
        <div>
            <Text
                name={'appointmentID'}
                label={'Appointment ID'}
                value={props.form.appointmentID}
                error={formState.input.appointmentID}
                onChange={(name, value) => {
                    inspectAppointmentID(value);
                    props.onChange(name, value);
                }}
            />
            <Text
                name={'email'}
                label={'Email'}
                value={props.form.email}
                error={formState.input.email}
                onChange={(name, value) => {
                    inspectEmail(value);
                    props.onChange(name, value);
                }}
            />
            <Button
                label='Submit'
                onClick={props.onSubmit}
            />
        </div>
    )
}
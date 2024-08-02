import { Text, Button } from '@/components/Input/Export';
import { ReducerAction, ReducerState } from '@/hook/FormState/Reducer';
import { validUniqueIdentifier, validEmail } from '@/validation/Validation';

interface LookupFormProps {
    form: {
        appointmentID: string;
        email: string;
    }
    formState: ReducerState;
    updateFormState: (action: ReducerAction) => void;
    onChange: (name: string, value: any) => void;
    onSubmit: () => void;
}

export default function LookupForm(props: LookupFormProps) {
    const inspectInput = async <T,> (
        name: string, 
        value: T, 
        callback: (v: T) => Promise<[boolean, string?]>
    ): Promise<boolean> => {
        const [errState, errMessage] = await callback(value);
        props.updateFormState({
            name: name,
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
                error={props.formState.input.appointmentID}
                onChange={(name, value) => {
                    inspectInput(name, value, validUniqueIdentifier);
                    props.onChange(name, value);
                }}
            />
            <Text
                name={'email'}
                label={'Email'}
                value={props.form.email}
                error={props.formState.input.email}
                onChange={(name, value) => {
                    inspectInput(name, value, validEmail);
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
import { Text, Button } from '@/components/Input/Export';
import { FormStateAction } from "@/hook/State/Interface";
import { FormState } from "@/hook/State/Interface";
import { validUniqueIdentifier, validEmail } from '@/validation/Validation';

interface LookupFormProps {
    form: {
        appointmentID: string;
        email: string;
    }
    formState: FormState;
    updateFormState: (action: FormStateAction) => void;
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
            states: {
                [`${name}`]: [errState, errMessage]
            }
        });
        return errState;
    }

    return (
        <div>
            <Text
                name={'appointmentID'}
                label={'Appointment ID'}
                value={props.form.appointmentID}
                state={props.formState.input.appointmentID}
                onChange={(name, value) => {
                    inspectInput(name, value, validUniqueIdentifier);
                    props.onChange(name, value);
                }}
            />
            <Text
                name={'email'}
                label={'Email'}
                value={props.form.email}
                state={props.formState.input.email}
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
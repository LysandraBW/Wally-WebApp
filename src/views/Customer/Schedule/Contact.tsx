import { Text } from '@/components/Input/Export';
import { ReducerState } from '@/hook/FormState/Reducer';
import { validEmail, validName, validPhone } from '@/validation/Validation';
interface ContactFormProps {
    form: {
        fName: string;
        lName: string;
        email: string;
        phone: string;
    };
    formState: ReducerState;
    updateFormState: (updatedInputState: {name: string, state: [boolean, string?]}) => void;
    onChange: (name: string, value: any) => void;
}

export default function ContactForm(props: ContactFormProps) {
    const inspectInput = async <T,>(
        inputName: string, 
        input: T, 
        callback: (value: T) => Promise<[boolean, string?]>
    ): Promise<boolean> => {
        const [errState, errMessage] = await callback(input);
        props.updateFormState({
            name: inputName,
            state: [errState, errMessage]
        });
        return errState;
    }

    return (
        <div>
            <Text
                name={'fName'}
                label={'First Name'}
                value={props.form.fName}
                error={props.formState.input.fName}
                onChange={(name, value) => {
                    inspectInput('fName', value, validName);
                    props.onChange(name, value);
                }}
            />
            <Text
                name={'lName'}
                label={'Last Name'}
                value={props.form.lName}
                error={props.formState.input.lName}
                onChange={(name, value) => {
                    inspectInput('lName', value, validName);
                    props.onChange(name, value);
                }}
            />
            <Text
                name={'email'}
                label={'Email'}
                value={props.form.email}
                error={props.formState.input.email}
                onChange={(name, value) => {
                    inspectInput('email', value, validEmail);
                    props.onChange(name, value);
                }}
            />
            <Text
                name={'phone'}
                label={'Phone'}
                value={props.form.phone}
                error={props.formState.input.phone}
                onChange={(name, value) => {
                    inspectInput('phone', value, validPhone);
                    props.onChange(name, value);
                }}
            />
        </div>
    )
}
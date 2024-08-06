import { Text } from '@/components/Input/Export';
import { FormState, FormStateAction } from "@/hook/State/Interface";
import { validEmail, validName, validPhone } from '@/validation/Validation';
import { Fragment } from 'react';

interface ContactFormProps {
    form: {
        fName: string;
        lName: string;
        email: string;
        phone: string;
    };
    formState: FormState;
    updateFormState: (formStateAction: FormStateAction) => void;
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
            states: {
                [`${inputName}`]: [errState, errMessage]
            }
        });
        return errState;
    }

    return (
        <Fragment>
            <Text
                name={'fName'}
                label={'First Name'}
                value={props.form.fName}
                state={props.formState.input.fName}
                onChange={(name, value) => {
                    inspectInput('fName', value, validName);
                    props.onChange(name, value);
                }}
            />
            <Text
                name={'lName'}
                label={'Last Name'}
                value={props.form.lName}
                state={props.formState.input.lName}
                onChange={(name, value) => {
                    inspectInput('lName', value, validName);
                    props.onChange(name, value);
                }}
            />
            <Text
                name={'email'}
                label={'Email'}
                value={props.form.email}
                state={props.formState.input.email}
                onChange={(name, value) => {
                    inspectInput('email', value, validEmail);
                    props.onChange(name, value);
                }}
            />
            <Text
                name={'phone'}
                label={'Phone'}
                value={props.form.phone}
                state={props.formState.input.phone}
                onChange={(name, value) => {
                    inspectInput('phone', value, validPhone);
                    props.onChange(name, value);
                }}
            />
        </Fragment>
    )
}
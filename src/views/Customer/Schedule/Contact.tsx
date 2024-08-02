import { Text } from '@/components/Input/Export';
import FormStateReducer from '@/reducer/FormState/Reducer';
import { InitialContactFormState } from '@/validation/State/Contact';
import { validEmail, validName, validPhone } from '@/validation/Validation';
import { useEffect, useReducer } from 'react';

interface ContactFormProps {
    form: {
        fName: string;
        lName: string;
        email: string;
        phone: string;
    };
    updateFormState: (state: boolean) => void;
    onChange: (name: string, value: any) => void;
}

export default function ContactForm(props: ContactFormProps) {
    const [formState, formStateDispatch] = useReducer(FormStateReducer, InitialContactFormState);

    useEffect(() => {
        props.updateFormState(formState.state);
    }, [formState.state]);

    const inspectFName = async (fName: string = props.form.fName): Promise<boolean> => {
        const [errState, errMessage] = await validName(fName);
        formStateDispatch({
            name: 'fName',
            state: [errState, errMessage]
        });
        return errState;
    }

    const inspectLName = async (lName: string = props.form.lName): Promise<boolean> => {
        const [errState, errMessage] = await validName(lName);
        formStateDispatch({
            name: 'lName',
            state: [errState, errMessage]
        });
        return errState;
    }

    const inspectEmail = async (email: string = props.form.email): Promise<boolean> => {
        const [errState, errMessage] = await validEmail(email);
        formStateDispatch({
            name: 'email',
            state: [errState, errMessage]
        });
        return errState;
    }

    const inspectPhone = async (phone: string = props.form.phone): Promise<boolean> => {
        const [errState, errMessage] = await validPhone(phone);
        formStateDispatch({
            name: 'phone',
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
                error={formState.input.fName}
                onChange={(name, value) => {
                    inspectFName(value);
                    props.onChange(name, value);
                }}
            />
            <Text
                name={'lName'}
                label={'Last Name'}
                value={props.form.lName}
                error={formState.input.lName}
                onChange={(name, value) => {
                    inspectLName(value);
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
            <Text
                name={'phone'}
                label={'Phone'}
                value={props.form.phone}
                error={formState.input.phone}
                onChange={(name, value) => {
                    inspectPhone(value);
                    props.onChange(name, value);
                }}
            />
        </div>
    )
}
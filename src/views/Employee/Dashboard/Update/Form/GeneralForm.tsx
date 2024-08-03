import { Segment, Text } from '@/components/Input/Export';
import { DB_Statuses } from '@/database/Info/Info';
import { DB_Status } from '@/database/Types';
import { inValues } from '@/lib/ok/Inspector/Inspect/Inspectors';
import { FormType } from '@/submission/Employee/Update/Form/Form';
import FormStateReducer from '@/hook/State/Reducer';
import { InitialGeneralFormState } from '@/validation/State/General';
import { validDate, validEmail, validName, validPhone } from '@/validation/Validation';
import { useEffect, useReducer, useState } from 'react';
import { GeneralFormStructure } from '@/submission/Employee/Update/Form/Form/General/General';

interface GeneralProps {
    form: GeneralFormStructure;
    changeHandler: (form: FormType, name: string, value: any) => void;
    updateFormState: (state: boolean) => void;
}

export default function General(props: GeneralProps) {
    const [statuses, setStatuses] = useState<Array<[any, string]>>([]);
    const [formState, formStateDispatch] = useReducer(FormStateReducer, InitialGeneralFormState);

    useEffect(() => {
        const load = async () => {
            let statuses: Array<DB_Status> = await DB_Statuses();
            setStatuses(statuses.map(status => [status.StatusID, status.Status]));

            // Initialize Form State
            formStateDispatch({
                states: {
                    FName: await validName(props.form.FName),
                    LName: await validName(props.form.LName),
                    Email: await validEmail(props.form.Email),
                    Phone: await validPhone(props.form.Phone),
                    StartDate: await validDate(props.form.StartDate),
                    EndDate: await validDate(props.form.EndDate),
                    StatusID: await inValues({
                        values: statuses.map(s => s.StatusID)
                    }).inspect([props.form.StatusID])
                }
            });
        }
        load();
    }, []);

    useEffect(() => {
        props.updateFormState(formState.state);
    }, [formState.state]);

    const inspectInput = async <T,>(
        inputName: string, 
        input: T, 
        callback: (value: T) => Promise<[boolean, string?]>
    ): Promise<boolean> => {
        const [errState, errMessage] = await callback(input);
        formStateDispatch({
            name: inputName,
            state: [errState, errMessage]
        });
        return errState;
    }

    return (
        <>
            <Text
                name={'FName'}
                label={'First Name'}
                value={props.form.FName}
                state={formState.input.FName}
                onChange={(name, value) => {
                    props.changeHandler('General', name, value);
                    inspectInput('FName', value, validName);
                }}
            />
            <Text
                name={'LName'}
                label={'Last Name'}
                value={props.form.LName}
                state={formState.input.LName}
                onChange={(name, value) => {
                    props.changeHandler('General', name, value);
                    inspectInput('LName', value, validName);
                }}
            />
            <Text
                name={'Email'}
                label={'Email Address'}
                value={props.form.Email}
                state={formState.input.Email}
                onChange={(name, value) => {
                    props.changeHandler('General', name, value);
                    inspectInput('Email', value, validEmail);
                }}
            />
            <Text
                name={'Phone'}
                label={'Phone'}
                value={props.form.Phone}
                state={formState.input.Phone}
                onChange={(name, value) => {
                    props.changeHandler('General', name, value);
                    inspectInput('Phone', value, validPhone);
                }}
            />
            <Text
                type='datetime-local'
                name={'StartDate'}
                label={'Start Date'}
                value={props.form.StartDate}
                state={formState.input.StartDate}
                onChange={(name, value) => {
                    props.changeHandler('General', name, value);
                    inspectInput('StartDate', value, validDate);
                }}
            />
            <Text
                type='datetime-local'
                name={'EndDate'}
                label={'End Date'}
                value={props.form.EndDate}
                state={formState.input.EndDate}
                onChange={(name, value) => {
                    props.changeHandler('General', name, value);
                    inspectInput('EndDate', value, validDate);
                }}
            />
            <Segment
                name={'StatusID'}
                label={'StatusID'}
                value={props.form.StatusID}
                values={statuses}
                state={formState.input.StatusID}
                onChange={(name, value) => {
                    props.changeHandler('General', name, value);
                    inspectInput('StatusID', value, async (v: string) => {
                        return await inValues({
                            values: statuses.map(s => s[0])
                        }).inspect([v]);
                    });
                }}
            />
        </>
    )
}
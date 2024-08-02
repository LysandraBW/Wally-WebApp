import { Segment, Text } from "@/components/Input/Export";
import { DB_Statuses } from "@/database/Info/Info";
import { DB_Status } from "@/database/Types";
import { inValues } from "@/lib/Inspector/Inspector/Inspect/Inspectors";
import { FormPart } from "@/process/Employee/Update/Form/UpdateForm";
import FormStateReducer from "@/hook/FormState/Reducer";
import { InitialGeneralFormState } from "@/validation/State/General";
import { validDate, validEmail, validName, validPhone } from "@/validation/Validation";
import { useEffect, useReducer, useState } from "react";

interface GeneralProps {
    form: {
        FName: string;
        LName: string;
        Email: string;
        Phone: string;
        StartDate: string;
        EndDate: string;
        StatusID: number;
    };
    changeHandler: (part: FormPart, name: string, value: any) => void;
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
                name={"FName"}
                value={props.form.FName}
                error={formState.input.FName}
                label={"First Name"}
                onChange={(name, value) => {
                    props.changeHandler('General', name, value);
                    inspectInput('FName', value, validName);
                }}
            />
            <Text
                name={"LName"}
                value={props.form.LName}
                error={formState.input.LName}
                label={"Last Name"}
                onChange={(name, value) => {
                    props.changeHandler('General', name, value);
                    inspectInput('LName', value, validName);
                }}
            />
            <Text
                name={"Email"}
                value={props.form.Email}
                error={formState.input.Email}
                label={"Email Address"}
                onChange={(name, value) => {
                    props.changeHandler('General', name, value);
                    inspectInput('Email', value, validEmail);
                }}
            />
            <Text
                name={"Phone"}
                value={props.form.Phone}
                error={formState.input.Phone}
                label={"Phone"}
                onChange={(name, value) => {
                    props.changeHandler('General', name, value);
                    inspectInput('Phone', value, validPhone);
                }}
            />
            <Text
                type="datetime-local"
                name={"StartDate"}
                value={props.form.StartDate}
                error={formState.input.StartDate}
                label={"Start Date"}
                onChange={(name, value) => {
                    props.changeHandler('General', name, value);
                    inspectInput('StartDate', value, validDate);
                }}
            />
            <Text
                type="datetime-local"
                name={"EndDate"}
                value={props.form.EndDate}
                error={formState.input.EndDate}
                label={"End Date"}
                onChange={(name, value) => {
                    props.changeHandler('General', name, value);
                    inspectInput('EndDate', value, validDate);
                }}
            />
            <Segment
                name={"StatusID"}
                value={props.form.StatusID}
                error={formState.input.StatusID}
                values={statuses}
                label={"StatusID"}
                onChange={(name, value) => {
                    props.changeHandler('General', name, value);
                    inspectInput('StatusID', value, async (v: string) => {
                        return await inValues({
                            values: statuses.map(s => s[0])
                        }).inspect([v]);
                    })
                }}
            />
        </>
    )
}
import { Segment, Text } from "@/components/Input/Export";
import { DB_Statuses } from "@/database/Info/Info";
import { DB_Status } from "@/database/Types";
import { inValues, isDateTime, isEmailAddress, isName, isPhoneNumber } from "@/lib/Inspector/Inspector/Inspect/Inspectors";
import { ErrorStructure } from "@/lib/Inspector/Inspectors";
import { FormPart } from "@/process/Employee/Update/Form/UpdateForm";
import FormErrorReducer, { InitialFormError } from "@/reducer/FormError/Reducer";
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
    updateFormError: (state: boolean) => void;
}

export default function General(props: GeneralProps) {
    const initialData = {...props.form};
    const [statuses, setStatuses] = useState<Array<[any, string]>>([]);
    const [formError, formErrorDispatch] = useReducer(FormErrorReducer, InitialFormError);

    useEffect(() => {
        const load = async () => {
            let statuses: Array<DB_Status> = await DB_Statuses();
            setStatuses(statuses.map(status => [status.StatusID, status.Status]));
        }
        load();
    }, []);

    useEffect(() => {
        props.updateFormError(formError.state);
    }, [formError.state]);
    
    const inspectFName = async (fName: string = props.form.FName): Promise<boolean> => {
        const [errState, errMessage] = await isName().inspect(fName);
        formErrorDispatch({
            name: 'FName',
            inspection: [errState, errMessage]
        });
        return errState;
    }

    const inspectLName = async (lName: string = props.form.LName): Promise<boolean> => {
        const [errState, errMessage] = await isName().inspect(lName);
        formErrorDispatch({
            name: 'LName',
            inspection: [errState, errMessage]
        });
        return errState;
    }

    const inspectEmail = async (email: string = props.form.Email): Promise<boolean> => {
        const [errState, errMessage] = await isEmailAddress().inspect(email);
        formErrorDispatch({
            name: 'Email',
            inspection: [errState, errMessage]
        });
        return errState;
    }

    const inspectPhone = async (phone: string = props.form.Phone): Promise<boolean> => {
        const [errState, errMessage] = await isEmailAddress().inspect(phone);
        formErrorDispatch({
            name: 'Phone',
            inspection: [errState, errMessage]
        });
        return errState;
    }

    const inspectStartDate = async (startDate: string = props.form.StartDate): Promise<boolean> => {
        const [errState, errMessage] = await isDateTime({
            optional: true
        }).inspect(startDate);
        
        formErrorDispatch({
            name: 'StartDate',
            inspection: [errState, errMessage]
        });
        return errState;
    }

    const inspectEndDate = async (endDate: string = props.form.EndDate): Promise<boolean> => {
        const [errState, errMessage] = await isDateTime({
            optional: true
        }).inspect(endDate);

        formErrorDispatch({
            name: 'EndDate',
            inspection: [errState, errMessage]
        });
        return errState;
    }

    const inspectStatusID = async (statusID: number = props.form.StatusID): Promise<boolean> => {
        const [errState, errMessage] = await inValues({
            values: statuses.map(s => s[0])
        }).inspect([statusID]);

        formErrorDispatch({
            name: 'StatusID',
            inspection: [errState, errMessage]
        });
        return errState;
    }

    const changeHandler = async (name: string, value: any) => {
        props.changeHandler('General', name, value);
    }

    return (
        <>
            <Text
                name={"FName"}
                value={props.form.FName}
                error={formError.input.FName}
                label={"First Name"}
                onChange={(name, value) => {
                    changeHandler(name, value);
                    inspectFName(value);
                }}
                onBlur={() => {
                    if (props.form.FName)
                        return;
                    props.changeHandler('General', 'FName', initialData.FName);
                    inspectFName(initialData.FName);
                }}
            />
            <Text
                name={"LName"}
                value={props.form.LName}
                error={formError.input.LName}
                label={"Last Name"}
                onChange={(name, value) => {
                    changeHandler(name, value);
                    inspectLName(value);
                }}
                onBlur={() => {
                    if (props.form.LName)
                        return;

                    props.changeHandler('General', 'LName', initialData.LName);
                    inspectLName(initialData.LName);
                }}
            />
            <Text
                name={"Email"}
                value={props.form.Email}
                error={formError.input.Email}
                label={"Email Address"}
                onChange={(name, value) => {
                    changeHandler(name, value);
                    inspectEmail(value);
                }}
                onBlur={() => {
                    if (props.form.Email)
                        return;

                    props.changeHandler('General', 'Email', initialData.Email);
                    inspectEmail(initialData.Email);
                }}
            />
            <Text
                name={"Phone"}
                value={props.form.Phone}
                error={formError.input.Phone}
                label={"Phone"}
                onChange={(name, value) => {
                    changeHandler(name, value);
                    inspectPhone(value);
                }}
                onBlur={() => {
                    if (props.form.Phone)
                        return;

                    props.changeHandler('General', 'Phone', initialData.Phone);
                    inspectPhone(initialData.Phone);
                }}
            />
            <Text
                type="datetime-local"
                name={"StartDate"}
                value={props.form.StartDate}
                error={formError.input.StartDate}
                label={"Start Date"}
                onChange={(name, value) => {
                    changeHandler(name, value);
                    inspectStartDate(value);
                }}
                onBlur={() => {
                    if (props.form.StartDate)
                        return;

                    props.changeHandler('General', 'StartDate', initialData.StartDate);
                    inspectStartDate(initialData.StartDate);
                }}
            />
            <Text
                type="datetime-local"
                name={"EndDate"}
                value={props.form.EndDate}
                error={formError.input.EndDate}
                label={"End Date"}
                onChange={(name, value) => {
                    changeHandler(name, value);
                    inspectEndDate(value);
                }}
                onBlur={() => {
                    if (props.form.EndDate)
                        return;

                    props.changeHandler('General', 'EndDate', initialData.EndDate);
                    inspectEndDate(initialData.EndDate);
                }}
            />
            <Segment
                name={"StatusID"}
                value={props.form.StatusID}
                error={formError.input.StatusID}
                values={statuses}
                label={"StatusID"}
                onChange={(name, value) => {
                    changeHandler(name, value);
                    inspectStatusID(value);
                }}
                onBlur={() => {
                    if (props.form.StatusID)
                        return;

                    props.changeHandler('General', 'StatusID', initialData.StatusID);
                    inspectStatusID(initialData.StatusID);
                }}
            />
        </>
    )
}
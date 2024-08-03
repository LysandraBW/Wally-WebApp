import { PageContext } from "@/app/Employee/Dashboard/Calendar/page";
import { Multiple, Text, ToggleGroup } from "@/components/Input/Export";
import { DB_GeneralEmployee } from "@/database/Types";
import { getTimeFromWebDateTime } from "@/lib/Convert/Convert";
import { UpdateEvent as UpdateEventData } from "@/submission/Employee/Calendar/Form";
import FormStateReducer from "@/hook/State/Reducer";
import { InitialFormState } from "@/hook/State/Interface";
import { useContext, useEffect, useReducer, useState } from "react";
import { eachEntry, contains, validDate } from "@/validation/Validation";
import { Regexes } from "@/lib/Inspector/Inspectors";
import SaveButton from "@/components/Button/Text/Save";
import EventCard from "./Card/Event";
import AppointmentCard from "./Card/Appointment";
import CloseButton from "@/components/Button/Icon/Close";

interface UpdateEventProps {
    event: UpdateEventData;
    onClose:  () => void;
    onDelete: () => void;
    onUpdate: (event: UpdateEventData, updateDatabase?: boolean) => void;
    updateFormState: (state: boolean) => void;
}

const EventContext: {
    isEventOwner: boolean;
    eventOwner: {
        name: string;
        employee: DB_GeneralEmployee;
    }
    eventSharees: Array<[string, string]>;
} = {
    isEventOwner: false,
    eventOwner: {
        name: '',
        employee: {
            EmployeeID: '',
            FName: '',
            LName: ''
        }
    },
    eventSharees: []
}

export default function UpdateEvent(props: UpdateEventProps) {
    const context = useContext(PageContext);
    const [eventContext, setEventContext] = useState(EventContext);

    const [edit, setEdit] = useState(false);
    const [values, setValues] = useState(props.event);
    const [formState, formStateDispatch] = useReducer(FormStateReducer, InitialFormState);

    useEffect(() => {
        const owner = context.Employees.find(e => e.EmployeeID === props.event.EmployeeID);
        if (!owner)
            throw 'Cannot Find Event Owner';

        const ownerName = `${owner.FName} ${owner.LName}`;
        const isEventOwner = owner.EmployeeID === context.Employee.EmployeeID;
        const eventSharees = context.Employees.filter(e => (
            e.EmployeeID !== owner.EmployeeID
        )).map(e => [e.EmployeeID, `${e.FName} ${e.LName}`]) as Array<[string, string]>;

        setEventContext({
            isEventOwner,
            eventOwner: {
                employee: owner,
                name: ownerName
            },
            eventSharees: eventSharees
        });
    }, []);

    useEffect(() => {
        props.updateFormState(formState.state);
    }, [formState.state]);

    useEffect(() => {
        setValues(props.event);
    }, [props.event]);

    useEffect(() => {
        if (eventContext.isEventOwner)
            props.onUpdate(values);
    }, [values]);

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
        <div>
            <CloseButton
                onClose={() => {
                    setEdit(false);
                    if (eventContext.isEventOwner)
                        props.onUpdate(values);
                    props.onClose();
                }}
            />
            {edit && 
                <Multiple
                    children={(
                        <div>
                            <Text
                                name='Name'
                                label='Name'
                                value={values.Name} 
                                state={formState.input.Name}
                                onChange={(name, value) => {
                                    setValues({...values, Name: value});
                                    inspectInput('Name', value, contains);
                                }}
                            />
                            <Text
                                name='Summary'
                                label='Summary'
                                value={values.Summary} 
                                state={formState.input.Summary}
                                onChange={(name, value) => {
                                    setValues({...values, Summary: value});
                                    inspectInput('Summary', value, contains);
                                }}
                            />
                            <Text
                                name='UpdatedDate'
                                type='datetime-local'
                                label='Date'
                                value={values.UpdatedDate} 
                                state={formState.input.UpdatedDate}
                                onChange={(name, value) => {
                                    setValues({...values, UpdatedDate: value});
                                    inspectInput('UpdatedEvent', values.UpdatedDate, validDate);
                                }}
                            />
                            <ToggleGroup
                                name='Sharees'
                                label='Sharees'
                                value={values.Sharees}
                                values={eventContext.eventSharees}
                                onChange={async (name, value) => {
                                    inspectInput('Sharees', value, await eachEntry(async (v) => !!v.match(Regexes.UniqueIdentifier)));
                                    setValues({...values, Sharees: value});
                                }}
                            />
                            <SaveButton 
                                onClick={() => {
                                    if (!formState.state)
                                        return;
                                    setEdit(false);
                                    props.onUpdate(values, true);
                                }}
                            />
                        </div>
                    )}
                />
            }
            {!edit && 
                <div>
                    {eventContext.isEventOwner &&
                        <EventCard
                            name={values.Name}
                            date={getTimeFromWebDateTime(values.UpdatedDate)}
                            summary={values.Summary}
                            isEventOwner={eventContext.isEventOwner}
                            ownerName={eventContext.eventOwner.name}
                            shareesName={eventContext.eventSharees.map(e => e[1])}
                            onEdit={() => setEdit(true)}
                            onDelete={props.onDelete}
                        />
                    }
                    {values.AppointmentID &&
                        <AppointmentCard
                            name={values.Name}
                            date={getTimeFromWebDateTime(values.UpdatedDate)}
                            summary={values.Summary}
                            appointmentID={values.AppointmentID}
                        />
                    }
                </div>
            }
        </div>
    )
}
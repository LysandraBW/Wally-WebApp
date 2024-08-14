import { Multiple, Text, ToggleGroup } from "@/components/Input/Export";
import { getTimeFromWebDateTime } from "@/lib/Convert/Convert";
import { UpdateEvent as UpdateEventData } from "@/submission/Employee/Calendar/Form";
import { useEffect, useState } from "react";
import SaveButton from "@/components/Button/Text/Save";
import EventCard from "./Card/Event";
import AppointmentCard from "./Card/Appointment";
import CloseButton from "@/components/Button/Icon/Close";
import { DefaultEventContext, loadEventContext } from "@/process/Employee/Calendar/Event/Context";
import useMutateEvent from "@/process/Employee/Calendar/Event/Process";

export interface UpdateEventProps {
    event: UpdateEventData;
    onClose:  () => void;
    onDelete: () => void;
    onUpdate: (event: UpdateEventData, updateDatabase?: boolean) => void;
    updateFormState: (state: boolean) => void;
}

export default function UpdateEvent(props: UpdateEventProps) {
    const mutateEvent = useMutateEvent({mutateType: 'Update', initialValues: {...props.event}, ...props});
    const [eventContext, setEventContext] = useState(DefaultEventContext);

    useEffect(() => {
        const eventContext = loadEventContext(mutateEvent.context, props.event)
        setEventContext(eventContext);
    }, []);

    useEffect(() => {
        mutateEvent.setValues(props.event);
    }, [props.event]);

    useEffect(() => {
        if (eventContext.isEventOwner && mutateEvent.values)
            props.onUpdate(mutateEvent.values);
    }, [mutateEvent.values]);

    return (
        <div>
            <CloseButton
                onClick={mutateEvent.resetEvent}
            />
            {!!mutateEvent.edit && !!mutateEvent.values && !!mutateEvent.state &&
                <Multiple
                    children={(
                        <div>
                            <Text
                                type='text'
                                name='Name'
                                label='Name'
                                value={mutateEvent.values.Name} 
                                state={mutateEvent.state.Name}
                                onChange={(name, value) => mutateEvent.updateData('Name', value)}
                            />
                            <Text
                                type='text'
                                name='Summary'
                                label='Summary'
                                value={mutateEvent.values.Summary} 
                                state={mutateEvent.state.Summary}
                                onChange={(name, value) => mutateEvent.updateData('Summary', value)}
                            />
                            <Text
                                type='datetime-local'
                                name='UpdatedDate'
                                label='Date'
                                value={mutateEvent.values.UpdatedDate} 
                                state={mutateEvent.state.UpdatedDate}
                                onChange={(name, value) => mutateEvent.updateData('UpdatedDate', value)}
                            />
                            <ToggleGroup
                                name='Sharees'
                                label='Sharees'
                                value={mutateEvent.values.Sharees}
                                state={mutateEvent.state.Sharees}
                                values={eventContext.eventSharees}
                                onChange={async (name, value) => mutateEvent.updateData('Sharees', value)}
                            />
                            <SaveButton 
                                onClick={mutateEvent.finalizeUpdate}
                            />
                        </div>
                    )}
                />
            }
            {!mutateEvent.edit && 
                <div>
                    {eventContext.isEventOwner &&
                        <EventCard
                            name={props.event.Name}
                            date={getTimeFromWebDateTime(props.event.UpdatedDate)}
                            summary={props.event.Summary}
                            isEventOwner={eventContext.isEventOwner}
                            ownerName={eventContext.eventOwner.name}
                            shareesName={eventContext.eventSharees.map(e => e[1])}
                            onEdit={() => mutateEvent.setEdit(true)}
                            onDelete={props.onDelete}
                        />
                    }
                    {!!mutateEvent.values && props.event.AppointmentID &&
                        <AppointmentCard
                            name={props.event.Name}
                            date={getTimeFromWebDateTime(props.event.UpdatedDate)}
                            summary={props.event.Summary}
                            appointmentID={props.event.AppointmentID}
                        />
                    }
                </div>
            }
        </div>
    )
}
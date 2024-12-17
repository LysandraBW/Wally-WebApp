import { Fragment } from "react";
import { Text, TextArea, ToggleGroup } from "@/components/input/export";
import Close from "@/components/button/icon/Close";
import Add from "@/components/button/label/Add";
import useMutateEvent from "@/process/Employee/Calendar/Event/Process";
import { DefaultValues } from "@/process/Employee/Calendar/Event/Loaded";

export interface CreateEventProps {
    onClose: () => void;
    onChange: (value: any) => void;
}

export default function CreateEvent(props: CreateEventProps) {
    const mutateEvent = useMutateEvent({mutateType: 'Create', initialValues: DefaultValues, ...props});

    return (
        <div>
            <Close
                onClick={props.onClose}
            />
            {!!mutateEvent.values && !!mutateEvent.state &&
                <Fragment>
                    <TextArea
                        name='Name'
                        label='Name'
                        value={mutateEvent.values.Name}
                        state={mutateEvent.state.Name}
                        onChange={async (name, value) => mutateEvent.updateData('Name', value)}
                    />
                    <TextArea
                        name='Summary'
                        label='Summary'
                        value={mutateEvent.values.Summary}
                        state={mutateEvent.state.Summary}
                        onChange={async (name, value) => mutateEvent.updateData('Summary', value)}
                    />
                    <Text
                        type='datetime-local'
                        name='UpdatedDate'
                        label='Date'
                        value={mutateEvent.values.UpdatedDate}
                        state={mutateEvent.state.UpdatedDate}
                        onChange={async (name, value) => mutateEvent.updateData('UpdatedDate', value)}
                    />
                    <ToggleGroup
                        name='Sharees'
                        label='Sharees'
                        value={mutateEvent.values.Sharees}
                        state={mutateEvent.state.Sharees}
                        values={mutateEvent.sharees}
                        onChange={async (name, value) => mutateEvent.updateData('Sharees', value)}
                    />
                    <Add 
                        onClick={mutateEvent.finalizeCreate}
                    />       
                </Fragment>
            }
        </div>
    )
}
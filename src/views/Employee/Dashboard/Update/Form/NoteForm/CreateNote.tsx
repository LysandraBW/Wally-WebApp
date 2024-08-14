import { Fragment } from "react";
import { File, TextArea, Toggle, ToggleGroup } from "@/components/Input/Export";
import AddButton from "@/components/Button/Text/Add";
import { fileListToFormData } from "@/lib/Files/FileData";
import { DefaultValues } from "@/process/Employee/Update/Note/Mutate/Loaded";
import useMutateNote from "@/process/Employee/Update/Note/Mutate/Process";

export interface CreateNoteProps {
    onChange: (value: any) => any;
}

export default function CreateNote(props: CreateNoteProps) {
    const mutateNote = useMutateNote({mutateType: 'Create', initialValues: DefaultValues, ...props})

    return (
        <div>
            {!!mutateNote.values && !!mutateNote.state &&
                <Fragment>
                    <TextArea
                        name='Head'
                        label='Head'
                        value={mutateNote.values.Head}
                        state={mutateNote.state.Head}
                        onChange={async (name, value) => mutateNote.updateData('Head', value)}
                    />
                    <TextArea
                        name='Body'
                        label='Body'
                        value={mutateNote.values.Head}
                        state={mutateNote.state.Head}
                        onChange={async (name, value) => mutateNote.updateData('Head', value)}
                    />
                    <File
                        name='Files'
                        label='Upload Files'
                        state={mutateNote.state.Files}
                        multiple={true}
                        onChange={(name, value) => mutateNote.updateData('Files', fileListToFormData(value))}
                    />
                    <Toggle
                        name='ShowCustomer'
                        label='Show Customer'
                        value={mutateNote.values.ShowCustomer}
                        state={mutateNote.state.Head}
                        onChange={async (name, value) => mutateNote.updateData('ShowCustomer', value)}
                    />
                    <ToggleGroup
                        name='Sharees'
                        label='Sharees'
                        value={mutateNote.values.Sharees}
                        state={mutateNote.state.Sharees}
                        values={mutateNote.sharees}
                        onChange={async (name, value) => mutateNote.updateData('Sharees', value)}
                    />
                    <AddButton
                        onClick={mutateNote.finalizeCreate}
                    />
                </Fragment>
            }
        </div>
    )
}
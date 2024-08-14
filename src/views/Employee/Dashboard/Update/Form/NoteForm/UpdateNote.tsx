import { File, Multiple, Text, Toggle, ToggleGroup } from "@/components/Input/Export";
import { createContext, useState } from "react";
import UpdateAttachment from "./UpdateFile";
import SaveButton from "@/components/Button/Text/Save";
import { DefaultNoteContext } from "@/process/Employee/Update/Note/Context";
import { UpdateNote as UpdateNoteData } from "@/submission/Employee/Update/Note/Form";
import NoteCard from "./NoteCard";
import useMutateNote from "@/process/Employee/Update/Note/Mutate/Process";

export interface UpdateNoteProps {
    note: UpdateNoteData;
    onDelete: () => any;
    onUpdate: (note: UpdateNoteData) => any;   
}

export const NoteContext = createContext(DefaultNoteContext);

export default function UpdateNote(props: UpdateNoteProps) {
    const mutateNote = useMutateNote({mutateType: 'Update', initialValues: {...props.note}, ...props});
    const [noteContext] = useState(DefaultNoteContext);

    return (
        <NoteContext.Provider value={noteContext}>
            {mutateNote.edit && mutateNote.values && mutateNote.state &&
                <Multiple
                    children={(
                        <div>
                            <Text
                                type='text'
                                name='Head'
                                label='Head'
                                value={mutateNote.values.Head} 
                                state={mutateNote.state.Head}
                                onChange={(name, value) => mutateNote.updateData('Head', value)}
                                onBlur={async () => mutateNote.resetData('Body')}
                            />
                            <Text
                                type='text'
                                name='Body'
                                label='Body'
                                value={mutateNote.values.Body}
                                state={mutateNote.state.Body} 
                                onChange={(name, value) => mutateNote.updateData('Body', value)}
                                onBlur={async () => mutateNote.resetData('Body')}
                            />
                            {/* Deleting Existing Attachments */}
                            <UpdateAttachment
                                attachments={mutateNote.values.Attachments}
                                updateAttachments={attachments => mutateNote.updateData('Files', attachments)}
                            />
                            {/* Reuploading New Attachments */}
                            <div>
                                <File
                                    name='Files'
                                    label='Reupload Files'
                                    state={mutateNote.state.Files}
                                    multiple={true}
                                    onChange={(name, value) => mutateNote.updateData('Files', value)}
                                />
                            </div>
                            {noteContext.isNoteOwner &&
                                <Toggle
                                    name='ShowCustomer'
                                    label='Show Customer'
                                    value={mutateNote.values.ShowCustomer}
                                    state={mutateNote.state.ShowCustomer}
                                    onChange={async (name, value) => mutateNote.updateData('ShowCustomer', value)}
                                />   
                            }
                            {noteContext.isNoteOwner &&                                
                                <ToggleGroup
                                    name='Sharees'
                                    label='Sharees'
                                    value={mutateNote.values.Sharees}
                                    state={mutateNote.state.Sharees}
                                    values={noteContext.noteSharees}
                                    onChange={async (name, value) => mutateNote.updateData('Sharees', value)}
                                />
                            }
                            <SaveButton 
                                onClick={mutateNote.finalizeUpdate}
                            />
                        </div>
                    )}
                />
            }
            {!mutateNote.edit &&
                <NoteCard
                    head={props.note.Head}
                    body={props.note.Body}
                    attachments={props.note.Attachments}
                    files={props.note.Files}
                    onEdit={() => mutateNote.setEdit(noteContext.isNoteOwner)}
                    onDelete={props.onDelete}
                />
            }
        </NoteContext.Provider>
    )
}
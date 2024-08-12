import { PageContext } from "@/app/Employee/Dashboard/Update/page";
import { File, Multiple, Text, Toggle, ToggleGroup } from "@/components/Input/Export";
import FormStateReducer from "@/hook/State/Reducer";
import { InitialFormState } from "@/hook/State/Interface";
import { createContext, useContext, useEffect, useReducer, useState } from "react";
import { every, hasLength, validBit } from "@/validation/Validation";
import UpdateAttachment from "./UpdateFile";
import { fileListToFormData } from "@/lib/Files/FileData";
import SaveButton from "@/components/Button/Text/Save";
import { DefaultNoteContext, loadNoteContext } from "@/process/Employee/Update/Note/Context";
import { UpdateNote as UpdateNoteData } from "@/submission/Employee/Update/Note/Form";
import NoteCard from "./NoteCard";
import { Regexes } from "@/validation/Regexes";

interface UpdateNoteProps {
    note: UpdateNoteData;
    onDelete: () => any;
    onUpdate: (note: UpdateNoteData) => any;   
    updateFormState: (state: boolean) => void;
}

export const NoteContext = createContext(DefaultNoteContext);

export default function UpdateNote(props: UpdateNoteProps) {
    const context = useContext(PageContext);
    const [noteContext, setNoteContext] = useState(DefaultNoteContext);

    const initialValues = {...props.note};
    const [edit, setEdit] = useState(false);
    const [values, setValues] = useState(props.note);
    const [formState, formStateDispatch] = useReducer(FormStateReducer, InitialFormState);

    useEffect(() => {
        setNoteContext(loadNoteContext(context, props.note));
        const load  = async () => {
            await inspectInput('Head', values.Head, hasLength);
            await inspectInput('Body', values.Body, hasLength);
            await inspectInput('ShowCustomer', values.ShowCustomer, validBit);
            await inspectInput('Sharees', values.Sharees, await every(async (v) => await !!v.match(Regexes.UniqueIdentifier)));
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
            states: {
                [`${inputName}`]: [errState, errMessage]
            }
        });
        return errState;
    }

    return (
        <NoteContext.Provider value={noteContext}>
            {edit && 
                <Multiple
                    children={(
                        <div>
                            <div>
                                <Text
                                    name='Head'
                                    label='Head'
                                    state={formState.input.Head}
                                    value={values.Head} 
                                    onChange={(name, value) => {
                                        setValues({...values, Head: value});
                                        inspectInput('Head', value, hasLength);
                                    }}
                                    onBlur={async () => {
                                        if (values.Head)
                                            return;
                                        setValues({...values, Head: initialValues.Head});
                                        inspectInput('Head', initialValues.Head, hasLength);
                                    }}
                                />
                            </div>
                            <div>
                                <Text
                                    name='Body'
                                    label='Body'
                                    state={formState.input.Body}
                                    value={values.Body} 
                                    onChange={(name, value) => {
                                        setValues({...values, Body: value});
                                        inspectInput('Body', value, hasLength);
                                    }}
                                    onBlur={async () => {
                                        if (values.Body)
                                            return;
                                        setValues({...values, Body: initialValues.Body});
                                        inspectInput('Body', initialValues.Body, hasLength);
                                    }}
                                />
                            </div>
                            {/* Deleting Existing Attachments */}
                            <UpdateAttachment
                                attachments={values.Attachments}
                                updateAttachments={attachments => setValues({...values, Attachments: attachments})}
                            />
                            {/* Reuploading New Attachments */}
                            <div>
                                <File
                                    name={'Files'}
                                    label={'Reupload Files'}
                                    multiple={true}
                                    onChange={(name, value) => {
                                        setValues({...values, [`${name}`]: fileListToFormData(value)});
                                    }}
                                />
                            </div>
                            {noteContext.isNoteOwner &&
                                <Toggle
                                    name='ShowCustomer'
                                    label='Show Customer'
                                    value={values.ShowCustomer}
                                    state={formState.input.ShowCustomer}
                                    onChange={async (name, value) => {
                                        setValues({...values, [`${name}`]: value});
                                        inspectInput('ShowCustomer', value, validBit);
                                    }}
                                />   
                            }
                            {noteContext.isNoteOwner &&                                
                                <ToggleGroup
                                    name='Sharees'
                                    label='Sharees'
                                    value={values.Sharees}
                                    values={noteContext.noteSharees}
                                    onChange={async (name, value) => {
                                        inspectInput('Sharees', value, await every(async (v) => !!v.match(Regexes.UniqueIdentifier)));
                                        setValues({...values, Sharees: value});
                                    }}
                                />
                            }
                            <SaveButton 
                                onClick={() => {
                                    if (!formState.state)
                                        return;
                                    setEdit(false);
                                    props.onUpdate(values);
                                }}
                            />
                        </div>
                    )}
                />
            }
            {!edit &&
                <NoteCard
                    head={values.Head}
                    body={values.Body}
                    attachments={values.Attachments}
                    files={values.Files}
                    onEdit={() => setEdit(noteContext.isNoteOwner)}
                    onDelete={props.onDelete}
                />
            }
        </NoteContext.Provider>
    )
}
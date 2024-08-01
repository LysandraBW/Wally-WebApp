import UpdateNote from "./UpdateNote";
import CreateNote from "./CreateNote";
import { NoteFormStructure } from "@/process/Employee/Update/Form/Form/Note/Note";
import { FormPart } from "@/process/Employee/Update/Form/UpdateForm";
import { useState } from "react";

interface NoteFormProps {
    form: NoteFormStructure;
    updateFormError: (state: boolean) => void;
    changeHandler: (part: FormPart, name: string, value: any) => void;
    onSave: () => any;
}

export default function NoteForm(props: NoteFormProps) {
    const [counter, setCounter] = useState<number>(1);

    return (
        <>
            <div>
                Current Notes
                {Object.entries(props.form.Notes).map(([noteID, note], i) => (
                    <div key={i}>
                        <UpdateNote
                            note={note}
                            onDelete={() => {
                                let updatedValue = {...props.form.Notes};
                                delete updatedValue[`${noteID}`];
                                props.changeHandler('Note', 'Notes', updatedValue);
                            }}
                            onUpdate={(note) => {
                                let updatedValue = {...props.form.Notes}
                                updatedValue[`${noteID}`] = note;
                                props.changeHandler('Note', 'Notes', updatedValue);
                            }}
                            updateFormError={props.updateFormError}
                        />
                    </div>
                ))}
            </div>
            <div>
                Type in a Note Here
                <CreateNote
                    onChange={(name, value) => {
                        props.changeHandler('Note', name, {...props.form.Notes, [`${-counter}`]: value});
                        setCounter(counter+1);
                    }}
                />
            </div>
            <button onClick={() => props.onSave()}>Save</button>
        </>
    )
}
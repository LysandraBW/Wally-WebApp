import { Note, Parts } from "@/lib/Form/Employee/Update/Form";
import NoteLine from "./NoteLine";
import NoteInput from "./NoteInput";
import { useState } from "react";

interface NoteFormProps {
    form: {
        Notes: {[noteID: string]: Note};    
    }
    changeHandler: (part: Parts, name: string, value: any) => void;
}

export default function NoteForm(props: NoteFormProps) {
    const [counter, setCounter] = useState<number>(1);

    return (
        <>
            <div>
                Current notes
                {Object.entries(props.form.Notes).map(([noteID, note], i) => (
                    <div key={i}>
                        <NoteLine
                            note={note}
                            onDelete={() => {
                                let modValue = props.form.Notes;
                                delete modValue[`${noteID}`];
                                props.changeHandler('Services', 'Parts', modValue);
                            }}
                            onUpdate={(note) => {
                                let modValue = props.form.Notes;
                                props.form.Notes[`${noteID}`] = note;
                                props.changeHandler('Services', 'Parts', modValue);
                            }}
                        />
                    </div>
                ))}
            </div>
            <div>
                Type in a note Here
                <NoteInput
                    employeeID={1}
                    onChange={(name, value) => {
                        console.log('Stored Notes', props.form.Notes);
                        props.changeHandler('Notes', name, {...props.form.Notes, [`${-counter}`]: value});
                        setCounter(counter+1);
                    }}
                />
            </div>
        </>
    )
}
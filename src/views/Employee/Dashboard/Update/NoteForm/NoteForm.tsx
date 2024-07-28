import NoteLine from "./NoteLine";
import NoteInput from "./NoteInput";
import { useEffect, useState } from "react";
import { Parts, UpdateNote } from "@/process/Employee/Update/Form";
import { DB_GeneralEmployee } from "@/lib/Database/Types";

interface NoteFormProps {
    form: {
        EmployeeID: string;
        Employees: Array<DB_GeneralEmployee>;
        Notes: {[noteID: string]: UpdateNote};    
    }
    changeHandler: (part: Parts, name: string, value: any) => void;
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
                        <NoteLine
                            employeeID={props.form.EmployeeID}
                            employees={props.form.Employees}
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
                Type in a Note Here
                <NoteInput
                    employeeID={props.form.EmployeeID}
                    employees={props.form.Employees}
                    onChange={(name, value) => {
                        console.log('Stored Notes', props.form.Notes);
                        props.changeHandler('Notes', name, {...props.form.Notes, [`${-counter}`]: value});
                        setCounter(counter+1);
                    }}
                />
            </div>
            <button onClick={() => props.onSave()}>Save</button>
        </>
    )
}
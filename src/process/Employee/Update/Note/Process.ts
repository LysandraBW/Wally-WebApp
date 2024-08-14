import { DB_Appointment } from "@/database/Types";
import { InitialNoteForm, NoteFormStructure, UpdateNote } from "@/submission/Employee/Update/Note/Form";
import { submitNoteForm } from "@/submission/Employee/Update/Note/Submit";
import { useEffect, useState } from "react";

export default function useNoteManager(employeeId: string, appointment: DB_Appointment) {
    const [counter, setCounter] = useState(1);
    const [updated, setUpdated] = useState<NoteFormStructure>();
    const [reference, setReference] = useState<NoteFormStructure>();

    useEffect(() => {
        const load = async () => {
            const form = await InitialNoteForm(employeeId, appointment);
            setUpdated(form);
            setReference(form);
        }
        load();
    }, []);

    const deleteNote = (noteId: string) => {
        if (!updated)
            return;
        let updatedValue = {...updated.Notes};
        delete updatedValue[`${noteId}`];
        setUpdated(Object.assign({}, updated, {Notes: updatedValue}));
    }   

    const updateNote = (noteId: string, note: UpdateNote) => {
        if (!updated)
            return;
        let updatedValue = {...updated.Notes};
        updatedValue[`${noteId}`] = note;
        setUpdated(Object.assign({}, updated, {Notes: updatedValue}));
    }

    const createNote = (note: UpdateNote) => {
        if (!updated)
            return;
        setUpdated(Object.assign({}, updated, {Notes: {...updated.Notes, [`${-counter}`]: note}}));
        setCounter(counter => counter + 1);
    }

    const saveNote = async () => {
        if (!updated || !reference)
            return;
        return await submitNoteForm(reference, updated);
    }

    return {
        updated,
        deleteNote,
        updateNote,
        createNote,
        saveNote
    }
}
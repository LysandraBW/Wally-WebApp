import { DB_Note } from "@/services/DB/Interface/Employee";
import { DefineNote, Notes, NoteUpdates } from "./_DEF";
import NoteDisplay from "./NoteDisplay";
import NoteForm from "./NoteForm";
import ItemManager from "@/features/ItemManager/ItemManager";
import { MathSet } from "@/features/ItemManager/helpers/MathSet";
import { sameMap } from "@/features/ItemManager/helpers/sameMap";
import { updatedValue } from "@/features/ItemManager/helpers/updatedValue";
import { filesToFormData } from "@/services/Cloud/filesToFormData";
import { UseForm } from "@/features/Form/useForm/useForm";

interface NoteManagerProps {
    parent: UseForm;
    noteList: Array<DB_Note>;
    onSaveUpdates: (updates: NoteUpdates) => void;
    appointmentID: string;
}

export default function NoteManager(props: NoteManagerProps) {
    const defineNote = new DefineNote();
    
    const processUpdates = (oldItems: Notes, newItems: Notes) => {
        const updates: NoteUpdates = {
            Update: [],
            Insert: {
                Attachment: [],
                Note: [],
                Sharee: []
            },
            Delete: {
                Attachment: [],
                Note: [],
                Sharee: []
            }
        }
    
        const oldIDs = new MathSet(Object.keys(oldItems));
        const newIDs = new MathSet(Object.keys(newItems));
    
        const toUpdateIDs = oldIDs.intersection(newIDs);
        const toInsertIDs = newIDs.difference(oldIDs);
        const toDeleteIDs = oldIDs.difference(newIDs);
    
        for (const ID of toUpdateIDs) {
            const oldItem = oldItems[ID];
            const newItem = newItems[ID];
    
            if (!sameMap(oldItem, newItem, ["Head", "Body", "ShowCustomer"])) {
                updates.Update.push({
                    AppointmentID: oldItem.AppointmentID,
                    NoteID: oldItem.NoteID,
                    Head: updatedValue(oldItem.Head, newItem.Head),
                    Body: updatedValue(oldItem.Body, newItem.Body),
                    ShowCustomer: updatedValue(oldItem.ShowCustomer[0], newItem.ShowCustomer[0])
                });
            }
    
            // ATTACHMENTS
            const oldAttachmentIDs = new MathSet(oldItem.Attachments.map(a => a.AttachmentID));
            const newAttachmentIDs = new MathSet(newItem.Attachments.map(a => a.AttachmentID));
            const toDeleteAttachmentIDs = oldAttachmentIDs.difference(newAttachmentIDs);
    
            for (const attachmentID of toDeleteAttachmentIDs) {
                updates.Delete.Attachment.push({
                    NoteID: ID,
                    AttachmentID: attachmentID
                });
            }
    
            if (newItem.UploadedAttachments) {
                updates.Insert.Attachment.push({
                    NoteID: ID,
                    Files: filesToFormData(newItem.UploadedAttachments)
                });
            }
    
            // SHAREES
            const oldShareeIDs = new MathSet(oldItem.Sharees);
            const newShareeIDs = new MathSet(newItem.Sharees);
            const toDeleteShareeIDs = oldShareeIDs.difference(newShareeIDs);
            const toInsertShareeIDs = newShareeIDs.difference(oldShareeIDs);
    
            for (const shareeID of toDeleteShareeIDs) {
                updates.Delete.Sharee.push({
                    NoteID: ID,
                    NoteShareeID: shareeID
                });
            }
    
            for (const shareeID of toInsertShareeIDs) {
                updates.Insert.Sharee.push({
                    NoteID: ID,
                    NoteShareeID: shareeID
                })
            }
        }
    
        for (const ID of toInsertIDs) {
            const newItem = newItems[ID];
            updates.Insert.Note.push({
                AppointmentID: props.appointmentID,
                Head: newItem.Head,
                Body: newItem.Body,
                ShowCustomer: newItem.ShowCustomer[0],
                Files: filesToFormData(newItem.UploadedAttachments),
                Sharees: newItem.Sharees
            });
        }
    
        for (const ID of toDeleteIDs) {
            const oldItem = oldItems[ID];
    
            // Deleting Sharee
            if (oldItem.EmployeeID in oldItem.Sharees) {
                updates.Delete.Sharee.push({
                    NoteID: ID,
                    NoteShareeID: oldItem.EmployeeID
                });
            }
            else {
                updates.Delete.Note.push({
                    NoteID: ID,
                    AppointmentID: oldItem.AppointmentID
                });
            }
        }
        props.onSaveUpdates(updates);
    }

    return (
        <div>
            <ItemManager
                defineItem={defineNote}
                parentForm={props.parent}
                itemList={props.noteList}
                Form={NoteForm}
                Display={NoteDisplay}
                saveAllUpdates={processUpdates}
            />
        </div>
    )
}
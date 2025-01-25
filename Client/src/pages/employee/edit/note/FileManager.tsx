import File from "@/component/Form/File/File";
import { DB_NoteAttachment } from "@/services/DB/Interface/Employee";

interface FileManagerProps {
    files: Array<DB_NoteAttachment>;
    updateFiles: (files: Array<DB_NoteAttachment>) => void;
    uploadFiles: (fileList: FileList | null) => void;
}

export default function FileManager(props: FileManagerProps) {
    const deleteFile = (attachmentID: number) => {
        let updatedFiles = [...props.files];
        updatedFiles = updatedFiles.filter(a => a.AttachmentID !== attachmentID);
        props.updateFiles(updatedFiles);
    }
    
    return (
        <div>
            <div>
                {props.files.map((file, i) => (
                    <div key={i}>
                        {file.Name}
                        <span onClick={() => {
                            deleteFile(file.AttachmentID);
                        }}>
                            x
                        </span>
                    </div>
                ))}
            </div>
            <File
                name="UploadedAttachments"
                label="Upload Files"
                accept={"image/png, image/jpeg"}
                multiple={true}
                onChange={(name, value) => props.uploadFiles(value)}
            />
        </div>
    )
}
import CloseButton from "@/components/Button/Icon/Close";
import { DB_Attachment } from "@/database/Types";

interface UpdateAttachmentProps {
    attachments: Array<DB_Attachment>;
    updateAttachments: (attachments: Array<DB_Attachment>) => void;
}

export default function UpdateAttachment(props: UpdateAttachmentProps) {
    return (
        <div>
            {props.attachments.map((attachment, i) => (
                <div key={i}>
                    {attachment.Name} 
                    <CloseButton 
                        onClose={() => {
                            props.updateAttachments(props.attachments.filter(_attachment => attachment !== _attachment));
                        }}
                    />
                </div>
            ))}
        </div>
    )
}
import CaretLeft from "@/components/Icon/Caret/Left";
import CaretRight from "@/components/Icon/Caret/Right";
import { DB_AppointmentSummary, DB_Attachment } from "@/database/Types"
import { Fragment, useEffect, useState } from "react";

interface NotesProps {
    appointment: DB_AppointmentSummary;
}

export default function Notes(props: NotesProps) {
    const [openedAttachments, setOpenedAttachments] = useState<Array<DB_Attachment>>([]);
    const [openedAttachementIndex, setOpenedAttachmentIndex] = useState(0);

    useEffect(() => {
        setOpenedAttachmentIndex(0);
    }, [openedAttachments.length]);

    return (
        <Fragment>
            {!!props.appointment.Notes.length &&
                <div className='flex flex-col gap-y-2'>
                    <h5 className='font-medium'>All Notes</h5>
                    <div className='flex flex-col gap-y-3'>
                        {props.appointment.Notes.map((note, i) => (
                            <div key={i} className='p-2 border border-gray-300 rounded'>
                                <h6 className='text-sm font-medium'>{note.Head}</h6>
                                <p className='text-gray-400'>{note.Body} Miles</p>
                                {!!note.Attachments.length &&
                                    <span
                                        onClick={() => setOpenedAttachments(note.Attachments)} 
                                        className='text-xs text-gray-400'>View {note.Attachments.length} Attachment{note.Attachments.length > 1 ? 's' : ''}</span>
                                }
                            </div>
                        ))}
                    </div>
                </div>
            }
            {!props.appointment.Notes.length &&
                <div>
                    <p className='text-gray-400'>There are no current notes. Make sure to check back later.</p>
                </div>
            }
            {!!openedAttachments.length &&
                <div>
                    <div>
                        <CaretLeft
                            width='16px'
                            height='16px'
                            color='#FFF'
                            strokeWidth='0.5px'
                        />
                        <div>
                            <div className='w-[350px] h-[150px] bg-white rounded'></div>
                        </div>
                        <CaretRight
                            width='16px'
                            height='16px'
                            color='#FFF'
                            strokeWidth='0.5px'
                        />
                    </div>
                    <div>
                        <div>{openedAttachments[openedAttachementIndex].Name}</div>
                        <div>{openedAttachementIndex+1}-{openedAttachments.length}</div>
                    </div>
                </div>
            }
        </Fragment>
    )
}
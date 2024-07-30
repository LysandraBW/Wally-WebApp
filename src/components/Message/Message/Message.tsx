interface MessageProps {
    message: React.ReactNode;
    messageType: MessageType;
    onClose: () => any;
}

export type MessageType = 'Default' | 'Error';

export default function Message(props: MessageProps) {
    return (
        <>
            <div 
                onClick={() => props.onClose()}
            >
                x
            </div>
            {props.message}
        </>
    )
}
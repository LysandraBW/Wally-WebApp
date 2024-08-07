import Message, { MessageType } from "@/components/Alert/Message/Message";

interface ErrorProps {
    close: () => void;
}

export default function Error(props: ErrorProps) {
    return (
        <Message 
            head={(
                <>
                    <b>Error</b>
                    <p>Unfortunately, an appointment with the given information was not found. Please try again</p>
                </>
            )} 
            messageType={MessageType.Error}
            onClose={() => props.close()}
        />
    )
}
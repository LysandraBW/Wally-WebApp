import Message, { MessageType } from "@/components/Alert/Message/Message";

interface ErrorProps {
    close: () => void;
}

export default function Error(props: ErrorProps) {
    return (
        <Message
            message={(
                <>
                    <div><b>No Matching Login</b></div>
                    <div>We could not find a login with your username or password. Please try again.</div>
                </>
            )}
            messageType={MessageType.Error}
            onClose={() => props.close()}
        />
    )
}
import Message from "@/components/Message/Message/Message";

interface ErrorProps {
    close: () => void;
}

export default function Error(props: ErrorProps) {
    return (
        <Message
            message={(
                <>
                    <div><b>Uh Oh</b></div>
                    <div>We couldn't find an appointment with your username or password.</div>
                </>
            )}
            onClose={() => props.close()}
        />
    )
}
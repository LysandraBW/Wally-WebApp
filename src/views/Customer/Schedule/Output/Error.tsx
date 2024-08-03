import Message from "@/components/Alert/Message/Message";

interface ErrorProps {
    close: () => void;
}

export default function Error(props: ErrorProps) {
    return (
        <Message 
                message={(
                    <>
                        <b>Error</b>
                        <p>Unfortunately, something has gone awry. Please try again.</p>
                    </>
                )} 
                messageType="Error"
                onClose={() => props.close()}
            />
    )
}
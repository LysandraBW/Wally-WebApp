import Message from "@/components/Pop-Up/Message/Message";

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
                close={() => props.close()}
            />
    )
}
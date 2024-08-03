import Message from "@/components/Alert/Message/Message";

interface SuccessProps {
    ID: string;
    close: () => void;
}

export default function Success(props: SuccessProps) {
    return (
        <Message 
                message={(
                    <>
                        <b>Success</b>
                        <p>{`Success! Your appointment has been scheduled. Your appointment ID is ${props.ID}. Use this to look up the status of your appointment.`}</p>
                    </>
                )} 
                messageType="Default"
                onClose={() => props.close()}
            />
    )
}
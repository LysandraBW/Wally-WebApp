import Message, { MessageType } from "@/components/Alert/Message/Message";

interface SuccessProps {
    aptID: string;
    close: () => void;
}

export default function Success(props: SuccessProps) {
    return (
        <Message 
                head={(
                    <div>
                        <b>Success</b>
                        <p>{`Success! Your appointment has been scheduled. Your appointment ID is ${props.aptID}. Use this to look up the status of your appointment.`}</p>
                    </div>
                )} 
                messageType={MessageType.Success}
                onClose={() => props.close()}
            />
    )
}
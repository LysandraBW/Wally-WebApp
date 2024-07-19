import Message from "@/components/Pop-Up/Message/Message";

interface SuccessProps {
    ID: number;
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
                close={() => props.close()}
            />
    )
}
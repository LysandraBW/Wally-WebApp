interface MessageProps {
    message: React.ReactNode;
    close: () => any;
}

export default function Message(props: MessageProps) {
    return (
        <>
            <div 
                onClick={() => props.close()}
            >
                x
            </div>
            {props.message}
        </>
    )
}
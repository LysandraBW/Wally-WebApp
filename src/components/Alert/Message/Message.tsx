import CloseButton from "@/components/Button/Icon/Close";
import { useState } from "react";

interface MessageProps {
    message: React.ReactNode;
    messageType: MessageType;
    onClose: () => any;
}

export enum MessageType {Default, Error, Success};

export default function Message(props: MessageProps) {
    const [visible, setVisible] = useState(true);
    
    return (
        <>
            {visible &&
                <div>
                    <CloseButton 
                        onClick={() => {
                            setVisible(false);
                            props.onClose();
                        }}
                    />
                    {props.message}
                </div>
            }
        </>
    )
}
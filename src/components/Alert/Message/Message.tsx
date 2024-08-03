import { useState } from "react";

interface MessageProps {
    message: React.ReactNode;
    messageType: MessageType;
    onClose: () => any;
}

export type MessageType = 'Default' | 'Error';

export default function Message(props: MessageProps) {
    const [visible, setVisible] = useState(true);
    
    return (
        <>
            {visible &&
                <div>
                    <div 
                        onClick={() => {
                            setVisible(false);
                            props.onClose();
                        }}
                    >
                        x
                    </div>
                        {props.message}
                </div>
        }
        </>
    )
}